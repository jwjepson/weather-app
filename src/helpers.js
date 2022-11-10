import ClearIcon from "./icons/clear.png";
import CloudyIcon from "./icons/cloud.png";
import RainyIcon from "./icons/rainy.png";
import SnowyIcon from "./icons/snow.png";
import StormyIcon from "./icons/storm.png";


const location = document.querySelector("#location");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");
const feelsLike = document.querySelector("#feelslike");

function toTitleCase(string) {
    string = string.toLowerCase();
    string = string.split(" ");
    
    for (let i = 0; i < string.length; i++) {
        string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
    }

    return string.join(" ");
}

function clearData() {
    const day_container = document.querySelectorAll(".day-data");
    day_container.forEach((day) => {
        day.style.display = "none";
    })
    location.textContent = "";
    temp.textContent = "";
    conditions.textContent = "";
    feelsLike.textContent = "";
}

function errorHandler() {
    clearData();
    const error_el = document.querySelectorAll(".error");
    error_el.forEach((error) => {
        error.style.display = "flex";
        error.textContent = "No location data available";
    })
}

function toFahrenheit(temp) {
    return Math.round((1.8 * (temp - 273) + 32)) + "°";
}

function isValidUSZip(sZip) {
    return /^\d{5}(-\d{4})?$/.test(sZip);
}

function getIconInfo(weatherCondition) {
    if (weatherCondition == "Clear") {
        return {src: `${ClearIcon}`, alt: "Clear weather icon",};
    }
    else if (weatherCondition == "Clouds") {
        return {src: `${CloudyIcon}`, alt: "Cloudy weather icon",};
    }
    else if (weatherCondition == "Rain") {
        return {src: `${RainyIcon}`, alt: "Rainy weather icon",};
    }
    else if (weatherCondition == "Thunderstorm") {
        return {src: `${StormyIcon}`, alt: "Stormy weather icon",};
    }
    else if (weatherCondition == "Snow") {
        return {src: `${SnowyIcon}`, alt: "Snowy weather icon",};
    }
}

export {getIconInfo, isValidUSZip, toFahrenheit, errorHandler, clearData, toTitleCase};