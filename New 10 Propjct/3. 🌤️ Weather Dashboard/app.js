const cityForm = document.querySelector("#city-form");
const cityInput = document.querySelector("#city-input");
const statusMessage = document.querySelector("#status-message");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const submitButton = cityForm.querySelector('button[type="submit"]');
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const currentDate = document.querySelector("#current-date");
const description = document.querySelector("#description");
const favoriteButton = document.querySelector("#favorite-button");
const favoritesList = document.querySelector("#favorites-list");
const favoritesEmpty = document.querySelector("#favorites-empty");
const forecastList = document.querySelector("#forecast-list");
const forecastEmpty = document.querySelector("#forecast-empty");
const temperatureMin = document.querySelector("#temperature-min");
const temperatureMax = document.querySelector("#temperature-max");
const weatherIcon = document.querySelector("#weather-icon");
const citySuggestions = document.querySelector("#city-suggestions");

let selectedCity = null;
let isLoading = false;
function setLoading(value) {
  isLoading = value;
  submitButton.disabled = value;

  if (value) {
    favoriteButton.disabled = true;
  } else {
    updateFavoriteButton();
  }
}
const favoriteCities = [];
let searchTimer;
let suggestionsVersion = 0;

const LAST_CITY_KEY = "weatherDashboard.lastCity.v1";
const FAVORITES_KEY = "weatherDashboard.favoriteCities.v1";

cityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isLoading) {
    return;
  }
  const cityInputValue = cityInput.value.trim();
  if (cityInputValue === "") {
    statusMessage.textContent = "Введите название города";
    return;
  }

  suggestionsVersion++;
  clearTimeout(searchTimer);
  renderSuggestions([]);

  setLoading(true);

  statusMessage.textContent = "Ищем город…";
  try {
    const city = await findCity(cityInputValue);

    if (city === null) {
      statusMessage.textContent = "Город не найден";
      return;
    }

    await showCityWeather(city);

    statusMessage.textContent = "";
    cityForm.reset();
    suggestionsVersion++;
    clearTimeout(searchTimer);
    renderSuggestions([]);
  } catch (error) {
    statusMessage.textContent =
      "Не удалось загрузить данные. Попробуйте ещё раз";
    console.error(error);
  } finally {
    setLoading(false);
  }
});

cityInput.addEventListener("input", () => {
  clearTimeout(searchTimer);

  const version = ++suggestionsVersion;

  renderSuggestions([]);

  if (isLoading) {
    return;
  }

  const query = cityInput.value.trim();

  if (query.length < 2) return;

  searchTimer = setTimeout(async () => {
    try {
      const cities = await searchCities(query);

      if (version !== suggestionsVersion) return;

      renderSuggestions(cities);
    } catch (error) {
      console.error(error);
    }
  }, 400);
});

function renderSuggestions(cities) {
  citySuggestions.replaceChildren();
  citySuggestions.hidden = cities.length === 0;

  cities.forEach((city) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = [city.name, city.admin1, city.country]
      .filter(Boolean)
      .join(", ");
    button.addEventListener("click", async () => {
      if (isLoading) return;

      suggestionsVersion++;

      clearTimeout(searchTimer);
      cityInput.value = city.name;
      renderSuggestions([]);

      setLoading(true);
      statusMessage.textContent = "Загружаем погоду…";

      try {
        await showCityWeather(city);

        statusMessage.textContent = "";
      } catch (error) {
        statusMessage.textContent = "Не удалось загрузить погоду";
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    item.append(button);
    citySuggestions.append(item);
  });
  // Здесь перебери cities через forEach
}

async function searchCities(name) {
  const params = new URLSearchParams({
    name,
    count: "3",
    language: "ru",
    format: "json",
  });

  const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Не удалось загрузить подсказки");
  }

  const data = await response.json();

  if (!Array.isArray(data.results)) {
    return [];
  }

  return data.results.filter(isValidCity);
}

async function findCity(name) {
  const params = new URLSearchParams({
    name: name,
    count: "1",
    language: "ru",
    format: "json",
  });

  const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Ошибка запроса к серверу");
  }

  const data = await response.json();
  if (!Array.isArray(data.results)) {
    return null;
  }

  const city = data.results.find(isValidCity);

  return city ?? null;
}

async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code",
    timezone: "auto",
    wind_speed_unit: "ms",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Не удалось получить погоду");
  }
  const data = await response.json();
  if (
    !data.current ||
    !data.daily ||
    typeof data.current.time !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(data.current.time) ||
    !Number.isFinite(data.current.temperature_2m) ||
    !Number.isFinite(data.current.apparent_temperature) ||
    !Number.isFinite(data.current.relative_humidity_2m) ||
    !Number.isFinite(data.current.wind_speed_10m) ||
    !Number.isFinite(data.current.weather_code)
  ) {
    throw new Error("Некорректные данные текущей погоды");
  }

  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
    data.daily;

  if (
    !Array.isArray(time) ||
    !Array.isArray(temperature_2m_max) ||
    !Array.isArray(temperature_2m_min) ||
    !Array.isArray(weather_code) ||
    time.length === 0 ||
    temperature_2m_max.length !== time.length ||
    temperature_2m_min.length !== time.length ||
    weather_code.length !== time.length
  ) {
    throw new Error("Некорректные данные прогноза");
  }

  const validForecastValues = time.every((day, index) => {
    return (
      typeof day === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(day) &&
      Number.isFinite(temperature_2m_max[index]) &&
      Number.isFinite(temperature_2m_min[index]) &&
      Number.isInteger(weather_code[index])
    );
  });

  if (!validForecastValues) {
    throw new Error("Некорректные значения прогноза");
  }

  return {
    current: data.current,
    daily: data.daily,
  };
}

async function showCityWeather(city) {
  const weather = await getWeather(city.latitude, city.longitude);

  renderWeather(city, weather.current);
  renderForecast(weather.daily);

  selectedCity = city;
  updateFavoriteButton();
  saveLastCity(city);
}

function loadLastCity() {
  try {
    const saved = localStorage.getItem(LAST_CITY_KEY);

    if (saved === null) return null;

    const city = JSON.parse(saved);

    if (!isValidCity(city)) {
      return null;
    }

    return city;
  } catch (error) {
    console.error("Не удалось прочитать последний город", error);
    return null;
  }
}

function renderWeather(city, weather) {
  cityName.textContent = city.name;
  temperature.textContent = `${Math.round(weather.temperature_2m)} °C`;
  feelsLike.textContent = `${Math.round(weather.apparent_temperature)} °C`;
  humidity.textContent = `${Math.round(weather.relative_humidity_2m)}`;
  windSpeed.textContent = `${weather.wind_speed_10m}`;

  const parts = weather.time.split("T");
  const date = parts[0].split("-");

  currentDate.textContent = `${date[2]}.${date[1]}.${date[0]} - ${parts[1]}`;
  const condition = getWeatherCondition(weather.weather_code);
  description.textContent = condition.text;
  weatherIcon.textContent = condition.icon;
}

favoriteButton.addEventListener("click", () => {
  if (isLoading || selectedCity === null) {
    return;
  }

  const index = favoriteCities.findIndex((city) => {
    return city.id === selectedCity.id;
  });

  if (index === -1) {
    favoriteCities.push(selectedCity);

    statusMessage.textContent = "Город добавлен в избранное";
  } else {
    favoriteCities.splice(index, 1);

    statusMessage.textContent = "Город удалён из избранного";
  }

  const saved = saveFavorites();

  renderFavorite();
  updateFavoriteButton();

  if (!saved) {
    statusMessage.textContent = "Не удалось сохранить изменения в браузере";
  }
});

function renderFavorite() {
  favoritesList.replaceChildren();
  favoritesEmpty.hidden = favoriteCities.length > 0;

  favoriteCities.forEach((element) => {
    const row = document.createElement("div");
    row.className = "favorite-row";

    const favoriteBtn = document.createElement("button");
    favoriteBtn.classList.add("favorite-city");
    favoriteBtn.type = "button";
    favoriteBtn.textContent = element.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Удалить";
    deleteBtn.className = "delete-favorite";

    deleteBtn.addEventListener("click", () => {
      if (isLoading) {
        return;
      }

      const index = favoriteCities.findIndex((city) => {
        return city.id === element.id;
      });

      if (index === -1) {
        return;
      }

      favoriteCities.splice(index, 1);
      updateFavoriteButton();
      const saved = saveFavorites();
      renderFavorite();

      if (saved) {
        statusMessage.textContent = "Город удалён из избранного";
      } else {
        statusMessage.textContent =
          "Город удалён из списка, но после перезагрузки может вернуться";
      }
    });

    row.append(favoriteBtn, deleteBtn);
    favoritesList.append(row);

    favoriteBtn.addEventListener("click", async () => {
      if (isLoading) {
        return;
      }

      suggestionsVersion++;
      clearTimeout(searchTimer);
      renderSuggestions([]);

      setLoading(true);
      statusMessage.textContent = "Загружаем погоду…";

      try {
        await showCityWeather(element);

        statusMessage.textContent = "";
      } catch (error) {
        statusMessage.textContent = "Не удалось загрузить погоду";

        console.error(error);
      } finally {
        setLoading(false);
      }
    });
  });
}

function updateFavoriteButton() {
  if (selectedCity === null) {
    favoriteButton.disabled = true;
    favoriteButton.textContent = "☆ В избранное";
    favoriteButton.setAttribute("aria-pressed", "false");

    return;
  }

  favoriteButton.disabled = false;

  const alreadyAdded = favoriteCities.some((city) => {
    return city.id === selectedCity.id;
  });

  favoriteButton.setAttribute("aria-pressed", String(alreadyAdded));

  if (alreadyAdded) {
    favoriteButton.textContent = "★ В избранном";
  } else {
    favoriteButton.textContent = "☆ В избранное";
  }
}
updateFavoriteButton();

function renderForecast(daily) {
  temperatureMin.textContent = `${Math.round(daily.temperature_2m_min[0])} °C`;
  temperatureMax.textContent = `${Math.round(daily.temperature_2m_max[0])} °C`;
  forecastList.replaceChildren();
  forecastEmpty.hidden = daily.time.length > 0;

  daily.time.forEach((element, index) => {
    const article = document.createElement("article");
    article.className = "forecast-card";
    const date = element.split("-");
    article.textContent = `${date[2]}.${date[1]}.${date[0]}`;
    const maxTemperature = document.createElement("p");
    const minTemperature = document.createElement("p");
    const descriptionDaily = document.createElement("p");

    maxTemperature.textContent = `Макс. ${Math.round(
      daily.temperature_2m_max[index],
    )} °C`;
    minTemperature.textContent = `Мин. ${Math.round(
      daily.temperature_2m_min[index],
    )} °C`;
    const condition = getWeatherCondition(daily.weather_code[index]);
    descriptionDaily.textContent = `${condition.icon} ${condition.text}`;

    article.append(descriptionDaily, maxTemperature, minTemperature);

    forecastList.append(article);
  });
}

function isValidCity(city) {
  return (
    city !== null &&
    typeof city === "object" &&
    Number.isInteger(city.id) &&
    typeof city.name === "string" &&
    city.name.trim() !== "" &&
    Number.isFinite(city.latitude) &&
    city.latitude >= -90 &&
    city.latitude <= 90 &&
    Number.isFinite(city.longitude) &&
    city.longitude >= -180 &&
    city.longitude <= 180
  );
}

function getWeatherCondition(code) {
  let weatherCondition = "";
  switch (code) {
    case 0:
      weatherCondition = { icon: "☀️", text: "Ясно" };
      break;

    case 1:
      weatherCondition = { icon: "🌤️", text: "Преимущественно ясно" };
      break;

    case 2:
      weatherCondition = { icon: "⛅", text: "Переменная облачность" };
      break;

    case 3:
      weatherCondition = { icon: "☁️", text: "Пасмурно" };
      break;

    case 45:
      weatherCondition = { icon: "🌫️", text: "Туман" };
      break;
    case 48:
      weatherCondition = { icon: "🌫️", text: "Туман с изморозью" };
      break;
    case 51:
      weatherCondition = { icon: "🌦️", text: "Лёгкая морось" };
      break;
    case 53:
      weatherCondition = { icon: "🌦️", text: "Морось" };
      break;
    case 55:
      weatherCondition = { icon: "🌧️", text: "Сильная морось" };
      break;
    case 56:
      weatherCondition = { icon: "🧊", text: "Лёгкая ледяная морось" };
      break;
    case 57:
      weatherCondition = { icon: "🧊", text: "Сильная ледяная морось" };
      break;
    case 61:
      weatherCondition = { icon: "🌧️", text: "Небольшой дождь" };
      break;
    case 63:
      weatherCondition = { icon: "🌧️", text: "Дождь" };
      break;
    case 65:
      weatherCondition = { icon: "🌧️", text: "Сильный дождь" };
      break;
    case 66:
      weatherCondition = { icon: "🧊", text: "Лёгкий ледяной дождь" };
      break;
    case 67:
      weatherCondition = { icon: "🧊", text: "Сильный ледяной дождь" };
      break;
    case 71:
      weatherCondition = { icon: "❄️", text: "Небольшой снег" };
      break;
    case 73:
      weatherCondition = { icon: "❄️", text: "Снег" };
      break;
    case 75:
      weatherCondition = { icon: "❄️", text: "Сильный снег" };
      break;
    case 77:
      weatherCondition = { icon: "🌨️", text: "Снежная крупа" };
      break;
    case 80:
      weatherCondition = { icon: "🌦️", text: "Небольшой ливень" };
      break;
    case 81:
      weatherCondition = { icon: "🌧️", text: " Ливень" };
      break;
    case 82:
      weatherCondition = { icon: "⛈️", text: " Сильный ливень" };
      break;
    case 85:
      weatherCondition = { icon: "🌨️", text: " Небольшой снегопад" };
      break;
    case 86:
      weatherCondition = { icon: "❄️", text: " Сильный снегопад" };
      break;
    case 95:
      weatherCondition = { icon: "⛈️", text: " Гроза" };
      break;
    case 96:
      weatherCondition = { icon: "⛈️", text: " Гроза с небольшим градом" };
      break;
    case 99:
      weatherCondition = { icon: "⛈️", text: " Гроза с сильным градом" };
      break;
    default:
      weatherCondition = { icon: "?", text: "Неизвестная погода" };
      break;
  }
  return weatherCondition;
}

function saveLastCity(city) {
  try {
    localStorage.setItem(LAST_CITY_KEY, JSON.stringify(city));
  } catch (error) {
    console.error("Не удалось сохранить последний город", error);
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteCities));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function loadFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);

    if (saved === null) {
      return;
    }

    const cities = JSON.parse(saved);

    if (!Array.isArray(cities)) {
      throw new Error("Ожидался массив городов");
    }
    const validCities = cities.every(isValidCity);

    if (!validCities) {
      throw new Error("Некорректные данные городов");
    }

    favoriteCities.push(...cities);
  } catch (error) {
    statusMessage.textContent = "Не удалось восстановить избранное";
    console.error(error);
  }
}
async function loadDefaultCity() {
  setLoading(true);
  statusMessage.textContent = "Загружаем погоду…";

  try {
    let city = loadLastCity();

    if (city === null) {
      city = await findCity("tashkent");
    }

    if (city === null) {
      statusMessage.textContent = "Город не найден";
      return;
    }
    await showCityWeather(city);
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Не удалось загрузить погоду";
    console.error(error);
  } finally {
    setLoading(false);
  }
}

function migrateWeatherStorage() {
  try {
    if (localStorage.getItem(LAST_CITY_KEY) === null) {
      const oldLastCity = localStorage.getItem("lastCity");

      if (oldLastCity !== null) {
        localStorage.setItem(LAST_CITY_KEY, oldLastCity);
      }
    }

    if (localStorage.getItem(FAVORITES_KEY) === null) {
      const oldFavorites = localStorage.getItem("favoriteCities");

      if (oldFavorites !== null) {
        localStorage.setItem(FAVORITES_KEY, oldFavorites);
      }
    }
  } catch (error) {
    console.error("Не удалось перенести данные Weather App", error);
  }
}

migrateWeatherStorage();

loadFavorites();
renderFavorite();
loadDefaultCity();
