const themeBtn = document.querySelector(".themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "🌙";
} else if (savedTheme === "light") {
  document.body.classList.remove("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  }
});

let transactions = [];
let editingId = null;

const STORAGE_KEY = "expenseTracker.transactions.v1";

const form = document.querySelector(".form");
const descriptionInput = document.querySelector(".descriptionInput");
const amountInput = document.querySelector(".amountInput");
const typeSelect = document.querySelector(".typeSelect");
const categorySelect = document.querySelector(".categorySelect");
const dateInput = document.querySelector(".dateInput");
const addBtn = document.querySelector(".addBtn");

const transactionList = document.querySelector(".transactionList");
const emptyMessage = document.querySelector(".emptyMessage");

const balanceAmount = document.querySelector(".balanceAmount");
const incomeAmount = document.querySelector(".incomeAmount");
const expenseAmount = document.querySelector(".expenseAmount");

const deleteAllBtn = document.querySelector(".deleteAllBtn");
const searchInput = document.querySelector(".searchInput");
const filterType = document.querySelector(".filterType");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (descriptionInput.value.trim() === "" || Number(amountInput.value) <= 0) {
    alert("Введите описание и сумму больше нуля");
    return;
  }

  const transaction = {
    id: Date.now(),
    description: descriptionInput.value.trim(),
    amount: Number(amountInput.value),
    type: typeSelect.value,
    category: categorySelect.value,
    date: dateInput.value,
  };
  if (editingId !== null) {
    const transactionIndex = transactions.findIndex(
      (transaction) => transaction.id === editingId,
    );

    transaction.id = editingId;

    transactions[transactionIndex] = transaction;
    editingId = null;
  } else {
    transactions.push(transaction);
  }

  saveTransactions();
  applyFilters();
  updateBalance();
  form.reset();
  addBtn.textContent = "Добавить операцию";
});

transactionList.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    const idEvent = Number(event.target.dataset.id);
    transactions = transactions.filter(
      (transaction) => transaction.id !== idEvent,
    );
    if (editingId === idEvent) {
      editingId = null;
      form.reset();
      addBtn.textContent = "Добавить операцию";
    }
    saveTransactions();
    applyFilters();
    updateBalance();
  }

  if (event.target.classList.contains("editBtn")) {
    const idEvent = Number(event.target.dataset.id);

    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === idEvent,
    );

    descriptionInput.value = transactionToEdit.description;
    amountInput.value = transactionToEdit.amount;
    typeSelect.value = transactionToEdit.type;
    categorySelect.value = transactionToEdit.category;
    dateInput.value = transactionToEdit.date;
    editingId = transactionToEdit.id;
    addBtn.textContent = "Сохранить изменения";
  }
});

deleteAllBtn.addEventListener("click", () => {
  const isConfirmed = confirm("Удалить все операции?");

  if (!isConfirmed) return;

  transactions = [];

  editingId = null;
  form.reset();
  dateInput.value = new Date().toISOString().split("T")[0];
  addBtn.textContent = "Добавить операцию";

  saveTransactions();
  applyFilters();
  updateBalance();
});

searchInput.addEventListener("input", () => {
  applyFilters();
});

filterType.addEventListener("change", () => {
  applyFilters();
});

function applyFilters() {
  const selectedType = filterType.value;
  const searchText = searchInput.value.toLowerCase();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchText);

    const matchesType =
      selectedType === "all" || transaction.type === selectedType;

    return matchesSearch && matchesType;
  });

  renderTransactions(filteredTransactions);
}

function renderTransactions(list = transactions) {
  transactionList.innerHTML = "";

  if (transactions.length === 0) {
    emptyMessage.textContent = "Операций пока нет";
  } else if (list.length === 0) {
    emptyMessage.textContent = "Ничего не найдено";
  }

  if (list.length > 0) {
    emptyMessage.style.display = "none";
  } else {
    emptyMessage.style.display = "block";
  }

  list.forEach((element) => {
    let sign = "";
    let amountClass = "";

    if (element.type === "income") {
      sign = "+";
      amountClass = "incomeColor";
    } else {
      sign = "-";
      amountClass = "expenseColor";
    }

    const transaction = document.createElement("div");
    transaction.classList.add("transaction");

    const transactionLeft = document.createElement("div");
    transactionLeft.classList.add("transactionLeft");

    const transactionIcon = document.createElement("div");
    transactionIcon.classList.add("transactionIcon");
    transactionIcon.textContent = "💳";

    const transactionInfo = document.createElement("div");
    transactionInfo.classList.add("transactionInfo");

    const title = document.createElement("h3");
    title.textContent = element.description;

    const details = document.createElement("p");
    details.textContent = `${element.category} • ${element.date}`;

    transactionInfo.append(title, details);

    transactionLeft.append(transactionIcon, transactionInfo);

    const transactionRight = document.createElement("div");
    transactionRight.classList.add("transactionRight");

    const amount = document.createElement("span");

    amount.classList.add("transactionAmount", amountClass);

    amount.textContent = `${sign}$${element.amount.toFixed(2)}`;

    const editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    editButton.type = "button";
    editButton.dataset.id = element.id;
    editButton.textContent = "✏️";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.type = "button";
    deleteButton.dataset.id = element.id;
    deleteButton.textContent = "🗑️";

    transactionRight.append(amount, editButton, deleteButton);

    transaction.append(transactionLeft, transactionRight);

    transactionList.append(transaction);
  });
}

function updateBalance() {
  let income = 0;
  let expenses = 0;

  transactions.forEach((element) => {
    if (element.type === "expense") {
      expenses += element.amount;
    } else if (element.type === "income") {
      income += element.amount;
    }
  });
  const balance = income - expenses;
  balanceAmount.textContent = "$" + balance.toFixed(2);
  incomeAmount.textContent = "$" + income.toFixed(2);
  expenseAmount.textContent = "$" + expenses.toFixed(2);
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function isValidExpenseTransaction(transaction) {
  return (
    transaction &&
    typeof transaction === "object" &&
    typeof transaction.id === "number" &&
    typeof transaction.description === "string" &&
    transaction.description.trim() !== "" &&
    typeof transaction.amount === "number" &&
    Number.isFinite(transaction.amount) &&
    transaction.amount > 0 &&
    (transaction.type === "income" || transaction.type === "expense") &&
    typeof transaction.date === "string" &&
    transaction.date !== ""
  );
}

function migrateOldTransactions() {
  const oldTransactions = localStorage.getItem("transactions");

  if (!oldTransactions) {
    return;
  }

  try {
    const parsedTransactions = JSON.parse(oldTransactions);

    if (!Array.isArray(parsedTransactions)) {
      return;
    }

    const expenseTransactions = parsedTransactions.filter(
      isValidExpenseTransaction,
    );

    if (expenseTransactions.length === 0) {
      return;
    }

    transactions = expenseTransactions;

    saveTransactions();
  } catch (error) {
    console.error("Ошибка миграции старых данных:", error);
  }
}

function loadTransactions() {
  const savedTransactions = localStorage.getItem(STORAGE_KEY);

  if (savedTransactions) {
    try {
      const parsedTransactions = JSON.parse(savedTransactions);

      if (Array.isArray(parsedTransactions)) {
        transactions = parsedTransactions.filter(isValidExpenseTransaction);
      }
    } catch (error) {
      console.error("Ошибка загрузки Expense Tracker:", error);
      transactions = [];
    }
  } else {
    migrateOldTransactions();
  }

  renderTransactions();
  updateBalance();
}
loadTransactions();
