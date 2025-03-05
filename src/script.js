import { updateLocation } from "./components/location.js";
import { getWeatherForUpcomingDays } from "./components/weather.js";
import { getGeoLocationForCoords } from "./components/weather.js";

async function init()
{
    let location = await updateLocation();
    await getWeatherForUpcomingDays(location);
}

let forecastContainer = document.querySelector("#forecastContainer");
const btnLocation = document.querySelector("#btnLocation");
btnLocation.addEventListener("click", async () => {
    forecastContainer.innerHTML = "";
    let weather_input = document.querySelector("#weather-input").value.trim();
    if (weather_input !== "")
    {
        localStorage.setItem("location", weather_input);
        await getWeatherForUpcomingDays(weather_input);
    }
});

navigator.geolocation.getCurrentPosition(async (position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    await getGeoLocationForCoords(lat, lng);
});

await init();


