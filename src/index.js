import { getDay, parseISO } from "date-fns";



async function successCallBack(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f73501bec87ccad60630d02e191c918e`)
    const data = await response.json();
    renderWeather(data);
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
    feelsLike.textContent = "Feels like" + " " + toFahrenheit(data.main.feels_like);
}

function renderForcast(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day_el = document.querySelectorAll(".day");
    const temp_el = document.querySelectorAll(".forcast-temp");

    for (let i = 0, k = 3; i < day_el.length; i++) {
        day_el[i].textContent = daysOfWeek[getDay(parseISO(data.list[k].dt_txt))];
        temp_el[i].textContent = toFahrenheit(data.list[k].main.temp);
        k = k + 8;
        console.log(day_el[i].textContent);
    }
}

getForcast().then((data) => {
    renderForcast(data);
})