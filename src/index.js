import { getDay, parseISO } from "date-fns";



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

const errorCallback = (error) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallBack, errorCallback);

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
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${location}&appid=f73501bec87ccad60630d02e191c918e`);
    const data = await response.json();
    return data;
}

function isValidUSZip(sZip) {
    return /^\d{5}(-\d{4})?$/.test(sZip);
 }

const locationInput = document.querySelector("#zipcode");
const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
    getWeather(locationInput.value).then((data) => {
        renderWeather(data);
    });
    getForcast(locationInput.value).then((data) => {
        renderForcast(data);
    })
});

const location = document.querySelector("#location");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");
const feelsLike = document.querySelector("#feelslike");

// Helper Function

function toFahrenheit(temp) {
    return Math.round((1.8 * (temp - 273) + 32)) + "°";
}

// Helper Function
function toTitleCase(string) {
    string = string.toLowerCase();
    string = string.split(" ");
    
    for (let i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }

    return string.join(" ");
}

function renderWeather(data) {
    // name, main.temp
    location.textContent = data.name;
    temp.textContent = toFahrenheit(data.main.temp);
    conditions.textContent = toTitleCase(data.weather[0].description);
    if (data.weather[0].main == "Rain" || data.weather[0].main == "Drizzle") {
        document.body.style.backgroundImage = "url(../src/rainy.jpg";
    }
    else if (data.weather[0].main == "Clear") {
        document.body.style.backgroundImage = "url(../src/clear.jpg";
    }
    else {
        document.body.style.backgroundImage = "url(../src/cloudy.jpg";
    }
    feelsLike.textContent = "Feels like" + " " + toFahrenheit(data.main.feels_like);
}

function getIconInfo(weatherCondition) {
    if (weatherCondition == "Clear") {
        return {src: "../src/clear.png", alt: "Clear weather icon",};
    }
    else if (weatherCondition == "Clouds") {
        return {src: "../src/cloud.png", alt: "Cloudy weather icon",};
    }
    else if (weatherCondition == "Rain") {
        return {src: "../src/rainy.png", alt: "Rainy weather icon",};
    }
    else if (weatherCondition == "Thunderstorm") {
        return {src: "../src/storm.png", alt: "Stormy weather icon",};
    }
    else if (weatherCondition == "Snow") {
        return {src: "../src/snow.png", alt: "Snowy weather icon",};
    }
}

function renderForcast(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day_el = document.querySelectorAll(".day");
    const temp_el = document.querySelectorAll(".forcast-temp");
    const icon = document.querySelectorAll(".weather-icon");
    console.log(data);
    for (let i = 0, k = 6; i < day_el.length; i++) {
        day_el[i].textContent = daysOfWeek[getDay(parseISO(data.list[k].dt_txt))];
        temp_el[i].textContent = toFahrenheit(data.list[k].main.temp);
        icon[i].src = getIconInfo(data.list[k].weather[0].main).src;
        icon[i].alt = getIconInfo(data.list[k].weather[0].main).alt;
        k = k + 8;
    }
}

getForcast().then((data) => {
    renderForcast(data);
})