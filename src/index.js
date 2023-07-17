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
  let apiKey = "da34a047131b20d5faab7d8tfo459827";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  console.log(apiUrl);

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
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let headingCity = document.querySelector("#chosen-city");
  headingCity.innerHTML = response.data.city;
  document.querySelector("#description-weather").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity-weather").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-weather").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchCity(city) {
  let apiKey = "da34a047131b20d5faab7d8tfo459827";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function newLocation(position) {
  let lat = position.data.coordinates.latitude;
  let lon = position.data.coordinates.longitude;
  let units = "metric";
  let apiKey = "da34a047131b20d5faab7d8tfo459827";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.temperature.current);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}`;
    let headingCity = document.querySelector("#chosen-city");
    headingCity.innerHTML = response.data.city;
    let description = document.querySelector("#description-weather");
    description.innerHTML = response.data.condition.description;
    let humidity = document.querySelector("#humidity-weather");
    humidity.innerHTML = response.data.temperature.humidity;
    let wind = document.querySelector("#wind-weather");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconElement.setAttribute("alt", response.data.condition.description);
  }

  axios.get(apiUrl).then(showTemperature);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(newLocation);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentPosition);

search("Dakar");
