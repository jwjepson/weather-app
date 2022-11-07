

async function getWeather(zip) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=f73501bec87ccad60630d02e191c918e`);
    const data = await response.json();
    return data;
}

const zipcode = document.querySelector("#zipcode");
const searchButton = document.querySelector("#search");
const city = document.querySelector(".city");

searchButton.addEventListener("click", () => {
    getWeather(zipcode.value).then((data) => {
        renderWeather(data);
    });
});

function renderWeather(data) {
    // name, main.temp
    console.log(data);
}