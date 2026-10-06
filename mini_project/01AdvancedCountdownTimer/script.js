const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const continueBtn = document.querySelector(".continue");
const time = document.querySelector(".time");
const reset = document.querySelector(".reset");
const secInput = document.querySelector(".secondsInput");
const minInput = document.querySelector(".minutsInput");
const message = document.querySelector(".message");

let second = 0;
let minut = 0;
let timer;

function updateTime() {
  time.textContent =
    (minut < 10 ? "0" + minut : minut) +
    ":" +
    (second < 10 ? "0" + second : second);
}

function timerStart() {
  message.textContent = "";
  timer = setInterval(() => {
    if (second === 0) {
      second = 59;
      minut--;
    } else {
      second--;
    }

    updateTime();
    if (minut === 0 && second === 0) {
      timerStop();
      message.textContent = "Time is up!";
    }
  }, 1000);
}

function timerStop() {
  clearInterval(timer);
  timer = null;
}

start.addEventListener("click", () => {
  if (timer) return;

  second = Number(secInput.value);
  minut = Number(minInput.value);

  if (!isValidTime()) return;

  secInput.value = "";
  minInput.value = "";
  updateTime();
  timerStart();
});

function isValidTime() {
  if (!Number.isInteger(minut) || !Number.isInteger(second)) {
    alert("Butun son kiriting");
    return false;
  }

  if (minut < 0) {
    alert("Vaqt 0 dan boshlanadi");
    return false;
  }

  if (second < 0 || second > 59) {
    alert("Sekund 0 dan 59 gacha bo‘ladi");
    return false;
  }

  if (second === 0 && minut === 0) {
    alert("Vaqtni kiriting");
    return false;
  }

  return true;
}
pause.addEventListener("click", () => {
  timerStop();
});
continueBtn.addEventListener("click", () => {
  if (!timer && (minut > 0 || second > 0)) timerStart();
});

reset.addEventListener("click", () => {
  timerStop();

  second = 0;
  minut = 0;
  message.textContent = "";

  updateTime();
});
