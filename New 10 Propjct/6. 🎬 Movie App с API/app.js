const API_KEY = "9cefaa28";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const movies = document.querySelector("#movies");
const moviesTitle = document.querySelector("#movies-title");
const emptyMessage = document.querySelector("#empty-message");
const errorMessage = document.querySelector("#error-message");
const loading = document.querySelector("#loading");

const favoritesButton = document.querySelector("#favorites-button");
const favoritesCount = document.querySelector("#favorites-count");

const prevPage = document.querySelector("#prev-page");
const pageNumber = document.querySelector("#page-number");
const nextPage = document.querySelector("#next-page");
const pagination = document.querySelector("#pagination");
const typeFilter = document.querySelector("#type-filter");

const params = new URLSearchParams(window.location.search);
const view = params.get("view");

let currentMovies = [];
let currentView = "search";

let currentPage = 1;
let currentSearch = "";
let currentType = "";
let searchRequestId = 0;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  currentView = "search";

  const title = input.value.trim();

  if (title === "") {
    searchRequestId++;
    loading.classList.add("hidden");

    moviesTitle.textContent = "Search movies";

    pagination.classList.add("hidden");
    emptyMessage.textContent = "No title";
    movies.innerHTML = "";
    emptyMessage.classList.remove("hidden");
  } else {
    searchMovies(title, 1, currentType);

    emptyMessage.classList.add("hidden");
    moviesTitle.textContent = `Search: ${title}`;
  }

  input.value = "";
});

favoritesButton.addEventListener("click", () => {
  searchRequestId++;

  loading.classList.add("hidden");
  pagination.classList.add("hidden");
  currentView = "favorites";

  const favorites = getFavorites();

  moviesTitle.textContent = "Favorites";

  if (favorites.length === 0) {
    emptyMessage.textContent = "No favorite movies yet";
  }

  renderMovie(favorites);
});

function updateFavoritesCount() {
  const favorites = getFavorites();

  favoritesCount.textContent = favorites.length;
}

function renderMovie(list) {
  movies.innerHTML = "";

  if (list.length === 0) {
    emptyMessage.classList.remove("hidden");
    currentMovies = [];
    return;
  }

  emptyMessage.classList.add("hidden");
  currentMovies = list;

  const favorites = getFavorites();

  list.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const imageBox = document.createElement("div");
    imageBox.classList.add("movie-card__image");

    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("movie-card__favorite");
    favoriteButton.type = "button";
    favoriteButton.dataset.id = movie.imdbID;
    favoriteButton.textContent = "♥";

    const isFavorite = favorites.some((item) => item.imdbID === movie.imdbID);

    if (isFavorite) {
      favoriteButton.classList.add("active");
    }

    const placeholder = document.createElement("div");
    placeholder.classList.add("movie-card__placeholder");
    placeholder.textContent = "No poster";

    if (movie.Poster && movie.Poster !== "N/A") {
      const image = document.createElement("img");

      image.src = movie.Poster;
      image.alt = movie.Title || "Movie poster";

      placeholder.classList.add("hidden");

      image.addEventListener("error", () => {
        image.remove();
        placeholder.classList.remove("hidden");
      });

      imageBox.append(image);
    }

    imageBox.append(favoriteButton, placeholder);

    const content = document.createElement("div");
    content.classList.add("movie-card__content");

    const title = document.createElement("h3");
    title.classList.add("movie-card__title");
    title.textContent = movie.Title || "Unknown title";

    const year = document.createElement("p");
    year.classList.add("movie-card__year");
    year.textContent = movie.Year || "N/A";

    const detailsLink = document.createElement("a");
    detailsLink.classList.add("movie-card__button");

    detailsLink.href = `movie.html?id=${encodeURIComponent(movie.imdbID)}`;

    detailsLink.textContent = "More details";

    content.append(title, year, detailsLink);

    card.append(imageBox, content);

    movies.append(card);
  });
}

movies.addEventListener("click", (event) => {
  if (event.target.classList.contains("movie-card__favorite")) {
    const favorites = getFavorites();

    const result = currentMovies.find(
      (item) => item.imdbID === event.target.dataset.id,
    );
    if (!result) return;
    const isFavorite = favorites.some((item) => item.imdbID === result.imdbID);
    if (!isFavorite) {
      favorites.push(result);
      saveFavorites(favorites);
      updateFavoritesCount();
      event.target.classList.add("active");
    } else {
      const index = favorites.findIndex(
        (item) => item.imdbID === result.imdbID,
      );
      favorites.splice(index, 1);
      saveFavorites(favorites);
      updateFavoritesCount();
      if (currentView === "favorites") {
        renderMovie(favorites);
      } else {
        event.target.classList.remove("active");
      }
    }
  }
});

nextPage.addEventListener("click", () => {
  searchMovies(currentSearch, currentPage + 1, currentType);
});

prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    searchMovies(currentSearch, currentPage - 1, currentType);
  }
});

typeFilter.addEventListener("change", () => {
  currentType = typeFilter.value;

  if (currentSearch === "") {
    return;
  }

  currentView = "search";
  moviesTitle.textContent = `Search: ${currentSearch}`;

  searchMovies(currentSearch, 1, currentType);
});

async function searchMovies(title, page = 1, type = "") {
  const requestId = ++searchRequestId;

  currentType = type;
  currentSearch = title;
  currentPage = page;

  movies.innerHTML = "";

  pagination.classList.add("hidden");
  currentMovies = [];

  emptyMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  try {
    loading.classList.remove("hidden");

    const encodedTitle = encodeURIComponent(title);

    let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodedTitle}&page=${page}`;

    if (type !== "") {
      url += `&type=${type}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (requestId !== searchRequestId) {
      return;
    }

    if (currentView !== "search") {
      return;
    }

    if (data.Response === "False") {
      pagination.classList.add("hidden");

      const apiError = data.Error || "Unknown API error";

      if (apiError.toLowerCase().includes("not found")) {
        emptyMessage.textContent = "No movies found";
        renderMovie([]);
      } else {
        errorMessage.querySelector("h3").textContent = "Something went wrong";

        errorMessage.querySelector("p").textContent = apiError;

        errorMessage.classList.remove("hidden");
      }

      return;
    }

    renderMovie(data.Search);

    const totalPages = Math.ceil(data.totalResults / 10);

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;

    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage >= totalPages;

    pagination.classList.remove("hidden");
  } catch (error) {
    if (requestId !== searchRequestId) {
      return;
    }

    console.log(error);

    errorMessage.querySelector("h3").textContent = "Something went wrong";

    errorMessage.querySelector("p").textContent = "Please try again.";

    errorMessage.classList.remove("hidden");
  } finally {
    if (requestId === searchRequestId) {
      loading.classList.add("hidden");
    }
  }
}

updateFavoritesCount();

if (view === "favorites") {
  const favorites = getFavorites();

  currentView = "favorites";
  moviesTitle.textContent = "Favorites";

  if (favorites.length === 0) {
    emptyMessage.textContent = "No favorite movies yet";
  }

  renderMovie(favorites);
}

function getFavorites() {
  const savedFavorites = localStorage.getItem("favorites");

  if (savedFavorites === null) {
    return [];
  }

  try {
    const data = JSON.parse(savedFavorites);

    if (!Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.log("Favorites load error:", error);

    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
