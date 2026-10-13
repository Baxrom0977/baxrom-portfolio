const addProjectBtn = document.querySelector("#add-project-btn");
const projectModal = document.querySelector("#project-modal");
const modalClose = document.querySelector("#modal-close");
const modalOverlay = document.querySelector(".modal__overlay");
const modalTitle = document.querySelector("#modal-title");
const cancelBtn = document.querySelector(".cancel-btn");

const projectForm = document.querySelector("#project-form");

const projectTitle = document.querySelector("#project-title");
const projectDescription = document.querySelector("#project-description");
const projectStatus = document.querySelector("#project-status");
const projectDate = document.querySelector("#project-date");
const projectTechnologies = document.querySelector("#project-technologies");
const projectIdInput = document.querySelector("#project-id");

const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const technologyFilter = document.querySelector("#technology-filter");
const sortSelect = document.querySelector("#sort-select");

const projectsContainer = document.querySelector("#projects");
const emptyState = document.querySelector("#empty-state");
const emptyStateTitle = emptyState.querySelector("h3");
const emptyStateText = emptyState.querySelector("p");
const emptyAddBtn = document.querySelector("#empty-add-btn");

const totalProjects = document.querySelector("#total-projects");
const completedProjects = document.querySelector("#completed-projects");
const progressProjects = document.querySelector("#progress-projects");
const plannedProjects = document.querySelector("#planned-projects");

const progressPercent = document.querySelector("#progress-percent");
const progressBar = document.querySelector("#progress-bar");

const projectsCount = document.querySelector("#projects-count");

let projects = [];

function closeModal() {
  projectModal.classList.remove("active");
}

function openModal() {
  projectModal.classList.add("active");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

searchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
technologyFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

addProjectBtn.addEventListener("click", openCreateModal);
emptyAddBtn.addEventListener("click", openCreateModal);

projectForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const projectData = {
    title: projectTitle.value.trim(),
    description: projectDescription.value.trim(),
    status: projectStatus.value,
    date: projectDate.value,

    technologies: projectTechnologies.value
      .split(",")
      .map(function (technology) {
        return technology.trim();
      })
      .filter(function (technology) {
        return technology !== "";
      }),
  };

  if (!projectData.title) {
    alert("Please enter a project name.");
    return;
  }

  if (!projectData.description) {
    alert("Please enter a description.");
    return;
  }

  if (!projectData.date) {
    alert("Please select a date.");
    return;
  }

  if (projectData.technologies.length === 0) {
    alert("Please add at least one technology.");
    return;
  }

  if (projectIdInput.value) {
    const projectId = Number(projectIdInput.value);

    const projectIndex = projects.findIndex(function (project) {
      return project.id === projectId;
    });

    if (projectIndex !== -1) {
      projects[projectIndex] = {
        id: projectId,
        ...projectData,
      };
    }
  } else {
    const newProject = {
      id: Date.now(),
      ...projectData,
    };

    projects.push(newProject);
  }

  saveProjects();
  updateUI();

  projectForm.reset();
  projectIdInput.value = "";

  closeModal();
});

projectsContainer.addEventListener("click", function (event) {
  const actionButton = event.target.closest("[data-action]");

  if (!actionButton) {
    return;
  }

  const projectCard = actionButton.closest(".project-card");

  const projectId = Number(projectCard.dataset.id);
  const action = actionButton.dataset.action;

  if (action === "delete") {
    deleteProject(projectId);
  }

  if (action === "edit") {
    editProject(projectId);
  }

  if (action === "complete") {
    completeProject(projectId);
  }
});

function applyFilters() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const statusValue = statusFilter.value;
  const technologyValue = technologyFilter.value;
  const sortValue = sortSelect.value;

  const filteredProjects = projects.filter(function (project) {
    const titleMatch = project.title.toLowerCase().includes(searchValue);

    const descriptionMatch = project.description
      .toLowerCase()
      .includes(searchValue);

    const technologySearchMatch = project.technologies.some(
      function (technology) {
        return technology.toLowerCase().includes(searchValue);
      },
    );

    const searchMatch = titleMatch || descriptionMatch || technologySearchMatch;

    const statusMatch = statusValue === "all" || project.status === statusValue;

    const technologyFilterMatch =
      technologyValue === "all" ||
      project.technologies.some(function (technology) {
        return technology.toLowerCase() === technologyValue.toLowerCase();
      });

    return searchMatch && statusMatch && technologyFilterMatch;
  });

  const sortedProjects = [...filteredProjects];

  if (sortValue === "newest") {
    sortedProjects.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  if (sortValue === "oldest") {
    sortedProjects.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  }

  if (sortValue === "name") {
    sortedProjects.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }

  renderProjects(sortedProjects);
}

function renderProjects(projectsToRender = projects) {
  projectsContainer.innerHTML = "";

  projectsCount.textContent = `${projectsToRender.length} ${
    projectsToRender.length === 1 ? "project" : "projects"
  }`;

  if (projectsToRender.length === 0) {
    emptyState.classList.remove("hidden");

    if (projects.length === 0) {
      emptyStateTitle.textContent = "No projects yet";
      emptyStateText.textContent =
        "Add your first project and start tracking your progress.";

      emptyAddBtn.classList.remove("hidden");
    } else {
      emptyStateTitle.textContent = "No projects found";
      emptyStateText.textContent = "Try changing your search or filters.";

      emptyAddBtn.classList.add("hidden");
    }

    return;
  }

  emptyState.classList.add("hidden");

  projectsToRender.forEach(function (project) {
    const projectCard = document.createElement("article");
    projectCard.classList.add("project-card");

    projectCard.dataset.id = project.id;

    const cardTop = document.createElement("div");
    cardTop.classList.add("project-card__top");

    const status = document.createElement("span");
    status.classList.add("project-status", `status-${project.status}`);

    status.textContent = getStatusLabel(project.status);

    const cardTitle = document.createElement("h3");
    cardTitle.textContent = project.title;

    const description = document.createElement("p");
    description.classList.add("project-card__description");
    description.textContent = project.description;

    const technologies = document.createElement("div");
    technologies.classList.add("technologies");

    project.technologies.forEach(function (technology) {
      const technologyItem = document.createElement("span");

      technologyItem.classList.add("technology");
      technologyItem.textContent = technology;

      technologies.append(technologyItem);
    });

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("project-card__footer");

    const date = document.createElement("span");
    date.classList.add("project-date");
    date.textContent = formatDate(project.date);

    const actions = document.createElement("div");
    actions.classList.add("project-actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.dataset.action = "edit";
    editBtn.textContent = "✎";
    editBtn.type = "button";
    editBtn.setAttribute("aria-label", `Edit ${project.title}`);

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.dataset.action = "complete";
    completeBtn.textContent = "✓";
    completeBtn.type = "button";
    completeBtn.setAttribute(
      "aria-label",
      `Mark ${project.title} as completed`,
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.action = "delete";
    deleteBtn.textContent = "×";
    deleteBtn.type = "button";
    deleteBtn.setAttribute("aria-label", `Delete ${project.title}`);

    if (project.status !== "completed") {
      actions.append(completeBtn);
    }

    actions.append(editBtn, deleteBtn);

    cardFooter.append(date, actions);

    cardTop.append(status);

    projectCard.append(
      cardTop,
      cardTitle,
      description,
      technologies,
      cardFooter,
    );

    projectsContainer.append(projectCard);
  });
}

function deleteProject(id) {
  const project = projects.find(function (project) {
    return project.id === id;
  });

  if (!project) {
    return;
  }

  const confirmed = confirm(
    `Are you sure you want to delete "${project.title}"?`,
  );

  if (!confirmed) {
    return;
  }

  projects = projects.filter(function (project) {
    return project.id !== id;
  });

  saveProjects();
  updateUI();
}

function completeProject(id) {
  const project = projects.find(function (project) {
    return project.id === id;
  });

  if (!project) {
    return;
  }

  project.status = "completed";

  saveProjects();
  updateUI();
}

function editProject(id) {
  const project = projects.find(function (project) {
    return project.id === id;
  });

  if (!project) {
    return;
  }

  projectIdInput.value = project.id;

  projectTitle.value = project.title;
  projectDescription.value = project.description;
  projectStatus.value = project.status;
  projectDate.value = project.date;

  projectTechnologies.value = project.technologies.join(", ");

  modalTitle.textContent = "Edit Project";

  openModal();
}

function updateStatistics() {
  const total = projects.length;

  const completed = projects.filter(function (project) {
    return project.status === "completed";
  }).length;

  const inProgress = projects.filter(function (project) {
    return project.status === "progress";
  }).length;

  const planned = projects.filter(function (project) {
    return project.status === "planned";
  }).length;

  totalProjects.textContent = total;
  completedProjects.textContent = completed;
  progressProjects.textContent = inProgress;
  plannedProjects.textContent = planned;

  let percent = 0;

  if (total > 0) {
    percent = Math.round((completed / total) * 100);
  }

  progressPercent.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function updateTechnologyFilter() {
  const currentValue = technologyFilter.value;

  const allTechnologies = projects.flatMap(function (project) {
    return project.technologies;
  });

  const uniqueTechnologies = [...new Set(allTechnologies)];

  uniqueTechnologies.sort(function (a, b) {
    return a.localeCompare(b);
  });

  technologyFilter.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All technologies";

  technologyFilter.append(allOption);

  uniqueTechnologies.forEach(function (technology) {
    const option = document.createElement("option");

    option.value = technology;
    option.textContent = technology;

    technologyFilter.append(option);
  });

  if (uniqueTechnologies.includes(currentValue)) {
    technologyFilter.value = currentValue;
  } else {
    technologyFilter.value = "all";
  }
}

function updateUI() {
  updateStatistics();
  updateTechnologyFilter();
  applyFilters();
}

function getStatusLabel(status) {
  if (status === "completed") {
    return "Completed";
  }

  if (status === "progress") {
    return "In Progress";
  }

  if (status === "planned") {
    return "Planned";
  }

  return status;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function openCreateModal() {
  projectForm.reset();
  projectIdInput.value = "";

  modalTitle.textContent = "Add Project";

  openModal();
}

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjects() {
  const savedProjects = localStorage.getItem("projects");

  if (savedProjects) {
    try {
      projects = JSON.parse(savedProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);

      projects = [];
      localStorage.removeItem("projects");
    }
  }

  updateUI();
}

loadProjects();

const project = {
  title: "Weather App",
  status: "progress",
  technologies: ["HTML", "CSS", "JavaScript"],
};

const { title, technologies } = project;

console.log(title);
console.log(technologies);
