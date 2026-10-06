const API_KEY = "9cefaa28";

const movieDetails = document.querySelector("#movie-details");
const movieError = document.querySelector("#movie-error");
const movieLoading = document.querySelector("#movie-loading");
const favoritesCount = document.querySelector("#favorites-count");

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

async function getMovie(id) {
  try {
    movieLoading.classList.remove("hidden");

    const encodedId = encodeURIComponent(id);

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodedId}&plot=full`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "False") {
      movieError.querySelector("h3").textContent = "Movie not found";

      movieError.querySelector("p").textContent =
        data.Error || "Please go back and try again.";

      movieError.classList.remove("hidden");

      return;
    }

    renderMovieDetails(data);
  } catch (error) {
    console.log(error);

    movieError.querySelector("h3").textContent = "Something went wrong";

    movieError.querySelector("p").textContent = "Please try again.";

    movieError.classList.remove("hidden");
  } finally {
    movieLoading.classList.add("hidden");
  }
}

function renderMovieDetails(movie) {
  movieDetails.innerHTML = "";

  const posterBox = document.createElement("div");
  posterBox.classList.add("movie-details__poster");

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

    posterBox.append(image);
  }

  posterBox.append(placeholder);

  const content = document.createElement("div");
  content.classList.add("movie-details__content");

  const label = document.createElement("p");
  label.classList.add("movie-details__label");
  label.textContent = "Movie details";

  const title = document.createElement("h1");
  title.classList.add("movie-details__title");
  title.textContent = movie.Title || "Unknown title";

  const meta = document.createElement("div");
  meta.classList.add("movie-details__meta");

  const year = document.createElement("span");
  year.textContent = movie.Year || "N/A";

  const runtime = document.createElement("span");
  runtime.textContent = movie.Runtime || "N/A";

  const rating = document.createElement("span");
  rating.classList.add("movie-details__rating");
  rating.textContent = `⭐ ${movie.imdbRating || "N/A"}`;

  meta.append(year, runtime, rating);

  const description = document.createElement("p");
  description.classList.add("movie-details__description");
  description.textContent =
    movie.Plot && movie.Plot !== "N/A"
      ? movie.Plot
      : "No description available.";

  const genresBox = document.createElement("div");
  genresBox.classList.add("movie-details__genres");

  if (movie.Genre && movie.Genre !== "N/A") {
    const genres = movie.Genre.split(", ");

    genres.forEach((genre) => {
      const genreElement = document.createElement("span");

      genreElement.classList.add("movie-details__genre");
      genreElement.textContent = genre;

      genresBox.append(genreElement);
    });
  }

  const director = document.createElement("p");
  const directorLabel = document.createElement("strong");

  directorLabel.textContent = "Director: ";

  director.append(
    directorLabel,
    document.createTextNode(movie.Director || "N/A"),
  );

  const actors = document.createElement("p");
  const actorsLabel = document.createElement("strong");

  actorsLabel.textContent = "Actors: ";

  actors.append(actorsLabel, document.createTextNode(movie.Actors || "N/A"));

  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("movie-details__favorite");
  favoriteButton.type = "button";
  favoriteButton.textContent = "Add to favorites";

  content.append(
    label,
    title,
    meta,
    description,
    genresBox,
    director,
    actors,
    favoriteButton,
  );

  movieDetails.append(posterBox, content);

  const favorites = getFavorites();

  const isFavorite = favorites.some((item) => item.imdbID === movie.imdbID);

  if (isFavorite) {
    favoriteButton.textContent = "Remove from favorites";
    favoriteButton.classList.add("active");
  }

  favoriteButton.addEventListener("click", () => {
    const index = favorites.findIndex((item) => item.imdbID === movie.imdbID);

    if (index === -1) {
      favorites.push(movie);

      favoriteButton.textContent = "Remove from favorites";

      favoriteButton.classList.add("active");
    } else {
      favorites.splice(index, 1);

      favoriteButton.textContent = "Add to favorites";

      favoriteButton.classList.remove("active");
    }

    saveFavorites(favorites);
    updateFavoritesCount();
  });
}

function updateFavoritesCount() {
  const favorites = getFavorites();

  favoritesCount.textContent = favorites.length;
}

updateFavoritesCount();

if (!id) {
  movieError.querySelector("h3").textContent = "Movie not found";
  movieError.querySelector("p").textContent = "Movie ID is missing.";

  movieError.classList.remove("hidden");
} else {
  getMovie(id);
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
