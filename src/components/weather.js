import axios from "axios";

let forecastContainer = document.querySelector("#forecastContainer");

function getForecastWeatherData(response)
{
    for (let day of response.data.forecast.forecastday)
    {
        let forecastDiv = document.createElement("a");
        forecastDiv.href = "info.html";
        forecastDiv.classList.add("forecast");

        let leftDiv = document.createElement("div");
        leftDiv.classList.add("left-div");

        let rightDiv = document.createElement("div");
        rightDiv.classList.add("right-div");

        let forecastDate = document.createElement("p");
        forecastDate.textContent = day.date;

        let forecastTemp = document.createElement("p");
        forecastTemp.textContent = day.day.avgtemp_c + "°C";
        forecastTemp.classList.add("forecast-temp");

        let forecastMaxTemp = document.createElement("p");
        forecastMaxTemp.textContent = "Max - " + day.day.maxtemp_c + "°C";

        let forecastMinTemp = document.createElement("p");
        forecastMinTemp.textContent = "Min - " + day.day.mintemp_c + "°C";

        let forecastCondition = document.createElement("p");
        forecastCondition.textContent = day.day.condition.text;

        leftDiv.append(forecastDate, forecastTemp);
        rightDiv.append(forecastMaxTemp, forecastMinTemp, forecastCondition);

        forecastDiv.append(leftDiv, rightDiv);
        forecastContainer.append(forecastDiv);
    }
}

function getCurrentWeatherData(response)
{
    let current = response.data.current;
    let currentWeatherInfo = document.querySelector("#current-weather-info");

    let temp = document.createElement("p");
    temp.textContent = "Local temperature: " + current.temp_c + "°C";

    currentWeatherInfo.append(temp);
}

export async function getWeatherForUpcomingDays(location)
{
    try
    {
        let response = await axios.get(process.env.API_URL + "/v1/forecast.json", {
            params: {
                key: process.env.API_KEY,
                q: location,
                aqi: "no",
                days: 3
            }
        });

        console.log(response.data);
        // document.body.style.backgroundColor = response.data.current.is_day ? "white" : "white";

        getForecastWeatherData(response);
    }
    catch (error)
    {
        console.error("Error fetching weather data:", error);
    }
}

export async function getGeoLocationForCoords(lat, lng) {
    try
    {
        let response = await axios.get(process.env.API_URL + "/v1/current.json", {
            params: {
                key: process.env.API_KEY,
                q: `${lat},${lng}`
            }
        });

        console.log(response.data);
        // document.body.style.backgroundColor = response.data.current.is_day ? "white" : "white";

        getCurrentWeatherData(response);
    }
    catch (error)
    {
        console.error("Error fetching weather data:", error);
    }
}

// Subscription plan for future weather
// export async function getFutureWeather(location)
// {
//     try
//     {
//         let response = await axios.get(process.env.API_URL + "/v1/future.json", {
//             params: {
//                 key: process.env.API_KEY,
//                 q: location,
//                 dt: getFormattedDate(30),
//             }
//         });
//
//         console.log(response.data);
//         document.body.style.backgroundColor = response.data.current.is_day ? "white" : "gray";
//
//         getForecastWeatherData(response);
//     }
//     catch (error)
//     {
//         console.error("Error fetching weather data:", error);
//     }
// }




