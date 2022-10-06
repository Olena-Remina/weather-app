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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">
              <img src="images/sunny.gif" />
            </div>
            <div class="forecast-temperature">
              <span class="forecast-temperature-max"> 18° </span>
              <span class="forecast-temperature-min"> 12° </span>
            </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

          
      

function displayTemperature(response) {
  let city = document.querySelector("h2");
  let currentTemperature = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let feelsLikeTemperature = document.querySelector("#real-feel-temperature");
  let humidity = document.querySelector("#humidity"); 
  let wind = document.querySelector("#wind");
  let currentDate=document.querySelector("#current-date");
  let currentIcon = document.querySelector("#icon");
  
  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  feelsLikeTemperature.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
  currentDate.innerHTML=formatDate(response.data.dt*1000);
  currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
  realFeelCelsiusTemperature = response.data.main.feels_like;
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

function displayRealFeelFahrenheitTemperature(event) {
  event.preventDefault();
  let realFeelTemperatureElement = document.querySelector("#real-feel-temperature");
  realFeelCelsiusLink.classList.remove("active");
  realFeelFahrenheitLink.classList.add("active");
  let realFeelfahrenheitTemperature = (realFeelCelsiusTemperature * 9) / 5 + 32;
  realFeelTemperatureElement.innerHTML = Math.round(realFeelfahrenheitTemperature);
}

function displayRealFeelCelsiusTemperature(event) {
  event.preventDefault();
  realFeelCelsiusLink.classList.add("active");
  realFeelFahrenheitLink.classList.remove("active");
  let realFeelTemperatureElement = document.querySelector("#real-feel-temperature");
  realFeelTemperatureElement.innerHTML = Math.round(realFeelCelsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;
let realFeelCelsiusTemperature=null; 

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let realFeelFahrenheitLink = document.querySelector("#real-feel-fahrenheit-link");
realFeelFahrenheitLink.addEventListener("click", displayRealFeelFahrenheitTemperature);

let realFeelCelsiusLink = document.querySelector("#real-feel-celsius-link");
realFeelCelsiusLink.addEventListener("click", displayRealFeelCelsiusTemperature);

let button = document.querySelector("#currentCity");
button.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#city");
form.addEventListener("submit", handleSubmit);

search("Kyiv");
displayForecast();