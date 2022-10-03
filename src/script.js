function formatDate(timestamp) {
let date=new Date(timestamp);
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Last updated: ${day} ${hours}:${minutes}`;
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

function displayTemperature(response) {
  let city = document.querySelector("h2");
  let currentTemperature = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let feelsLikeTemperature = document.querySelector("#real-feel-temperature");
  let currentHumidity = document.querySelector("#humidity"); 
  let currentWind = document.querySelector("#wind");
  let currentDate=document.querySelector("#current-date");
  
  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);;
  description.innerHTML = response.data.weather[0].description;
  feelsLikeTemperature.innerHTML = Math.round(response.data.main.feels_like);
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  currentDate.innerHTML=formatDate(response.data.dt*1000);
}

function search(city) {
  let apiKey = "492ebb4183bc0de11aa650bd4178c621";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function retrievePosition(position) {
  let apiKey = "492ebb4183bc0de11aa650bd4178c621";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentCity");
button.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);

search("Kyiv");
