const openTaskForm = document.querySelector("#open-task-form");
const closeTaskForm = document.querySelector("#close-task-form");
const taskModal = document.querySelector("#task-modal");
const modalBackdrop = document.querySelector("#modal-backdrop");
const taskForm = document.querySelector("#task-form");
const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const taskStatus = document.querySelector("#task-status");

const todoTasks = document.querySelector("#todo-tasks");
const progressTasks = document.querySelector("#progress-tasks");
const doneTasks = document.querySelector("#done-tasks");

const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#progress-count");
const doneCount = document.querySelector("#done-count");

let tasks = loadTasks();

let editingTaskId = null;
let draggedTaskId = null;

openTaskForm.addEventListener("click", () => {
  editingTaskId = null;
  taskForm.reset();

  taskModal.classList.remove("hidden");
});

closeTaskForm.addEventListener("click", () => {
  editingTaskId = null;
  taskForm.reset();

  taskModal.classList.add("hidden");
});

modalBackdrop.addEventListener("click", () => {
  editingTaskId = null;
  taskForm.reset();

  taskModal.classList.add("hidden");
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const status = taskStatus.value;

  if (title === "") return;

  if (editingTaskId !== null) {
    const task = tasks.find((task) => task.id === editingTaskId);

    if (!task) {
      editingTaskId = null;
      taskForm.reset();
      taskModal.classList.add("hidden");
      return;
    }

    task.title = title;
    task.description = description;
    task.status = status;

    renderTasks();

    editingTaskId = null;
  } else {
    const task = {
      id: Date.now(),
      title,
      description,
      status,
    };

    tasks.push(task);
    renderTask(task);
  }

  updateCounts();
  saveTasks();
  taskForm.reset();
  taskModal.classList.add("hidden");
});

function renderTask(task) {
  const card = document.createElement("div");
  card.classList.add("task-card");
  card.dataset.id = task.id;

  const title = document.createElement("h3");
  title.classList.add("task-card__title");
  title.textContent = task.title;

  const description = document.createElement("p");
  description.classList.add("task-card__description");
  description.textContent = task.description;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("task-card__delete");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("task-card__edit");

  const actions = document.createElement("div");
  actions.classList.add("task-card__actions");

  actions.append(editBtn, delBtn);

  card.append(title, description, actions);

  if (task.status === "todo") {
    todoTasks.append(card);
  } else if (task.status === "progress") {
    progressTasks.append(card);
  } else if (task.status === "done") {
    doneTasks.append(card);
  }

  delBtn.addEventListener("click", function () {
    const index = tasks.findIndex((item) => item.id === task.id);

    if (index === -1) return;

    tasks.splice(index, 1);

    if (editingTaskId === task.id) {
      editingTaskId = null;
      taskForm.reset();
      taskModal.classList.add("hidden");
    }

    card.remove();
    updateCounts();
    saveTasks();
  });

  editBtn.addEventListener("click", function () {
    editingTaskId = task.id;

    taskModal.classList.remove("hidden");

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskStatus.value = task.status;
  });

  card.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;

    event.preventDefault();
    draggedTaskId = task.id;

    card.classList.add("dragging");
  });
}

function renderTasks() {
  todoTasks.textContent = "";
  progressTasks.textContent = "";
  doneTasks.textContent = "";

  tasks.forEach((task) => {
    renderTask(task);
  });
}

document.addEventListener("pointerup", (event) => {
  document.querySelectorAll(".tasks").forEach((item) => {
    item.classList.remove("drag-over");
  });

  if (draggedTaskId === null) return;

  const draggingCard = document.querySelector(".dragging");

  if (draggingCard) {
    draggingCard.classList.remove("dragging");
  }

  const element = document.elementFromPoint(event.clientX, event.clientY);

  const column = element.closest(".tasks");

  if (!column) {
    draggedTaskId = null;
    return;
  }

  const task = tasks.find((task) => task.id === draggedTaskId);

  if (!task) {
    draggedTaskId = null;
    return;
  }

  task.status = column.dataset.status;

  saveTasks();
  renderTasks();
  updateCounts();

  draggedTaskId = null;
});

document.addEventListener("pointermove", (event) => {
  if (draggedTaskId === null) return;

  const element = document.elementFromPoint(event.clientX, event.clientY);

  const column = element.closest(".tasks");

  document.querySelectorAll(".tasks").forEach((item) => {
    item.classList.remove("drag-over");
  });

  if (column) {
    column.classList.add("drag-over");
  }
});

function updateCounts() {
  const todo = tasks.filter((task) => task.status === "todo").length;
  const progress = tasks.filter((task) => task.status === "progress").length;
  const done = tasks.filter((task) => task.status === "done").length;

  todoCount.textContent = todo;
  progressCount.textContent = progress;
  doneCount.textContent = done;
}

function isValidTask(task) {
  return (
    task &&
    typeof task === "object" &&
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    ["todo", "progress", "done"].includes(task.status)
  );
}

function loadTasks() {
  const savedTasks = localStorage.getItem("kanbanTasks");

  if (savedTasks === null) {
    return [];
  }

  try {
    const data = JSON.parse(savedTasks);

    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter(isValidTask);
  } catch (error) {
    console.log("Kanban load error:", error);

    return [];
  }
}

function saveTasks() {
  localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
}

renderTasks();
updateCounts();
