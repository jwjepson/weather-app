import { renderForcast, renderWeather } from "./renderDom";
import { errorHandler, isValidUSZip } from "./helpers";
import "./styles.css";


async function successCallBack(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f73501bec87ccad60630d02e191c918e`)
    const weatherData = await weather.json();
    renderWeather(weatherData);
    let forcast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f73501bec87ccad60630d02e191c918e`)
    const forcastData = await forcast.json();
    renderForcast(forcastData);
};

navigator.geolocation.getCurrentPosition(successCallBack, errorHandler);

async function getWeather(location) {
    if (isValidUSZip(location)) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=f73501bec87ccad60630d02e191c918e`);
        const data = await response.json();
        return data;
    }
    else {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f73501bec87ccad60630d02e191c918e`);
        const data = await response.json();
        return data;
    }
}

async function getForcast(location) {
    if (isValidUSZip(location)) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${location}&appid=f73501bec87ccad60630d02e191c918e`);
        const data = await response.json();
        return data;
    }
    else {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f73501bec87ccad60630d02e191c918e`);
        const data = await response.json();
        return data;
    }
}

const locationInput = document.querySelector("#location-input");
const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
    const error_el = document.querySelectorAll(".error");
    error_el.forEach((error) => {
        error.style.display = "none";
    })
    getWeather(locationInput.value).then((data) => {
        renderWeather(data);
    }).catch(() => {
        errorHandler();
    })
    
    getForcast(locationInput.value).then((data) => {
        renderForcast(data);
    }).catch(() => {
        errorHandler();
    })
});