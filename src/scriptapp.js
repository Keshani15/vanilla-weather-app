function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let max = Math.round(forecastDay.temperature.maximum);
      let min = Math.round(forecastDay.temperature.minimum);
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-day">${formateDay(
            forecastDay.time
          )}</div>
          <img
            src="${forecastDay.condition.icon_url}"
            alt="${forecastDay.condition.icon}"
            width="36px"
            class="icon-weather-forecast"
          />
          <div class="weather-forecast-temp">
            <span class="forecast-max">${max}°</span>
            <span class="forecast-min">${min}°</span>
          </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = `a6bb6oe20805b9ecd0dta4d24747d30f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#day-and-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round((response.data.wind.speed * 3600) / 1000);
  descriptionElement.innerHTML = response.data.condition.description;
  dateElement.innerHTML = formateDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}

function search(city) {
  let apiKey = `a6bb6oe20805b9ecd0dta4d24747d30f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  degreeCelLink.classList.remove("active");
  degreesFahrLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

function displayCelTemp(event) {
  let temperatureElement = document.querySelector("#temperature");
  degreesFahrLink.classList.remove("active");
  degreeCelLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#seacrh-form");
form.addEventListener("submit", handleSearch);

let degreesFahrLink = document.querySelector("#fahr");
degreesFahrLink.addEventListener("click", displayFahrTemp);

let degreeCelLink = document.querySelector("#celsius");
degreeCelLink.addEventListener("click", displayCelTemp);

search("Johannesburg");

const weatherApp = document.querySelector("#weather-app");
const date = new Date();
const hour = date.getHours();

if (hour < 12) {
  weatherApp.style.backgroundColor = "rgb(2, 83, 185, 0.5";
} else if (hour < 18) {
  weatherApp.style.backgroundColor = "rgba(255, 200, 124, 0.5";
} else {
  weatherApp.style.backgroundColor = "rgba(17, 29, 94, 0.8";
}
