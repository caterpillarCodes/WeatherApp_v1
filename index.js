//next 5days forecast
function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  forecast.forEach(function (day, index) {
    if ((index < 6) & (index > 0)) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 next-day-forecast" width:20%;>
            <h5>${forecastDay(day.dt)}</h5>
            <img class="next-day-icon" src='https://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png' >
            <p class="next-day-situation">${day.weather[0].description}</p>
            <span class="next-day-temprature-max">${Math.round(
              day.temp.max
            )}°</span>
            <span class="next-day-temprature-min">${Math.round(
              day.temp.min
            )}°</span>
        </div>`;

      forecastElement.innerHTML = forecastHTML;
    }
  });
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `743bee57fddbfaf52447193a87d5dd25`;
  let oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(oneCallApiUrl);
  axios.get(oneCallApiUrl).then(displayForecast);
}
//date and time
function formatedDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${days[date.getDay()]} ${hour}:${minute} | ${
    months[date.getMonth()]
  } ${date.getDate()}`;
}

//change city & show temprature

function displayWeatherCondition(response) {
  celsiusTemprature = response.data.main.temp;
  document.querySelector(".current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemprature);
  document.querySelector("p.current-situation-text").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".current-date").innerHTML = formatedDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function search(city) {
  let apiUrl = `${endPoint}q=${city}&limit=5&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function searchLocation(latitude, longitude) {
  let apiUrl = `${endPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input").value;
  if (input.trim() !== "") {
    search(input);
  } else {
    alert("Enter a city name...");
  }
}
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  searchLocation(latitude, longitude);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let celsiusTemprature = null;
let apiKey = `743bee57fddbfaf52447193a87d5dd25`;
let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
let units = "metric";
let form = document.querySelector("form");
let searchButton = document.querySelector("#button-addon2");
let currentLocationBtn = document.querySelector("#current-location-button");
form.addEventListener("submit", changeCity);
searchButton.addEventListener("click", changeCity);
currentLocationBtn.addEventListener("click", getCurrentLocation);
search("berlin");
