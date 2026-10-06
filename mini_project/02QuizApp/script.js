const questionAll = document.querySelector(".question");
const questios = document.querySelector(".questios");
const answers = document.querySelectorAll(".answers");
const right = document.querySelector(".right");
const rightAnswers = document.querySelector(".rightAnswers");
const restartBtn = document.querySelector(".restart");

const questions = [
  {
    question:
      "В какой европейской столице находится знаменитая Эйфелева башня?",
    answers: ["Рим", "Париж", "Лондон", "Берлин"],
    correct: "Париж",
  },
  {
    question: "Какая планета является самой большой в Солнечной системе?",
    answers: ["Сатурн", "Марс", "Юпитер", "Земля"],
    correct: "Юпитер",
  },
  {
    question: "Сколько материков обычно выделяют на Земле?",
    answers: ["4", "5", "6", "8"],
    correct: "6",
  },
  {
    question: "Какое животное называют «кораблём пустыни»?",
    answers: ["Верблюд", "Слон", "Лошадь", "Жираф"],
    correct: "Верблюд",
  },
  {
    question:
      "Какой газ растения в основном поглощают из воздуха для фотосинтеза?",
    answers: ["Кислород", "Азот", "Водород", "Углекислый газ"],
    correct: "Углекислый газ",
  },
  {
    question: "Как называется столица Японии?",
    answers: ["Осака", "Пекин", "Токио", "Сеул"],
    correct: "Токио",
  },
  {
    question: "Сколько дней в високосном году?",
    answers: ["365", "366", "364", "367"],
    correct: "366",
  },
  {
    question: "Какой океан является самым большим?",
    answers: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
    correct: "Тихий",
  },
  {
    question: "Какой язык используется для стилизации веб-страниц?",
    answers: ["HTML", "CSS", "JavaScript", "Python"],
    correct: "CSS",
  },
  {
    question: "Какой язык обычно используется для логики на веб-странице?",
    answers: ["CSS", "HTML", "JavaScript", "SQL"],
    correct: "JavaScript",
  },
  {
    question: "Что означает HTML?",
    answers: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Tool Modern Language",
      "Home Tool Markup Language",
    ],
    correct: "HyperText Markup Language",
  },
  {
    question: "Какой метод массива добавляет элемент в конец массива?",
    answers: ["pop()", "push()", "shift()", "filter()"],
    correct: "push()",
  },
  {
    question: "Какой метод удаляет последний элемент массива?",
    answers: ["pop()", "push()", "find()", "map()"],
    correct: "pop()",
  },
  {
    question: "Какой метод массива создаёт новый массив после фильтрации?",
    answers: ["find()", "filter()", "forEach()", "includes()"],
    correct: "filter()",
  },
  {
    question: "Какое значение используется для логического «истина»?",
    answers: ["false", "null", "true", "undefined"],
    correct: "true",
  },
];

let currentQuestion = 0;

let score = 0;

for (let i = 0; i < answers.length; i++) {
  let answerBtn = answers[i];

  answerBtn.addEventListener("click", function () {
    if (answerBtn.textContent === questions[currentQuestion].correct) {
      right.textContent = "Правильно!";
      right.classList.remove("wrong");
      right.classList.add("correct");
      score++;
    } else {
      right.textContent = "Неправильно!";
      right.classList.remove("correct");
      right.classList.add("wrong");
    }
    for (let i = 0; i < answers.length; i++) {
      answers[i].disabled = true;
    }

    currentQuestion++;

    setTimeout(() => {
      right.textContent = "";

      if (currentQuestion === questions.length) {
        rightAnswers.textContent = `Вы ответили правильно на ${score} из ${questions.length} вопросов`;
        questionAll.style.display = "none";

        return;
      }
      renderQuestion();
    }, 1000);
  });
}
restartBtn.addEventListener("click", function () {
  score = 0;
  currentQuestion = 0;
  rightAnswers.textContent = "";
  questionAll.style.display = "block";
  renderQuestion();
});

function renderQuestion() {
  questios.textContent = `${currentQuestion + 1}. ${questions[currentQuestion].question}`;

  for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
    answers[i].textContent = questions[currentQuestion].answers[i];
    answers[i].disabled = false;
  }
}
renderQuestion();
