const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const loading = document.querySelector("#loading");
const errorMessage = document.querySelector("#error-message");
const profile = document.querySelector("#profile");
const repositories = document.querySelector("#repositories");

const profileAvatar = document.querySelector("#profile-avatar");
const profileName = document.querySelector("#profile-name");
const profileUsername = document.querySelector("#profile-username");
const profileBio = document.querySelector("#profile-bio");

const profileLocation = document.querySelector("#profile-location");
const profileCompany = document.querySelector("#profile-company");
const profileBlog = document.querySelector("#profile-blog");
const profileLink = document.querySelector("#profile-link");

const reposCount = document.querySelector("#repos-count");
const followersCount = document.querySelector("#followers-count");
const followingCount = document.querySelector("#following-count");

const repositoriesSection = document.querySelector("#repositories-section");
const repositoriesEmpty = document.querySelector("#repositories-empty");
const repositoriesCount = document.querySelector("#repositories-count");

const pagination = document.querySelector("#pagination");
const prevPage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
const pageNumber = document.querySelector("#page-number");

let currentUsername = "";
let currentPage = 1;
let totalRepositories = 0;

let userRequestId = 0;
let repositoriesRequestId = 0;

nextPage.addEventListener("click", function () {
  getRepositories(currentUsername, currentPage + 1, userRequestId);
});

prevPage.addEventListener("click", function () {
  if (currentPage > 1) {
    getRepositories(currentUsername, currentPage - 1, userRequestId);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = input.value.trim();

  if (username === "") {
    userRequestId++;
    repositoriesRequestId++;
    loading.classList.add("hidden");
    return;
  }

  const requestId = ++userRequestId;

  repositoriesRequestId++;

  getUser(username, requestId);

  form.reset();
});

async function getUser(username, requestId) {
  try {
    loading.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    profile.classList.add("hidden");
    repositoriesSection.classList.add("hidden");
    pagination.classList.add("hidden");

    const url = `https://api.github.com/users/${encodeURIComponent(username)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (requestId !== userRequestId) {
      return;
    }

    if (response.status === 403) {
      showError(
        "API limit exceeded",
        "GitHub request limit reached. Please try again later.",
      );

      return;
    }

    if (!response.ok) {
      showError("User not found", "Please check the username and try again.");

      return;
    }

    renderProfile(data);

    currentUsername = username;
    currentPage = 1;

    await getRepositories(username, 1, requestId);
  } catch (error) {
    if (requestId !== userRequestId) {
      return;
    }

    console.log(error);

    showError("Network error", "Please check your connection and try again.");
  } finally {
    if (requestId === userRequestId) {
      loading.classList.add("hidden");
    }
  }
}

function renderProfile(data) {
  profileAvatar.src = data.avatar_url;
  profileAvatar.alt = `${data.login} avatar`;
  profileName.textContent = data.name || data.login;
  profileUsername.textContent = `@${data.login}`;
  profileBio.textContent = data.bio || "No bio";

  profileLocation.textContent = data.location
    ? `📍 ${data.location}`
    : "Location not specified";

  profileCompany.textContent = data.company
    ? `🏢 ${data.company}`
    : "Company not specified";

  if (data.blog) {
    profileBlog.textContent = data.blog;

    if (data.blog.startsWith("http://") || data.blog.startsWith("https://")) {
      profileBlog.href = data.blog;
    } else {
      profileBlog.href = `https://${data.blog}`;
    }
  } else {
    profileBlog.textContent = "No website";
    profileBlog.removeAttribute("href");
  }

  profileLink.href = data.html_url;

  reposCount.textContent = data.public_repos;
  totalRepositories = data.public_repos;

  followersCount.textContent = data.followers;
  followingCount.textContent = data.following;

  profile.classList.remove("hidden");
}

async function getRepositories(username, page = 1, userId = userRequestId) {
  const repoRequestId = ++repositoriesRequestId;
  try {
    const url = `https://api.github.com/users/${encodeURIComponent(
      username,
    )}/repos?per_page=6&page=${page}`;

    const response = await fetch(url);
    const data = await response.json();

    if (userId !== userRequestId || repoRequestId !== repositoriesRequestId) {
      return;
    }

    if (response.status === 403) {
      showError(
        "API limit exceeded",
        "GitHub request limit reached. Please try again later.",
      );

      return;
    }

    if (!response.ok) {
      showError("Repositories error", "Could not load repositories.");

      return;
    }
    renderRepositories(data);

    currentPage = page;

    if (totalRepositories === 0) {
      return;
    }

    const totalPages = Math.ceil(totalRepositories / 6);

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage >= totalPages;

    pagination.classList.remove("hidden");
  } catch (error) {
    if (userId !== userRequestId || repoRequestId !== repositoriesRequestId) {
      return;
    }

    console.log(error);

    showError("Network error", "Could not load repositories.");
  }
}

function renderRepositories(data) {
  repositories.textContent = "";

  if (data.length === 0) {
    repositoriesEmpty.classList.remove("hidden");
    repositoriesSection.classList.remove("hidden");
    repositoriesCount.textContent = "0 repositories";
    pagination.classList.add("hidden");
    return;
  }

  repositoriesEmpty.classList.add("hidden");
  repositoriesSection.classList.remove("hidden");

  const sortedRepos = [...data].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );

  sortedRepos.forEach((repo) => {
    const card = document.createElement("div");
    card.classList.add("repository-card");

    const name = document.createElement("h3");
    name.classList.add("repository-card__name");
    name.textContent = repo.name;

    const description = document.createElement("p");
    description.classList.add("repository-card__description");
    description.textContent = repo.description || "No description";

    const meta = document.createElement("div");
    meta.classList.add("repository-card__meta");

    const link = document.createElement("a");

    link.classList.add("repository-card__link");
    link.textContent = "Open repository";
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const language = document.createElement("span");
    language.textContent = repo.language || "Unknown language";

    const stars = document.createElement("span");
    stars.textContent = `⭐ ${repo.stargazers_count}`;

    meta.append(language);
    meta.append(stars);

    card.append(name);
    card.append(description);
    card.append(meta);
    card.append(link);

    repositories.append(card);
  });

  repositoriesCount.textContent = `Showing ${data.length} of ${totalRepositories} repositories`;
}

function showError(title, message) {
  errorMessage.querySelector("h3").textContent = title;
  errorMessage.querySelector("p").textContent = message;

  errorMessage.classList.remove("hidden");
}
