function formatDate(timestamp) {
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
  let currentDay = days[date.getDay()];
  return `${currentDay}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "c65e5bd2032ca8ff197ae617ffad0a4b";
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCity).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
