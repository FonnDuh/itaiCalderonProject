const API_KEY = "25c97fa0700864ea4f57de31c8195c12";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const inputElement = document.getElementById("cityInput");
const forecastContainer = document.getElementById("forecast");
const hourlyContainer = document.getElementById("hourly");
const errorMessagesElement = document.getElementById("errorMessages");
let isMetric = true;

function displayError(message) {
  errorMessagesElement.textContent = message;
  errorMessagesElement.style.display = "block";
  setTimeout(clearError, 5000);
}

function clearError() {
  errorMessagesElement.textContent = "";
  errorMessagesElement.style.display = "none";
}

async function fetchWeatherData(endpoint, params = {}) {
  const urlParams = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: isMetric ? "metric" : "imperial",
  });
  const response = await fetch(`${BASE_URL}${endpoint}?${urlParams}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Error fetching data: ${response.statusText} (${errorText})`
    );
  }
  return response.json();
}

async function getWeather(city) {
  if (!city.trim()) {
    displayError("Please enter a city name.");
    return;
  }

  try {
    clearError();
    const weatherData = await fetchWeatherData("weather", { q: city });
    displayWeather(weatherData);
    getForecast(city);
    getHourlyWeather(city);
  } catch (error) {
    console.error(`Error fetching weather: ${error.message}`);
    displayError(error.message);
  }
}

async function displayWeather(data) {
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;

  document.getElementById("city").textContent = data.name;
  document.getElementById("temperature").textContent = `Temperature: ${
    data.main.temp
  }°${isMetric ? "C" : "F"}`;
  document.getElementById("feelsLike").textContent = `Feels Like: ${
    data.main.feels_like
  }°${isMetric ? "C" : "F"}`;

  const { aqi, level } = await getAQI(data.coord.lat, data.coord.lon);

  document.getElementById("details").innerHTML = `
    <div class="detail-item">
      <p>Humidity: ${data.main.humidity}%</p>
      <p>AQI: ${aqi}, Level: ${level}</p>
    </div>
    <div class="detail-item">
      <p>Dew Point: ${(data.main.temp - (100 - data.main.humidity) / 5).toFixed(
        1
      )}°${isMetric ? "C" : "F"}</p>
      <p>Wind: ${data.wind.speed} ${isMetric ? "m/s" : "mph"} (${
    data.wind.deg
  }°)</p>
    </div>
  `;
  document.getElementById(
    "description"
  ).textContent = `Weather: ${data.weather[0].description}`;
}

async function getForecast(city) {
  try {
    const forecastData = await fetchWeatherData("forecast", { q: city }),
      dailyForecasts = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
    forecastContainer.innerHTML = "";
    dailyForecasts.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-GB");
      forecastContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="col-md-4">
          <div class="card text-center p-3 mb-3">
            <h5>${date}</h5>
            <img src="https://openweathermap.org/img/wn/${
              item.weather[0].icon
            }@2x.png" alt="${item.weather[0].description}">
            <p>${item.weather[0].description}</p>
            <p><strong>${item.main.temp}°${isMetric ? "C" : "F"}</strong></p>
          </div>
        </div>
      `
      );
    });
  } catch (error) {
    console.error(`Error fetching forecast: ${error.message}`);
    displayError(error.message);
  }
}

async function getHourlyWeather(city) {
  try {
    const hourlyData = await fetchWeatherData("forecast", { q: city });
    hourlyContainer.innerHTML = "";
    const hourlyForecasts = hourlyData.list.slice(0, 9);
    hourlyForecasts.forEach((item) => {
      const time = new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      hourlyContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="text-center me-3">
          <p class="fs-6">${time}</p>
          <img src="https://openweathermap.org/img/wn/${
            item.weather[0].icon
          }@2x.png" alt="${
          item.weather[0].description
        }" style="max-width: 50px;">
          <p class="fs-6">${item.main.temp}°${isMetric ? "C" : "F"}</p>
          <p class="fs-6">${item.weather[0].description}</p>
        </div>
      `
      );
    });
  } catch (error) {
    console.error(`Error fetching hourly weather: ${error.message}`);
    displayError(error.message);
  }
}

async function getAQI(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error fetching AQI data: ${response.statusText} (${errorText})`
      );
    }
    const data = await response.json();
    const aqi = data.list[0].main.aqi;
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    const level = levels[aqi - 1] || "Unknown";
    return { aqi, level };
  } catch (error) {
    console.error(`Error fetching AQI: ${error.message}`);
    return { aqi: "N/A", level: "Unknown" };
  }
}

document.getElementById("searchButton").addEventListener("click", () => {
  const city = inputElement.value;
  getWeather(city);
});

document.getElementById("unitSwitch").addEventListener("change", () => {
  isMetric = !isMetric;
  if (inputElement.value) getWeather(inputElement.value);
});

document.addEventListener("DOMContentLoaded", () => {
  const randomCities = [
    "New York",
    "Tokyo",
    "London",
    "Paris",
    "Sydney",
    "Tel Aviv",
    "Jerusalem",
  ];
  const randomCity =
    randomCities[Math.floor(Math.random() * randomCities.length)];
  getWeather(randomCity);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weatherData = await fetchWeatherData("weather", {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            units: "metric",
          });
          displayWeather(weatherData);
          getForecast(weatherData.name);
          getHourlyWeather(weatherData.name);
        } catch (error) {
          console.error(
            `Error fetching weather data based on geolocation: ${error.message}`
          );
          displayError(error.message);
        }
      },
      (error) => {
        console.error(`Geolocation error: ${error.message}`);
        displayError("Unable to retrieve your location.");
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    displayError("Geolocation is not supported by this browser.");
  }
});
