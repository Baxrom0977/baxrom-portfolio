const amountInput = document.querySelector(".amountInput");
const fromCurrency = document.querySelector(".fromCurrency");
const toCurrency = document.querySelector(".toCurrency");
const convertBtn = document.querySelector(".convertBtn");
const result = document.querySelector(".result");

const rates = {
  USD: 1,
  EUR: 0.92,
  UZS: 12600,
  RUB: 90,
};

convertBtn.addEventListener("click", convertCurrency);

amountInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    convertCurrency();
  }
});

function convertCurrency() {
  const amount = Number(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amountInput.value.trim()) {
    result.textContent = "Введите сумму";
    return;
  }

  if (amount <= 0) {
    result.textContent = "Сумма должна быть больше 0";
    return;
  }

  const fromRate = rates[from];
  const toRate = rates[to];

  const resultSum = (amount / fromRate) * toRate;

  result.textContent = `${amount.toFixed(2)} ${from} = ${resultSum.toFixed(2)} ${to}`;
}
