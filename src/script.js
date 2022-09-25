function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function search(city) {
  let apiKey = "492ebb4183bc0de11aa650bd4178c621";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature.celsius");
  if (temperatureElement) {
    temperatureElement.classList.remove("celsius");
    temperatureElement.classList.add("fahrenheit");
    let temperatureValue = Number(temperatureElement.innerHTML);
    temperatureElement.innerHTML = Math.round((temperatureValue * 9) / 5 + 32);
  }
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature.fahrenheit");
  if (temperatureElement) {
    temperatureElement.classList.remove("fahrenheit");
    temperatureElement.classList.add("celsius");
    let temperatureValue = Number(temperatureElement.innerHTML);
    temperatureElement.innerHTML = Math.round(
      ((temperatureValue - 32) * 5) / 9
    );
  }
}

function convertToRealFahrenheit(event) {
  event.preventDefault();
  let realFeelTemperatureElement = document.querySelector(
    "#real-feel-temperature.celsius"
  );
  if (realFeelTemperatureElement) {
    realFeelTemperatureElement.classList.remove("celsius");
    realFeelTemperatureElement.classList.add("fahrenheit");
    let realFeelTemperatureValue = Number(realFeelTemperatureElement.innerHTML);
    realFeelTemperatureElement.innerHTML = Math.round(
      (realFeelTemperatureValue * 9) / 5 + 32
    );
  }
}

function convertToRealCelsius(event) {
  event.preventDefault();
  let realFeelTemperatureElement = document.querySelector(
    "#real-feel-temperature.fahrenheit"
  );
  if (realFeelTemperatureElement) {
    realFeelTemperatureElement.classList.add("celsius");
    realFeelTemperatureElement.classList.remove("fahrenheit");
    let realFeelTemperatureValue = Number(realFeelTemperatureElement.innerHTML);
    realFeelTemperatureElement.innerHTML = Math.round(
      ((realFeelTemperatureValue - 32) * 5) / 9
    );
  }
}

// Feature #1
let currentDate = document.querySelector("#current-date");
let now = new Date();
currentDate.innerHTML = formatDate(now);

// Feature #2
let form = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);

// Feature #3
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let realFeelFahrenheitLink = document.querySelector(
  "#real-feel-fahrenheit-link"
);
realFeelFahrenheitLink.addEventListener("click", convertToRealFahrenheit);

let realFeelCelsiusLink = document.querySelector("#real-feel-celsius-link");
realFeelCelsiusLink.addEventListener("click", convertToRealCelsius);

// Feature #4
function showForecast(response) {
  let cityElement = response.data.name;
  let currentDescription = response.data.weather[0].description;
  let currentTemperatureElement = Math.round(response.data.main.temp);
  let currentFeelTemperatureElement = Math.round(response.data.main.feels_like);
  let humidityElement = response.data.main.humidity;
  let windElement = Math.round(response.data.wind.speed * 3.6);
  let city = document.querySelector("h2");
  city.innerHTML = cityElement;
  let description = document.querySelector("#description");
  description.innerHTML = currentDescription;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = currentTemperatureElement;
  let feelsLikeTemperature = document.querySelector("#real-feel-temperature");
  feelsLikeTemperature.innerHTML = currentFeelTemperatureElement;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidityElement;
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = windElement;
}

// Feature #5

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentCity");
button.addEventListener("click", getCurrentPosition);

// Feature #6

search("Kyiv");
