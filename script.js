const container = document.querySelector('.container');
const input = document.getElementById('cityInput');
const button = document.querySelector('.search-box button');
const API_KEY = 'f96599608585ade8fd8a2bf551088299';
const img = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const notfound = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
button.addEventListener('click', () => {
  if (input.value.trim() !== "") {
    container.classList.add('expanded');
  }
});
input.addEventListener('input', () => {
    if (input.value.trim() == "") {
    container.classList.remove('expanded');
    }
});
button.addEventListener('click', () => {
    const city = input.value.trim();
    fetchWeatherData(city);
});
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                console.log("Pretty JSON:", JSON.stringify(data, null, 2));
                notfound.style.display = "none";
                weatherBox.style.display = "block";
                if (data.weather[0].main === "Clear") {
                    img.src = "clear.png";
                } else if (data.weather[0].main === "Clouds") {
                    img.src = "cloud.png";
                }
                else if (data.weather[0].main === "Rain") {
                    img.src = "rain.png";
                }
                else if (data.weather[0].main === "Mist") {
                    img.src = "mist.png";
                }
                else if (data.weather[0].main === "Snow") {
                    img.src = "snow.png";
                }
                temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
                description.innerHTML = `${capitalizeWords(data.weather[0].description)}`;
                humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> <p>Humidity:</p><p>${data.main.humidity}%</p>`;
                wind.innerHTML = `<i class="fa-solid fa-wind"></i> <p>Wind Speed:</p><p>${data.wind.speed} KM/h</p>`;
            } else {
                weatherBox.style.display = "none";
                notfound.style.display = "block";
                input.value = "";
                img.src = "";
                temperature.innerHTML = "";
                description.innerHTML = "";
                humidity.innerHTML = "";
                wind.innerHTML = "";
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again later.");
            container.classList.remove('expanded');
            input.value = "";
            temperature.innerHTML = "";
            description.innerHTML = "";
            humidity.innerHTML = "";
            wind.innerHTML = "";
        });
}




