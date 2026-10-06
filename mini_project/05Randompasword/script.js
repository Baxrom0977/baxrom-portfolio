const lengthInput = document.querySelector(".length");
const generateBtn = document.querySelector(".generate");
const password = document.querySelector(".password");
const copybtn = document.querySelector(".copybtn");
const copy = document.querySelector(".copy");

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
let result = "";

generateBtn.addEventListener("click", function () {
  result = "";

  const length = Number(lengthInput.value);

  if (lengthInput.value === "") {
    alert("Введите длину пароля");
    return;
  }

  if (!Number.isInteger(length)) {
    alert("Введите целое число");
    return;
  }

  if (length < 5) {
    alert("Введите минимум 5");
    return;
  }

  if (length > 128) {
    alert("Максимум 128 символов");
    return;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = getSecureRandomIndex(chars.length);

    result += chars[randomIndex];
  }

  password.textContent = result;
});

function getSecureRandomIndex(max) {
  const array = new Uint32Array(1);

  crypto.getRandomValues(array);

  return array[0] % max;
}

copybtn.addEventListener("click", function () {
  if (result === "") {
    copy.textContent = "Generate password first";

    setTimeout(() => {
      copy.textContent = "";
    }, 1000);

    return;
  }

  navigator.clipboard.writeText(result);

  copy.textContent = "Copied !";

  setTimeout(() => {
    copy.textContent = "";
  }, 1000);
});
