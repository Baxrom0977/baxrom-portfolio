const cityInput = document.querySelector(".cityInput");
const searchBtn = document.querySelector(".searchBtn");
const result = document.querySelector(".result");

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchWeather();
  }
});

async function searchWeather() {
  let inptValue = cityInput.value.trim();

  if (inptValue === "") {
    alert("Shahar nomini kiriting");
    return;
  }

  result.textContent = "Loading...";

  try {
    let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(inptValue)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      result.textContent = "Город не найден";
      return;
    }

    const city = data.results[0];

    const weatherUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}` +
      `&longitude=${city.longitude}` +
      `&current=temperature_2m,weather_code,wind_speed_10m`;

    const responseInfo = await fetch(weatherUrl);
    const dataInfo = await responseInfo.json();

    const weatherCondition = getWeatherCondition(dataInfo.current.weather_code);

    result.textContent =
      `${city.name}: ` +
      `${dataInfo.current.temperature_2m}${dataInfo.current_units.temperature_2m}` +
      `${weatherCondition} · ` +
      `Ветер: ${dataInfo.current.wind_speed_10m} ${dataInfo.current_units.wind_speed_10m}`;

    cityInput.value = "";
  } catch (error) {
    result.textContent = "Не удалось загрузить погоду";
  }
}

function getWeatherCondition(code) {
  let weatherCondition = "";
  switch (code) {
    case 0:
      weatherCondition = " Ясно ☀️";
      break;

    case 1:
      weatherCondition = " Преимущественно ясно 🌤️";
      break;

    case 2:
      weatherCondition = "Переменная облачность ⛅";
      break;

    case 3:
      weatherCondition = " Пасмурно ☁️";
      break;

    case 45:
      weatherCondition = " 🌫️ Туман";
      break;
    case 48:
      weatherCondition = " 🌫️ Туман с изморозью";
      break;
    case 51:
      weatherCondition = " 🌦️ Лёгкая морось";
      break;
    case 53:
      weatherCondition = " 🌦️ Морось";
      break;
    case 55:
      weatherCondition = " 🌧️ Сильная морось";
      break;
    case 56:
      weatherCondition = " 🧊 Лёгкая ледяная морось";
      break;
    case 57:
      weatherCondition = " 🧊 Сильная ледяная морось";
      break;
    case 61:
      weatherCondition = " 🌧️ Небольшой дождь";
      break;
    case 63:
      weatherCondition = " 🌧️ Дождь";
      break;
    case 65:
      weatherCondition = " 🌧️ Сильный дождь";
      break;
    case 66:
      weatherCondition = " 🧊 Лёгкий ледяной дождь";
      break;
    case 67:
      weatherCondition = " 🧊 Сильный ледяной дождь";
      break;
    case 71:
      weatherCondition = " ❄️ Небольшой снег";
      break;
    case 73:
      weatherCondition = " ❄️ Снег";
      break;
    case 75:
      weatherCondition = " ❄️ Сильный снег";
      break;
    case 77:
      weatherCondition = " 🌨️ Снежная крупа";
      break;
    case 80:
      weatherCondition = " 🌦️ Небольшой ливень";
      break;
    case 81:
      weatherCondition = " 🌧️ Ливень";
      break;
    case 82:
      weatherCondition = " ⛈️ Сильный ливень";
      break;
    case 85:
      weatherCondition = " 🌨️ Небольшой снегопад";
      break;
    case 86:
      weatherCondition = " ❄️ Сильный снегопад";
      break;
    case 95:
      weatherCondition = " ⛈️ Гроза";
      break;
    case 96:
      weatherCondition = " ⛈️ Гроза с небольшим градом";
      break;
    case 99:
      weatherCondition = " ⛈️ Гроза с сильным градом";
      break;
    default:
      weatherCondition = " Неизвестная погода";
      break;
  }
  return weatherCondition;
}
