const game = document.querySelector(".game");
const resetBtn = document.querySelector(".resetBtn");
const movesElement = document.querySelector(".moves");

let moves = 0;

const cards = [
  "🍎",
  "🍎",
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍒",
  "🍒",
  "🍓",
  "🍓",
  "🥝",
  "🥝",
  "🍉",
  "🍉",
  "🍍",
  "🍍",
];
let firstCard = null;
let secondCard = null;

cards.sort(() => Math.random() - 0.5);

const timerElement = document.querySelector(".timer");

let seconds = 0;
let timer;

let flipBackTimeout = null;
let winTimeout = null;

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    timerElement.textContent = seconds;
  }, 1000);
}

startTimer();

resetBtn.addEventListener("click", function () {
  clearInterval(timer);

  clearTimeout(flipBackTimeout);
  clearTimeout(winTimeout);

  flipBackTimeout = null;
  winTimeout = null;

  seconds = 0;
  timerElement.textContent = seconds;

  game.innerHTML = "";

  firstCard = null;
  secondCard = null;

  moves = 0;
  movesElement.textContent = moves;

  cards.sort(() => Math.random() - 0.5);
  rendercard();

  startTimer();
});

function rendercard() {
  cards.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = element;
    game.append(card);
    card.addEventListener("click", function () {
      if (secondCard !== null) {
        return;
      }

      if (card === firstCard) {
        return;
      }

      if (card.classList.contains("matched")) {
        return;
      }

      card.textContent = card.dataset.value;

      if (firstCard === null) {
        firstCard = card;
      } else {
        secondCard = card;
        moves++;
        movesElement.textContent = moves;
        console.log(moves);

        if (firstCard.dataset.value === secondCard.dataset.value) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          const matchedCards = document.querySelectorAll(".matched");

          if (matchedCards.length === cards.length) {
            clearInterval(timer);
            winTimeout = setTimeout(() => {
              alert("🎉 Вы победили!");
              winTimeout = null;
            }, 1000);
          }

          firstCard = null;
          secondCard = null;
        } else {
          const first = firstCard;
          const second = secondCard;

          flipBackTimeout = setTimeout(function () {
            first.textContent = "";
            second.textContent = "";

            firstCard = null;
            secondCard = null;

            flipBackTimeout = null;
          }, 1000);
        }
      }
    });
  });
}
rendercard();
