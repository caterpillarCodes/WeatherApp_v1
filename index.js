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
  document.querySelector(".current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("p.current-situation-text").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".current-date").innerHTML = formatedDate(
    response.data.dt * 1000
  );
}
function search(city) {
  let apiKey = `3dce9b1c66837262a25b3f448d354a76`;
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = "metric";
  let apiUrl = `${endPoint}q=${city}&limit=5&appid=${apiKey}&units=${units}`;
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
let form = document.querySelector("form");
form.addEventListener("submit", changeCity);
let searchButton = document.querySelector("#button-addon2");
searchButton.addEventListener("click", changeCity);
search("berlin");

// °C to °F

let temperatureElement = document.querySelector("#temperature");
let currentUnit = document.querySelector("#temperature-unit");
let changeUnit = document.querySelector("#unit-sub");
changeUnit.addEventListener("click", function (event) {
  event.preventDefault();
  let flag = event.target.innerText;
  if (flag === "°F") {
    temperatureElement.innerHTML = 62;
    currentUnit.innerHTML = "F";
    changeUnit.innerHTML = "°C";
  } else {
    temperatureElement.innerHTML = 17;
    currentUnit.innerHTML = "C";
    changeUnit.innerHTML = "°F";
  }
});
