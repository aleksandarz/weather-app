import axios from "axios";

const apiKey = "5ec0d2983e1b4ab985d125845251901";
const btnLocation = document.querySelector("#btnLocation");

export async function updateLocation()
{
    let location = localStorage.getItem("location") || "";

    while (!location.trim())
    {
        location = prompt("Enter your location")?.trim();
    }

    localStorage.setItem("location", location);
    return location;
}

let forecastContainer = document.querySelector("#forecastContainer");

async function getWeather(location)
{
    try
    {
        let response = await axios.get("https://api.weatherapi.com/v1/forecast.json", {
            params: {
                key: apiKey,
                q: location,
                aqi: "no",
                days: 3
            }
        });

        console.log(response.data);
        document.body.style.backgroundColor = response.data.current.is_day ? "white" : "gray";

        for (let day of response.data.forecast.forecastday)
        {
            let forecastDiv = document.createElement("div");
            forecastDiv.classList.add("forecast");

            let forecastDate = document.createElement("p");
            forecastDate.textContent = "Date: " + day.date;

            let forecastAvgTemp = document.createElement("p");
            forecastAvgTemp.textContent = "Average temperature: " + day.day.avgtemp_c + "°C";

            let forecastMaxtemp = document.createElement("p");
            forecastMaxtemp.textContent = "Max temperature: " + day.day.maxtemp_c + "°C";

            let forecastMinTemp = document.createElement("p");
            forecastMinTemp.textContent = "Min temperature: " + day.day.mintemp_c + "°C";

            let forecastCondition = document.createElement("p");
            forecastCondition.textContent = "Description: " + day.day.condition.text;

            forecastDiv.append(forecastDate, forecastAvgTemp, forecastMaxtemp, forecastMinTemp, forecastCondition);
            forecastContainer.append(forecastDiv);
        }
    }
    catch (error)
    {
        console.error("Error fetching weather data:", error);
    }
}


async function init()
{
    let location = await updateLocation();
    await getWeather(location);
}

btnLocation.addEventListener("click", async () => {
    let newLocation = prompt("Enter your location")?.trim();
    if (newLocation)
    {
        localStorage.setItem("location", newLocation);
        await getWeather(newLocation);
    }
});

await init();


