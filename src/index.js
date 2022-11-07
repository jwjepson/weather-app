

async function getWeather(zip) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=f73501bec87ccad60630d02e191c918e`);
    const data = await response.json();
    return data;
}

const zipcode = document.querySelector("#zipcode");
const searchButton = document.querySelector("#search");

searchButton.addEventListener("click", () => {
    getWeather(zipcode.value).then((data) => {
        renderWeather(data);
    });
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