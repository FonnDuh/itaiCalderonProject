const API_KEY = "25c97fa0700864ea4f57de31c8195c12",
  URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=`,
  query = document.getElementById("cityInput");
// const weatherInfo = document.getElementById("weatherInfo");
// const temperature = document.getElementById("temperature");
// const description = document.getElementById("description");
// const details = document.getElementById("details");
// const weatherIcon = document.getElementById("weatherIcon");
// const hourlyContainer = document.querySelector("#hourly .d-flex");
let isMetric = true;

function getWeather(city) {
  fetch(`${URL}${city}&units=${isMetric ? "metric" : "imperial"}`)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
      getForecast(city);
      getHourlyWeather(city);
    })
    .catch((error) => alert(error.message));
}

async function displayWeather(data) {
  const { aqi, level } = await getAQI(data.coord.lat, data.coord.lon);

  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weatherIcon").alt = data.weather[0].description;

  city.textContent = data.name;

  document.getElementById("temperature").textContent = `Temperature: ${
    data.main.temp
  }°${isMetric ? "C" : "F"}`;
  feelsLike.textContent = `Feels Like: ${data.main.feels_like}°${
    isMetric ? "C" : "F"
  }`;

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

function getForecast(city) {
  const forecastContainer = document.getElementById("forecast");

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=${
      isMetric ? "metric" : "imperial"
    }&appid=${API_KEY}&q=${city}`
  )
    .then((response) => response.json())
    .then((data) => {
      forecastContainer.innerHTML = "";
      const forecastList = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      forecastList.forEach((item) => {
        forecastContainer.innerHTML += `
          <div class="col-md-4">
            <div class="card text-center p-3 mb-3">
              <h5>${new Date(item.dt_txt).toLocaleDateString("en-GB")}</h5>
              <img src="https://openweathermap.org/img/wn/${
                item.weather[0].icon
              }@2x.png" alt="${item.weather[0].description}">
              <p>${item.weather[0].description}</p>
              <p><strong>${item.main.temp}°${isMetric ? "C" : "F"}</strong></p>
            </div>
          </div>`;
      });
    });
}

function getHourlyWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=${
      isMetric ? "metric" : "imperial"
    }&appid=${API_KEY}&q=${city}`
  )
    .then((response) => response.json())
    .then((data) => {
      const hourlyContainer = document.getElementById("hourly");
      hourlyContainer.innerHTML = "";

      const hourlyList = data.list.slice(0, 9);
      hourlyList.forEach((item) => {
        const time = new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        hourlyContainer.innerHTML += `
          <div class="text-center me-3">
            <p class="fs-6">${time}</p>
            <img src="https://openweathermap.org/img/wn/${
              item.weather[0].icon
            }@2x.png" alt="${
          item.weather[0].description
        }" style="max-width: 50px;" />
            <p class="fs-6">${item.main.temp}°${isMetric ? "C" : "F"}</p>
            <p class="fs-6">${item.weather[0].description}</p>
          </div>`;
      });
    })
    .catch((error) => {
      console.error("Error fetching hourly weather data:", error);
    });
}

async function getAQI(lat, lon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const aqi = data.list[0].main.aqi,
        levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"],
        level = levels[aqi - 1];
      return { aqi, level };
    })
    .catch((error) => {
      console.error("Error fetching AQI:", error);
      return { aqi: "N/A", level: "Unknown" };
    });
}

document
  .getElementById("searchButton")
  .addEventListener("click", () => getWeather(query.value));

document.getElementById("unitSwitch").addEventListener("change", () => {
  isMetric = !isMetric;
  if (query.value) getWeather(query.value);
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
  // Determining which random city to show at DOM load
  getWeather(randomCities[Math.floor(Math.random() * randomCities.length)]);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetch(
          `${URL}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
        )
          .then((response) => {
            if (!response.ok) throw new Error("Unable to fetch weather data");
            return response.json();
          })
          .then((data) => {
            displayWeather(data);
            getForecast(data.name);
            getHourlyWeather(data.name);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});
