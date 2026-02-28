const apiKey = "61a4d32dfdbe3912b7e8b4f11eaf4e51";

async function getWeather() {
  try {
    const cityName = "Bangalore";

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    document.getElementById("city").innerText = response.data.name;
    document.getElementById("temp").innerText = response.data.main.temp + " °C";
    document.getElementById("desc").innerText = response.data.weather[0].description;
    document.getElementById("icon").src =
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;

  } catch (error) {
    console.log("Error fetching weather");
  }
}

getWeather();

async function getWeather() {
  try {
    const cityName = "Bangalore";

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    document.getElementById("city").innerText = response.data.name;
    document.getElementById("temp").innerText = response.data.main.temp + " °C";
    document.getElementById("desc").innerText = response.data.weather[0].description;
    document.getElementById("icon").src =
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;

  } catch (error) {
    console.log("Error fetching weather");
  }
}

getWeather();
