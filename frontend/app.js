const searchBtn = document.querySelector('.search button');
const searchBox = document.querySelector('.search input');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(cityInput) {
    console.log("Fetching weather data for city:", cityInput)
    try {
        const response = await fetch(`https://mhhong.dev/weather-info/weather?city=${cityInput}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("weather data received:", data);

        const temp = document.querySelector('.temp');
        const city = document.querySelector('.city');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind');

        console.log("Updating DOM with weather data:", data);

        // Weather Conditions Statements 
        switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png";
        }

        city.innerHTML = data.name;
        temp.innerHTML = data.main.temp.toFixed(1) + "°c";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + "km/h";
    } catch (error) {
        console.error('An error has occurred:', error);
        alert("Failed to fetch the weather data. Please try again later.");
    }
}

searchBtn.addEventListener('click', () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        alert("Please enter a correct city name.");
    }
});
