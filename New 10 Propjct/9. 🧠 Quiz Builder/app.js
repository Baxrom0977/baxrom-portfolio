const emptyState = document.querySelector("#empty-state");
const quizBuilder = document.querySelector("#quiz-builder");
const newQuizButton = document.querySelector("#new-quiz-button");
const emptyCreateButton = document.querySelector("#empty-create-button");
const savedQuizzesButton = document.querySelector("#saved-quizzes-button");

const quizTitle = document.querySelector("#quiz-title");
const quizDescription = document.querySelector("#quiz-description");

const questionForm = document.querySelector("#question-form");
const questionText = document.querySelector("#question-text");
const answer1 = document.querySelector("#answer-1");
const answer2 = document.querySelector("#answer-2");
const answer3 = document.querySelector("#answer-3");
const answer4 = document.querySelector("#answer-4");

const questionsList = document.querySelector("#questions-list");
const questionsEmpty = document.querySelector("#questions-empty");
const questionCounter = document.querySelector("#question-counter");

const saveQuizButton = document.querySelector("#save-quiz-button");
const cancelQuizButton = document.querySelector("#cancel-quiz-button");
const previewQuizButton = document.querySelector("#preview-quiz-button");

const savedQuizzes = document.querySelector("#saved-quizzes");
const savedQuizzesList = document.querySelector("#saved-quizzes-list");
const savedEmpty = document.querySelector("#saved-empty");
const closeSavedButton = document.querySelector("#close-saved-button");

const quizPlayer = document.querySelector("#quiz-player");
const playerTitle = document.querySelector("#player-title");
const playerQuestion = document.querySelector("#player-question");
const playerAnswers = document.querySelector("#player-answers");
const playerProgress = document.querySelector("#player-progress");
const progressBar = document.querySelector("#progress-bar");
const nextQuestionButton = document.querySelector("#next-question-button");

const quizResult = document.querySelector("#quiz-result");
const resultScore = document.querySelector("#result-score");
const resultMessage = document.querySelector("#result-message");

const backHomeButton = document.querySelector("#back-home-button");
const restartQuizButton = document.querySelector("#restart-quiz-button");
const exitQuizButton = document.querySelector("#exit-quiz-button");

let questions = [];
let quizzes = loadQuizzes();
let editingQuestionId = null;

let isPreviewMode = false;

let activeQuiz = null;
let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let score = 0;

let editingQuizId = null;

newQuizButton.addEventListener("click", () => {
  resetQuizEditor();

  emptyState.classList.add("hidden");
  quizBuilder.classList.remove("hidden");
});

emptyCreateButton.addEventListener("click", () => {
  resetQuizEditor();

  emptyState.classList.add("hidden");
  quizBuilder.classList.remove("hidden");
});

savedQuizzesButton.addEventListener("click", () => {
  emptyState.classList.add("hidden");
  quizBuilder.classList.add("hidden");

  savedQuizzes.classList.remove("hidden");

  renderSavedQuizzes();
});

cancelQuizButton.addEventListener("click", () => {
  resetQuizEditor();

  quizBuilder.classList.add("hidden");
  emptyState.classList.remove("hidden");
});

previewQuizButton.addEventListener("click", () => {
  const title = quizTitle.value.trim();

  if (title === "") return;
  if (questions.length === 0) return;

  activeQuiz = {
    title,
    questions: cloneQuestions(questions),
  };

  currentQuestionIndex = 0;
  selectedAnswerIndex = null;
  score = 0;

  isPreviewMode = true;

  quizBuilder.classList.add("hidden");
  quizPlayer.classList.remove("hidden");

  renderPlayerQuestion();
});

closeSavedButton.addEventListener("click", () => {
  savedQuizzes.classList.add("hidden");
  emptyState.classList.remove("hidden");
});

questionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = questionText.value.trim();
  const correctAnswer = document.querySelector(
    'input[name="correct-answer"]:checked',
  );

  if (!correctAnswer) return;

  const correctIndex = Number(correctAnswer.value);

  const answers = [
    answer1.value.trim(),
    answer2.value.trim(),
    answer3.value.trim(),
    answer4.value.trim(),
  ];

  if (text === "") return;

  if (answers.some((answer) => answer === "")) return;

  if (editingQuestionId !== null) {
    const question = questions.find(
      (question) => question.id === editingQuestionId,
    );

    if (!question) return;
    question.text = text;
    question.answers = answers;
    question.correctIndex = correctIndex;

    editingQuestionId = null;

    renderQuestions();
  } else {
    const question = {
      id: Date.now(),
      text,
      answers,
      correctIndex,
    };

    questions.push(question);
    renderQuestion(question);
  }

  updateQuestionsInfo();

  questionForm.reset();
});

saveQuizButton.addEventListener("click", () => {
  const title = quizTitle.value.trim();
  const description = quizDescription.value.trim();

  if (title === "" || description === "") return;
  if (questions.length === 0) return;

  if (editingQuizId !== null) {
    const quiz = quizzes.find((item) => item.id === editingQuizId);

    if (!quiz) return;

    quiz.title = title;
    quiz.description = description;
    quiz.questions = cloneQuestions(questions);

    editingQuizId = null;
  } else {
    const quiz = {
      id: Date.now(),
      title,
      description,
      questions: cloneQuestions(questions),
    };

    quizzes.push(quiz);
  }

  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  resetQuizEditor();

  quizBuilder.classList.add("hidden");
  emptyState.classList.remove("hidden");
});

nextQuestionButton.addEventListener("click", () => {
  if (selectedAnswerIndex === null) return;

  const question = activeQuiz.questions[currentQuestionIndex];

  if (selectedAnswerIndex === question.correctIndex) {
    score++;
  }

  currentQuestionIndex++;
  selectedAnswerIndex = null;

  if (currentQuestionIndex < activeQuiz.questions.length) {
    renderPlayerQuestion();
  } else {
    quizPlayer.classList.add("hidden");
    quizResult.classList.remove("hidden");

    resultScore.textContent = `${score} / ${activeQuiz.questions.length}`;
    const percent = (score / activeQuiz.questions.length) * 100;

    if (percent === 100) {
      resultMessage.textContent = "Отлично! Все ответы правильные!";
    } else if (percent >= 70) {
      resultMessage.textContent = "Очень хороший результат!";
    } else if (percent >= 50) {
      resultMessage.textContent = "Неплохо! Но можно лучше.";
    } else {
      resultMessage.textContent = "Попробуй пройти тест ещё раз.";
    }
  }
});

restartQuizButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  selectedAnswerIndex = null;
  score = 0;

  quizResult.classList.add("hidden");
  quizPlayer.classList.remove("hidden");

  renderPlayerQuestion();
});

backHomeButton.addEventListener("click", () => {
  quizResult.classList.add("hidden");

  activeQuiz = null;
  currentQuestionIndex = 0;
  selectedAnswerIndex = null;
  score = 0;

  if (isPreviewMode) {
    isPreviewMode = false;

    quizBuilder.classList.remove("hidden");
  } else {
    emptyState.classList.remove("hidden");
  }
});

exitQuizButton.addEventListener("click", () => {
  quizPlayer.classList.add("hidden");

  activeQuiz = null;
  currentQuestionIndex = 0;
  selectedAnswerIndex = null;
  score = 0;

  if (isPreviewMode) {
    isPreviewMode = false;

    quizBuilder.classList.remove("hidden");
  } else {
    savedQuizzes.classList.remove("hidden");

    renderSavedQuizzes();
  }
});

function isValidQuestion(question) {
  return (
    question &&
    typeof question === "object" &&
    typeof question.id === "number" &&
    typeof question.text === "string" &&
    question.text.trim() !== "" &&
    Array.isArray(question.answers) &&
    question.answers.length === 4 &&
    question.answers.every(
      (answer) => typeof answer === "string" && answer.trim() !== "",
    ) &&
    Number.isInteger(question.correctIndex) &&
    question.correctIndex >= 0 &&
    question.correctIndex < 4
  );
}

function isValidQuiz(quiz) {
  return (
    quiz &&
    typeof quiz === "object" &&
    typeof quiz.id === "number" &&
    typeof quiz.title === "string" &&
    quiz.title.trim() !== "" &&
    typeof quiz.description === "string" &&
    quiz.description.trim() !== "" &&
    Array.isArray(quiz.questions) &&
    quiz.questions.length > 0 &&
    quiz.questions.every(isValidQuestion)
  );
}

function loadQuizzes() {
  const saved = localStorage.getItem("quizzes");

  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidQuiz);
  } catch (error) {
    console.error("Failed to load quizzes:", error);

    return [];
  }
} 

function resetQuizEditor() {
  editingQuizId = null;
  editingQuestionId = null;

  questions = [];

  quizTitle.value = "";
  quizDescription.value = "";

  questionForm.reset();
  questionsList.textContent = "";

  updateQuestionsInfo();
}

function renderSavedQuizzes() {
  savedQuizzesList.textContent = "";

  if (quizzes.length === 0) {
    savedEmpty.classList.remove("hidden");
    return;
  }

  savedEmpty.classList.add("hidden");

  quizzes.forEach((quiz) => {
    // здесь создадим карточку
    const card = document.createElement("div");
    card.classList.add("saved-card");

    const title = document.createElement("h3");
    title.textContent = quiz.title;

    const description = document.createElement("p");
    description.textContent = quiz.description;

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("button", "button--danger");

    deleteBtn.addEventListener("click", () => {
      const index = quizzes.findIndex((item) => item.id === quiz.id);

      if (index === -1) return;

      quizzes.splice(index, 1);

      localStorage.setItem("quizzes", JSON.stringify(quizzes));

      renderSavedQuizzes();
    });

    const editQuizBtn = document.createElement("button");

    editQuizBtn.textContent = "Edit";
    editQuizBtn.classList.add("button", "button--edit");

    editQuizBtn.addEventListener("click", () => {
      editingQuizId = quiz.id;
      editingQuestionId = null;

      questionForm.reset();

      quizTitle.value = quiz.title;
      quizDescription.value = quiz.description;

      questions = cloneQuestions(quiz.questions);

      savedQuizzes.classList.add("hidden");
      quizBuilder.classList.remove("hidden");

      renderQuestions();
      updateQuestionsInfo();
    });

    const startBtn = document.createElement("button");
    startBtn.textContent = "Start quiz";
    startBtn.classList.add("button", "button--primary");

    startBtn.addEventListener("click", () => {
      isPreviewMode = false;

      activeQuiz = quiz;
      currentQuestionIndex = 0;
      selectedAnswerIndex = null;
      score = 0;

      savedQuizzes.classList.add("hidden");
      quizPlayer.classList.remove("hidden");

      renderPlayerQuestion();
    });

    const meta = document.createElement("div");
    meta.classList.add("saved-card__meta");
    meta.textContent = `${quiz.questions.length} questions`;

    const actions = document.createElement("div");
    actions.classList.add("saved-card__actions");

    actions.append(startBtn, editQuizBtn, deleteBtn);

    card.append(title, description, meta, actions);

    savedQuizzesList.append(card);
  });
}

function renderQuestions() {
  questionsList.textContent = "";

  questions.forEach((question) => {
    renderQuestion(question);
  });
}

function renderQuestion(question) {
  const card = document.createElement("div");
  card.classList.add("question-card");

  const title = document.createElement("h3");
  title.classList.add("question-card__title");
  title.textContent = question.text;

  const answersBox = document.createElement("div");
  answersBox.classList.add("question-card__answers");

  question.answers.forEach((answer, index) => {
    const answerItem = document.createElement("div");

    answerItem.classList.add("question-card__answer");
    answerItem.textContent = answer;

    if (index === question.correctIndex) {
      answerItem.classList.add("question-card__answer--correct");
    }

    answersBox.append(answerItem);
  });
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add(
    "question-card__button",
    "question-card__button--delete",
  );

  deleteBtn.addEventListener("click", () => {
    const index = questions.findIndex((item) => item.id === question.id);

    if (index === -1) return;
    questions.splice(index, 1);

    if (editingQuestionId === question.id) {
      editingQuestionId = null;
      questionForm.reset();
    }

    card.remove();
    updateQuestionsInfo();
  });

  const editBtn = document.createElement("button");

  editBtn.textContent = "Edit";
  editBtn.classList.add("question-card__button");

  editBtn.addEventListener("click", () => {
    editingQuestionId = question.id;

    questionText.value = question.text;

    answer1.value = question.answers[0];
    answer2.value = question.answers[1];
    answer3.value = question.answers[2];
    answer4.value = question.answers[3];
    const correctRadio = document.querySelector(
      `input[name="correct-answer"][value="${question.correctIndex}"]`,
    );

    correctRadio.checked = true;
  });

  card.append(title, answersBox, editBtn, deleteBtn);
  questionsList.append(card);
}

function updateQuestionsInfo() {
  questionCounter.textContent = `${questions.length} questions`;

  if (questions.length === 0) {
    questionsEmpty.classList.remove("hidden");
  } else {
    questionsEmpty.classList.add("hidden");
  }
}

function renderPlayerQuestion() {
  const question = activeQuiz.questions[currentQuestionIndex];

  playerTitle.textContent = activeQuiz.title;
  playerQuestion.textContent = question.text;

  playerProgress.textContent = `Question ${currentQuestionIndex + 1} of ${
    activeQuiz.questions.length
  }`;

  const progress =
    ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100;

  progressBar.style.width = `${progress}%`;

  playerAnswers.textContent = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.classList.add("player-answer");
    button.textContent = answer;

    button.addEventListener("click", () => {
      selectedAnswerIndex = index;
      playerAnswers.querySelectorAll(".player-answer").forEach((item) => {
        item.classList.remove("selected");
      });
      button.classList.add("selected");
    });

    playerAnswers.append(button);
  });
}

function cloneQuestions(list) {
  return list.map((question) => {
    return {
      ...question,
      answers: [...question.answers],
    };
  });
}

updateQuestionsInfo();
