const form = document.querySelector("#transaction-form");
const titleInput = document.querySelector("#title");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const dateInput = document.querySelector("#date");
const transactionsList = document.querySelector("#transactions-list");
const categoryInput = document.querySelector("#category");
const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expenses = document.querySelector("#expenses");
const spentPercentElement = document.querySelector("#spent-percent");
const filterButtons = document.querySelectorAll(".filter-btn");
const dateFrom = document.querySelector("#date-from");
const dateTo = document.querySelector("#date-to");
const categoryStats = document.querySelector("#category-stats");
const chart = document.querySelector("#chart");
const submitButton = form.querySelector(".add-btn");
const monthlyStats = document.querySelector("#monthly-stats");

let currentFilter = "all";
let editingId = null;

const STORAGE_KEY = "financeDashboard.transactions.v1";
const transactions = loadTransactions();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value.trim();
  const amount = Number(amountInput.value.trim());
  const type = typeInput.value;
  const date = dateInput.value;
  const category = categoryInput.value;
  if (title === "" || amount <= 0 || date === "") return;
  if (editingId === null) {
    const transaction = {
      id: Date.now(),
      title: title,
      amount: amount,
      type: type,
      category: category,
      date: date,
    };

    transactions.push(transaction);
  } else {
    const transaction = transactions.find(function (transaction) {
      return transaction.id === editingId;
    });

    if (!transaction) {
      editingId = null;
      form.reset();
      submitButton.textContent = "Add Transaction";
      return;
    }
    
    transaction.title = title;
    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category;
    transaction.date = date;

    editingId = null;
    submitButton.textContent = "Add Transaction";
  }
  updateApp();
  form.reset();
});

function renderTransactions(list) {
  transactionsList.innerHTML = "";
  if (list.length === 0) {
    const emptyElement = document.createElement("p");
    emptyElement.classList.add("empty");
    emptyElement.textContent = "No transactions found";
    transactionsList.append(emptyElement);
    return;
  }
  list.forEach(function (transaction) {
    const transactionElement = document.createElement("div");
    transactionElement.classList.add("transaction");
    transactionElement.innerHTML = `
                                <div class="transaction-info">
                                  <h3></h3>
                                  <p class="transaction-category"></p>
                                  <p class="transaction-date"></p>
                                </div>
                                <div class="transaction-right">
                                  <span class="transaction-amount"></span>
                                  <button class="edit-btn">Edit</button>
                                  <button class="delete-btn" type="button" aria-label="Delete transaction">×</button>
                                </div>
                                `;
    const titleElement = transactionElement.querySelector("h3");
    const categoryElement = transactionElement.querySelector(
      ".transaction-category",
    );
    const dateElement = transactionElement.querySelector(".transaction-date");
    const amountElement = transactionElement.querySelector(
      ".transaction-amount",
    );
    const editButton = transactionElement.querySelector(".edit-btn");
    const deleteButton = transactionElement.querySelector(".delete-btn");
    titleElement.textContent = transaction.title;
    categoryElement.textContent = transaction.category || "other";
    const formattedDate = new Date(transaction.date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
    dateElement.textContent = formattedDate;
    editButton.dataset.id = transaction.id;
    deleteButton.dataset.id = transaction.id;
    amountElement.textContent = `${
      transaction.type === "income" ? "+" : "-"
    } ${formatMoney(transaction.amount)}`;
    amountElement.classList.add(transaction.type);
    transactionsList.append(transactionElement);
  });
}

transactionsList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const id = Number(event.target.dataset.id);
    const index = transactions.findIndex(function (transaction) {
      return transaction.id === id;
    });
    if (index === -1) return;
    transactions.splice(index, 1);

    if (editingId === id) {
      editingId = null;
      form.reset();

      submitButton.textContent = "Add Transaction";
    }
    updateApp();
  }
  if (event.target.classList.contains("edit-btn")) {
    const id = Number(event.target.dataset.id);

    editTransaction(id);
  }
});

dateFrom.addEventListener("change", function () {
  applyFilter();
});

dateTo.addEventListener("change", function () {
  applyFilter();
});

function updateStats() {
  let totalIncome = 0;
  let totalExpenses = 0;
  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else if (transaction.type === "expense") {
      totalExpenses += transaction.amount;
    }
  });
  const totalBalance = totalIncome - totalExpenses;
  let spentPercent = 0;
  if (totalIncome > 0) {
    spentPercent = (totalExpenses / totalIncome) * 100;
  }
  balance.textContent = formatMoney(totalBalance);
  income.textContent = formatMoney(totalIncome);
  expenses.textContent = formatMoney(totalExpenses);
  spentPercentElement.textContent = `${spentPercent.toFixed(0)}%`;
}

function renderChart(list) {
  chart.innerHTML = "";
  if (list.length === 0) {
    const emptyElement = document.createElement("p");
    emptyElement.classList.add("empty");
    emptyElement.textContent = "No chart data";
    chart.append(emptyElement);
    return;
  }
  const chartData = getChartData(list);
  const dates = Object.keys(chartData).sort().reverse();
  let maxAmount = 1;
  let html = "";
  dates.forEach(function (date) {
    const income = chartData[date].income;
    const expense = chartData[date].expense;
    if (income > maxAmount) {
      maxAmount = income;
    }
    if (expense > maxAmount) {
      maxAmount = expense;
    }
  });
  dates.forEach(function (date) {
    const income = chartData[date].income;
    const expense = chartData[date].expense;
    const incomePercent = (income / maxAmount) * 100;
    const expensePercent = (expense / maxAmount) * 100;
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    html += `
          <div class="chart-day">
            <div class="chart-bar">
              <span class="chart-value">${formatMoney(income)}</span>
              <div class="bar" style="height: ${incomePercent}%"></div>
              <span>Income</span>
            </div>
            <div class="chart-bar">
              <span class="chart-value">${formatMoney(expense)}</span>
              <div class="bar" style="height: ${expensePercent}%"></div>
              <span>Expense</span>
            </div>
            <p>${formattedDate}</p>
          </div>
          `;
  });
  chart.innerHTML = html;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    currentFilter = event.target.dataset.filter;
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");
    applyFilter();
  });
});

function applyFilter() {
  let filteredTransactions;
  if (currentFilter === "all") {
    filteredTransactions = [...transactions];
  } else {
    filteredTransactions = transactions.filter(function (transaction) {
      return transaction.type === currentFilter;
    });
  }
  const fromDate = dateFrom.value;
  const toDate = dateTo.value;

  let categoryTransactions = [...transactions];

  if (fromDate !== "") {
    categoryTransactions = categoryTransactions.filter(function (transaction) {
      return transaction.date >= fromDate;
    });
  }

  if (toDate !== "") {
    categoryTransactions = categoryTransactions.filter(function (transaction) {
      return transaction.date <= toDate;
    });
  }

  if (fromDate !== "") {
    filteredTransactions = filteredTransactions.filter(function (transaction) {
      return transaction.date >= fromDate;
    });
  }

  if (toDate !== "") {
    filteredTransactions = filteredTransactions.filter(function (transaction) {
      return transaction.date <= toDate;
    });
  }
  filteredTransactions.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  renderTransactions(filteredTransactions);
  renderChart(filteredTransactions);
  renderCategoryStats(categoryTransactions);

  renderMonthlyStats(transactions);
}

function editTransaction(id) {
  const transaction = transactions.find(function (transaction) {
    return transaction.id === id;
  });

  if (!transaction) {
    editingId = null;
    form.reset();
    submitButton.textContent = "Add Transaction";
    return;
  }

  editingId = id;
  submitButton.textContent = "Save Changes";

  titleInput.value = transaction.title;
  amountInput.value = transaction.amount;
  typeInput.value = transaction.type;
  categoryInput.value = transaction.category || "other";
  dateInput.value = transaction.date;
}

function getChartData(list) {
  const data = {};
  list.forEach(function (transaction) {
    const date = transaction.date;
    if (!data[date]) {
      data[date] = {
        income: 0,
        expense: 0,
      };
    }
    if (transaction.type === "income") {
      data[date].income += transaction.amount;
    } else if (transaction.type === "expense") {
      data[date].expense += transaction.amount;
    }
  });
  return data;
}

function getCategoryExpenses(list) {
  const data = {};
  list.forEach(function (transaction) {
    if (transaction.type !== "expense") return;
    const category = transaction.category || "other";
    if (!data[category]) {
      data[category] = 0;
    }
    data[category] += transaction.amount;
  });
  return data;
}

function getMonthlyData(list) {
  const data = {};

  list.forEach(function (transaction) {
    const month = transaction.date.slice(0, 7);

    if (!data[month]) {
      data[month] = {
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "income") {
      data[month].income += transaction.amount;
    } else if (transaction.type === "expense") {
      data[month].expense += transaction.amount;
    }
  });

  return data;
}

function renderMonthlyStats(list) {
  monthlyStats.innerHTML = "";

  const data = getMonthlyData(list);

  const oldToNewMonths = Object.keys(data).sort();

  if (oldToNewMonths.length === 0) {
    const emptyElement = document.createElement("p");

    emptyElement.classList.add("empty");
    emptyElement.textContent = "No monthly data";

    monthlyStats.append(emptyElement);
    return;
  }

  let savedTotal = 0;
  const savedByMonth = {};

  oldToNewMonths.forEach(function (month) {
    const income = data[month].income;
    const expense = data[month].expense;

    const left = income - expense;

    savedTotal += left;
    savedByMonth[month] = savedTotal;
  });

  const months = [...oldToNewMonths].reverse();

  months.forEach(function (month) {
    const income = data[month].income;
    const expense = data[month].expense;

    const left = income - expense;

    const monthName = new Date(`${month}-01`).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const card = document.createElement("div");
    card.classList.add("month-card");

    card.innerHTML = `
      <div class="month-card-header">
        <h3>${monthName}</h3>
      </div>

      <div class="month-card-grid">
        <div class="month-box income-box">
          <span>Income</span>
          <strong>${formatMoney(income)}</strong>
        </div>

        <div class="month-box expense-box">
          <span>Expenses</span>
          <strong>${formatMoney(expense)}</strong>
        </div>

        <div class="month-box ${left >= 0 ? "left-positive" : "left-negative"}">
          <span>Left</span>
          <strong>${formatMoney(left)}</strong>
        </div>

        <div class="month-box saved-box">
          <span>Saved total</span>
          <strong>${formatMoney(savedByMonth[month])}</strong>
        </div>
      </div>
    `;

    monthlyStats.append(card);
  });
}

function renderCategoryStats(list) {
  categoryStats.innerHTML = "";
  const data = getCategoryExpenses(list);
  const categories = Object.keys(data).sort(function (a, b) {
    return data[b] - data[a];
  });
  if (categories.length === 0) {
    const emptyElement = document.createElement("p");
    emptyElement.classList.add("empty");
    emptyElement.textContent = "No expense data";
    categoryStats.append(emptyElement);
    return;
  }
  let totalExpenses = 0;
  categories.forEach(function (category) {
    totalExpenses += data[category];
  });
  categories.forEach(function (category) {
    const item = document.createElement("div");
    item.classList.add("category-item");
    const top = document.createElement("div");
    top.classList.add("category-top");
    const name = document.createElement("span");
    const amount = document.createElement("span");
    const progress = document.createElement("div");
    progress.classList.add("category-progress");
    const progressBar = document.createElement("div");
    progressBar.classList.add("category-progress-bar");
    const percent = (data[category] / totalExpenses) * 100;
    name.textContent = category;
    amount.textContent = `${formatMoney(data[category])} · ${percent.toFixed(
      0,
    )}%`;
    progressBar.style.width = `${percent}%`;
    top.append(name);
    top.append(amount);
    progress.append(progressBar);
    item.append(top);
    item.append(progress);
    categoryStats.append(item);
  });
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function isValidFinanceTransaction(transaction) {
  return (
    transaction &&
    typeof transaction === "object" &&
    typeof transaction.id === "number" &&
    typeof transaction.title === "string" &&
    transaction.title.trim() !== "" &&
    typeof transaction.amount === "number" &&
    Number.isFinite(transaction.amount) &&
    transaction.amount > 0 &&
    (transaction.type === "income" || transaction.type === "expense") &&
    typeof transaction.date === "string" &&
    transaction.date !== ""
  );
}

function migrateOldTransactions() {
  const oldData = localStorage.getItem("transactions");

  if (oldData === null) {
    return [];
  }

  try {
    const parsedData = JSON.parse(oldData);

    if (!Array.isArray(parsedData)) {
      return [];
    }

    const financeTransactions = parsedData.filter(isValidFinanceTransaction);

    if (financeTransactions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(financeTransactions));
    }

    return financeTransactions;
  } catch (error) {
    console.error("Ошибка миграции Finance Dashboard:", error);

    return [];
  }
}

function loadTransactions() {
  const saveData = localStorage.getItem(STORAGE_KEY);

  if (saveData === null) {
    return migrateOldTransactions();
  }

  try {
    const data = JSON.parse(saveData);

    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(isValidFinanceTransaction);
  } catch (error) {
    console.error("Ошибка загрузки Finance Dashboard:", error);

    return [];
  }
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function updateApp() {
  saveTransactions();
  applyFilter();
  updateStats();
}

applyFilter();
updateStats();
