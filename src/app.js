function timeformat(time) {
  if (time < 10) {
    return "0" + time;
  } else return time;
}
function displaytime(time) {
  let date = new Date(time);
  let hour = date.getHours();
  let mins = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `Last updated at ${days[date.getDay()]} ${timeformat(
    hour
  )}:${timeformat(mins)}`;
}

function formatday(time) {
  let date = new Date(time * 1000);

  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}
function displayWeatherForecast(response) {
  let array = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row  d-flex justify-content-center">`;
  array.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `   
    <div class="col-sm-2">
      <div class="weather-forecast-date">${formatday(forecastDay.dt)}</div>
      
        <img
         src="https://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
          alt="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].description
          }@2x.png"
          
        />
        <br />
      
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-min">°${Math.round(
          forecastDay.temp.min
        )}</span>
        <span class="weather-forecast-temp-max">°${Math.round(
          forecastDay.temp.max
        )}</span>
      </div>
    </div>
  `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}
function handleApiResponse(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celciustemp = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(
    3.6 * response.data.wind.speed
  )} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#time").innerHTML = displaytime(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(
    (celciustemp * 9) / 5 + 32
  );
  document.querySelector("#celcius").classList.remove("active");
  document.querySelector("#fahrenheit").classList.add("active");
}
function convertToCelcius(event) {
  event.preventDefault();
  document.querySelector("#temp").innerHTML = Math.round(celciustemp);
  document.querySelector("#celcius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleApiResponse);
}
function handleSubmitButton(event) {
  event.preventDefault();

  let cityname = document.querySelector("#search-input").value;

  search(cityname);

  document.getElementById("search-input").value = "";
  document.querySelector("#celcius").classList.add("active");
  document.querySelector("#fahrenheit").classList.remove("active");
}

let celciustemp = null;
search("babol");

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celciuslink = document.querySelector("#celcius");
celciuslink.addEventListener("click", convertToCelcius);

let submitForm = document.querySelector("#submit-form");
submitForm.addEventListener("submit", handleSubmitButton);
