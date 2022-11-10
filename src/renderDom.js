import { getDay, parseISO } from "date-fns";
import {getIconInfo, toFahrenheit, toTitleCase} from "./helpers";

const location = document.querySelector("#location");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");
const feelsLike = document.querySelector("#feelslike");

function renderWeather(data) {
    // name, main.temp
    location.textContent = data.name;
    temp.textContent = toFahrenheit(data.main.temp);
    conditions.textContent = toTitleCase(data.weather[0].description);
    if (data.weather[0].main == "Rain" || data.weather[0].main == "Drizzle") {
        document.body.style.backgroundImage = "url(../src/backgrounds/rainy.jpg";
    }
    else if (data.weather[0].main == "Clear") {
        document.body.style.backgroundImage = "url(../src/backgrounds/clear.jpg";
    }
    else {
        document.body.style.backgroundImage = "url(../src/backgrounds/cloudy.jpg";
    }
    feelsLike.textContent = "Feels like" + " " + toFahrenheit(data.main.feels_like);
}

function renderForcast(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day_container = document.querySelectorAll(".day-data");
    const day_el = document.querySelectorAll(".day");
    const temp_el = document.querySelectorAll(".forcast-temp");
    const icon = document.querySelectorAll(".weather-icon");
    for (let i = 0, k = 6; i < day_el.length; i++) {
        day_container[i].style.display = "flex";
        day_el[i].textContent = daysOfWeek[getDay(parseISO(data.list[k].dt_txt))];
        temp_el[i].textContent = toFahrenheit(data.list[k].main.temp);
        icon[i].src = getIconInfo(data.list[k].weather[0].main).src;
        icon[i].alt = getIconInfo(data.list[k].weather[0].main).alt;
        k = k + 8;
    }
}

export {renderForcast, renderWeather};