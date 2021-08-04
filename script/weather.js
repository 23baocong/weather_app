const WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";
const APP_ID = "6e60779dd3f882836bc3763fc2865120";

let cityDOM = document.getElementById("city");

fetchWeather(cityDOM.value);

function fetchWeather(city) {
    fetch(`${WEATHER_URL}?q=${city}&appid=${APP_ID}`)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function(json) {
            handleDataWeather(json);
        })
        .catch(function(err) {
            console.log(err);
        })
}

function handleDataWeather(data) {
    const infoCityDOM = document.getElementById("info")
    const imgDOM = document.getElementById("icon")
    imgDOM.src = getCityImageWeather(data.weather[0].icon)
    infoCityDOM.innerHTML = `<p class="date">${getCityDate()}</p>
    <p class="temp">${getCityTemperature(data.main.temp)}</p>
    <p class="description">${data.weather[0].main}</p>
    <div>
        <div class="wind">
            <img src="/images/icon_windy.png">
            <p>Wind</p>
            <p>|</p>
            <p>${data.wind.speed} km/h</p>
        </div>
        <div class="hum">
            <img src="/images/icon_hum.png">
            <p>Hum</p>
            <p>|</p>
            <p>${data.main.humidity} %</p>
        </div>
    </div>`
}

function getCityTemperature(tempK) {
    return parseFloat(tempK - 273).toFixed(1);
}

function getCityDate() {
    var options = { day: 'numeric', month: 'long' };
    var today = new Date();
    return today.toLocaleDateString("en-US", options);
}


function getSelectCity(selectedCity) {
    fetchWeather(selectedCity.value);
}

function getCityImageWeather(icon) {
    return `http://openweathermap.org/img/w/${icon}.png`
}