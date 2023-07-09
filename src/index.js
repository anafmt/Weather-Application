let now = new Date();

let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thurday`,
  `Friday`,
  `Saturday`,
];

let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month} ${hour}:${minutes}`;

function search(city) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-input");
  searchCity(newCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

// Week 5

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let headingCity = document.querySelector("#chosen-city");
  headingCity.innerHTML = response.data.name;
  document.querySelector("#description-weather").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity-weather").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-weather").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function newLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
    let headingCity = document.querySelector("#chosen-city");
    headingCity.innerHTML = response.data.name;
    let description = document.querySelector("#description-weather");
    description.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity-weather");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind-weather");
    wind.innerHTML = Math.round(response.data.wind.speed);
  }

  axios.get(apiUrl).then(showTemperature);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(newLocation);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentPosition);

search("Dakar");
