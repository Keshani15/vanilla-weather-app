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
