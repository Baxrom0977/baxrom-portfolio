const taskInput = document.querySelector(".taskInput");
const addBtn = document.querySelector(".addBtn");
const tasks = document.querySelector(".tasks");
const taskCount = document.querySelector(".taskCount");
const completedCount = document.querySelector(".completedCount");
const filterBtn = document.querySelectorAll(".filterBtn");
const searchInput = document.querySelector(".searchInput");
const deleteCompleteBtn = document.querySelector(".deleteCompleteBtn");
const emptyMessage = document.querySelector(".emptyMessage");

let taskList = [];
let currentFilter = "all";
let searchText = "";

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
    renderTasks();
  }
});

addBtn.addEventListener("click", function () {
  addTask();
  renderTasks();
});

deleteCompleteBtn.addEventListener("click", function () {
  taskList = taskList.filter((element) => {
    return element.completed === false;
  });
  renderTasks();
  saveTasks();
});

function addTask() {
  let taskName = taskInput.value.trim();
  if (taskName === "") {
    return;
  }
  let newtask = {
    name: taskName,
    completed: false,
    createdAt: new Date(),
  };
  taskList.push(newtask);
  saveTasks();
  taskInput.value = "";
}
function formatDate(createdAt) {
  let date = new Date(createdAt);

  let month = date.getMonth() + 1;
  let months = month < 10 ? "0" + month : "" + month;
  let days = date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate();
  let hours =
    date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes();
  return `${days}.${months} ${hours}:${minutes}`;
}
function renderTasks() {
  let filteredTasks = taskList.map((element, index) => {
    return {
      ...element,
      index: index,
    };
  });

  if (currentFilter === "active") {
    filteredTasks = filteredTasks.filter((element) => {
      return element.completed === false;
    });
  } else if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter((element) => {
      return element.completed === true;
    });
  }

  filteredTasks = filteredTasks.filter((element) => {
    return element.name.toLowerCase().includes(searchText);
  });

  tasks.innerHTML = "";

  if (filteredTasks.length === 0) {
    tasks.textContent = "У вас пока нет задач";
  }

  taskCount.textContent = taskList.length;

  const completedTasks = taskList.filter((element) => {
    return element.completed === true;
  });

  completedCount.textContent = completedTasks.length;

  filteredTasks.forEach((element) => {
    const task = document.createElement("div");

    task.classList.add("task");

    if (element.completed) {
      task.classList.add("completed");
    }

    task.dataset.index = element.index;

    const time = document.createElement("p");
    time.classList.add("time");
    time.textContent = formatDate(element.createdAt);

    const completeButton = document.createElement("button");
    completeButton.classList.add("completeBtn");
    completeButton.dataset.index = element.index;
    completeButton.textContent = "✓";

    const taskText = document.createElement("p");
    taskText.classList.add("taskText");

    taskText.textContent = element.name;

    const editButton = document.createElement("button");
    editButton.classList.add("editBtn");
    editButton.dataset.index = element.index;
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteBtn");
    deleteButton.dataset.index = element.index;
    deleteButton.textContent = "Delete";

    task.append(time, completeButton, taskText, editButton, deleteButton);

    tasks.append(task);
  });

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((element) => {
    element.addEventListener("click", function () {
      const index = Number(element.dataset.index);

      taskList.splice(index, 1);

      renderTasks();
      saveTasks();
    });
  });

  const completeBtn = document.querySelectorAll(".completeBtn");

  completeBtn.forEach((element) => {
    element.addEventListener("click", function () {
      const index = Number(element.dataset.index);

      taskList[index].completed = !taskList[index].completed;

      renderTasks();
      saveTasks();
    });
  });

  const editBtn = document.querySelectorAll(".editBtn");

  editBtn.forEach((element) => {
    element.addEventListener("click", function () {
      const index = Number(element.dataset.index);

      let newName = prompt("Введите новое название", taskList[index].name);

      if (newName === null) {
        return;
      }

      newName = newName.trim();

      if (newName === "") {
        return;
      }

      taskList[index].name = newName;

      renderTasks();
      saveTasks();
    });
  });
}

searchInput.addEventListener("input", function () {
  searchText = searchInput.value.toLowerCase();
  renderTasks();
});

filterBtn.forEach((element) => {
  element.addEventListener("click", function () {
    filterBtn.forEach((button) => {
      button.classList.remove("active");
    });
    currentFilter = element.dataset.filter;

    element.classList.add("active");
    renderTasks();
  });
});

function isValidTask(task) {
  return (
    task &&
    typeof task === "object" &&
    typeof task.name === "string" &&
    typeof task.completed === "boolean" &&
    typeof task.createdAt === "string" &&
    !Number.isNaN(new Date(task.createdAt).getTime())
  );
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks === null) {
    taskList = [];
    return;
  }

  try {
    const data = JSON.parse(savedTasks);

    if (!Array.isArray(data)) {
      taskList = [];
      return;
    }

    taskList = data.filter(isValidTask);
  } catch (error) {
    console.log("Final JS App load error:", error);

    taskList = [];
  }
}

loadTasks();
renderTasks();
