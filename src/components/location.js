export async function updateLocation()
{
    let location = localStorage.getItem("location") || "";
    let weather_input = document.querySelector("#weather-input").value.trim();

    while (!location.trim())
    {
        location = weather_input;
    }

    localStorage.setItem("location", location);
    return location;
}