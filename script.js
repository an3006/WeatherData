// app.js

const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,precipitation,windspeed_10m';

async function getWeatherData() {
    try {
        const response = await fetch(`${apiUrl}`);
        const data = await response.json();
        
        // Get all elements from each data array
        const allTimes = data.hourly.time;
        const allTemperatures = data.hourly.temperature_2m;
        const allHumidity = data.hourly.relativehumidity_2m;
        const allPrecipitationProbability = data.hourly.precipitation_probability;
        const allPrecipitation = data.hourly.precipitation;
        const allWindSpeed = data.hourly.windspeed_10m;

        // Get the weather data table body element
        const weatherTableBody = document.getElementById('weather-data');

        // Clear previous data
        weatherTableBody.innerHTML = '';

        // Add rows to the table
        for (let i = 0; i < allTimes.length; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${allTimes[i]}</td>
                <td>${allTemperatures[i]} °C</td>
                <td>${allHumidity[i]} %</td>
                <td>${allPrecipitationProbability[i]} %</td>
                <td>${allPrecipitation[i]} mm</td>
                <td>${allWindSpeed[i]} m/s</td>
            `;
            weatherTableBody.appendChild(row);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fetch weather data on page load
getWeatherData();

// Fetch weather data every 6 seconds
setInterval(getWeatherData, 6000); 
