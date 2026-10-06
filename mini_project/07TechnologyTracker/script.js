const techInput = document.querySelector(".techInput");
const descriptionInput = document.querySelector(".descriptionInput");
const addBtn = document.querySelector(".addBtn");
const techList = document.querySelector(".techList");
const countTech = document.querySelector(".countTech");
const learnedCountTech = document.querySelector(".learnedcountTech");

let technology = [];

addBtn.addEventListener("click", function () {
  const techName = techInput.value.trim();
  const techDescription = descriptionInput.value.trim();

  if (techName === "" || techDescription === "") {
    return;
  }

  const newTech = {
    title: techName,
    description: techDescription,
    status: false,
  };

  technology.push(newTech);

  saveTechnology();
  renderTechnology();

  techInput.value = "";
  descriptionInput.value = "";
});

function renderTechnology() {
  techList.innerHTML = "";

  technology.forEach((element, index) => {
    const techBox = document.createElement("div");
    const techTitle = document.createElement("h3");
    const techInfo = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const statusBtn = document.createElement("button");

    techTitle.textContent = element.title;
    techInfo.textContent = element.description;

    deleteBtn.textContent = "Удалить";

    if (element.status === true) {
      statusBtn.textContent = "Изучено";
    } else {
      statusBtn.textContent = "Не изучено";
    }

    techBox.append(techTitle);
    techBox.append(techInfo);
    techBox.append(deleteBtn);
    techBox.append(statusBtn);

    techList.append(techBox);

    deleteBtn.addEventListener("click", function () {
      technology.splice(index, 1);

      saveTechnology();
      renderTechnology();
    });

    statusBtn.addEventListener("click", function () {
      element.status = !element.status;

      saveTechnology();
      renderTechnology();
    });
  });

  const learnedTechnology = technology.filter((element) => {
    return element.status === true;
  });

  countTech.textContent = "Всего технологий: " + technology.length;
  learnedCountTech.textContent = "Изучено: " + learnedTechnology.length;
}

function saveTechnology() {
  localStorage.setItem("technology", JSON.stringify(technology));
}

function loadTechnology() {
  const savedTechnology = localStorage.getItem("technology");

  if (savedTechnology) {
    technology = JSON.parse(savedTechnology);
  }
}

loadTechnology();
renderTechnology();
