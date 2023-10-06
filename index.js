//date and time
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  let weekdays = ["THU", "Fri", "SAT", "SUN", "MON"];
  weekdays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2 next-day-forecast" width:20%;>
            <h5>${day}</h5>
            <i class="fa-solid fa-cloud-showers-heavy next-day-icon"></i>
            <p class="next-day-situation">Showers</p>
            <span class="next-day-temprature-max">18°</span>
            <span class="next-day-temprature-min">17°</span>
        </div>`;

    forecastElement.innerHTML = forecastHTML;
  });
}

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
let apiKey = `3dce9b1c66837262a25b3f448d354a76`;
let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
let units = "metric";
let form = document.querySelector("form");
let searchButton = document.querySelector("#button-addon2");
let currentLocationBtn = document.querySelector("#current-location-button");
form.addEventListener("submit", changeCity);
searchButton.addEventListener("click", changeCity);
currentLocationBtn.addEventListener("click", getCurrentLocation);
search("berlin");

// °C to °F

let temperatureElement = document.querySelector("#temperature");
let currentUnit = document.querySelector("#temperature-unit");
let changeUnit = document.querySelector("#unit-sub");
changeUnit.addEventListener("click", function (event) {
  event.preventDefault();
  let flag = event.target.innerText;
  if (flag === "°F") {
    temperatureElement.innerHTML = Math.round((celsiusTemprature * 9) / 5 + 32);
    currentUnit.innerHTML = "F";
    changeUnit.innerHTML = "°C";
  } else {
    temperatureElement.innerHTML = Math.round(celsiusTemprature);
    currentUnit.innerHTML = "C";
    changeUnit.innerHTML = "°F";
  }
});
displayForecast();
