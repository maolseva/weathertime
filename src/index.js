function refreshWeather(response) {
  const temperatureElement = document.querySelector("#temperature");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const timeElement = document.querySelector("#time");
  const iconElement = document.querySelector("#icon");

  const date = new Date(response.data.time * 1000);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  cityElement.innerHTML = response.data.city || "Unknown City";
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description || "No description";
  humidityElement.innerHTML = `${response.data.temperature.humidity || 0}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed || 0} km/h`;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current || 0);
}

function formatDate(date) {
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  const apiKey = "20ac4e1fof3t6e4bfd071a3613757bcc";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl)
    .then(refreshWeather)
    .catch(error => {
      alert("Could not retrieve weather data. Please try again.");
      console.error("API Error:", error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {


let days= ["Tue","Wed", "Thu", "Fri", "Sat"];
let forecastHtml = "";


days.forEach(function (day) {
forecastHtml = 
forecastHtml +
` <div class="weather-forecast-day">
  <div class="weather-forecast-date"> ${day} </div>
  <div class="weather-forecast-icon"> ⛅ </div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature"><strong>15°</strong> </div>
    <div class="weather-forecast-temperature">9°</div>
  </div>
</div>
`;
});

let forecastElement = document.querySelector ("#forecast");
forecastElement.innerHTML = forecastHtml ;

}


const form = document.querySelector("#search-form");
if (form) {
  form.addEventListener("submit", handleSearchSubmit);
}

const defaultCity = "Perth";
searchCity(defaultCity);
displayForecast();