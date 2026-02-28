function WeatherApp() {
  this.apiKey = "61a4d32dfdbe3912b7e8b4f11eaf4e51";

  this.searchForm = document.getElementById("search-form");
  this.searchInput = document.getElementById("search-input");

  this.city = document.getElementById("city");
  this.temp = document.getElementById("temp");
  this.desc = document.getElementById("desc");
  this.icon = document.getElementById("icon");

  this.forecastContainer = document.getElementById("forecast-container");
}
WeatherApp.prototype.init = function () {
  this.searchForm.addEventListener(
    "submit",
    this.handleSearch.bind(this)
  );
};
WeatherApp.prototype.handleSearch = function (e) {
  e.preventDefault();
  const cityName = this.searchInput.value.trim();
  if (!cityName) return;

  this.getWeather(cityName);
};
WeatherApp.prototype.getWeather = async function (cityName) {
  try {
    const weatherURL =
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`;

    const forecastURL =
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.apiKey}&units=metric`;

    const [weatherRes, forecastRes] = await Promise.all([
      axios.get(weatherURL),
      axios.get(forecastURL),
    ]);

    const weatherData = weatherRes.data;
    const forecastData = forecastRes.data;

    this.displayWeather(weatherData);

    const dailyForecast = this.processForecastData(forecastData.list);
    this.displayForecast(dailyForecast);

  } catch (error) {
    console.log("Error fetching weather");
  }
};
WeatherApp.prototype.displayWeather = function (data) {
  this.city.innerText = data.name;
  this.temp.innerText = data.main.temp + " °C";
  this.desc.innerText = data.weather[0].description;
  this.icon.src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
};
WeatherApp.prototype.processForecastData = function (list) {
  return list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);
};
WeatherApp.prototype.displayForecast = function (forecast) {
  this.forecastContainer.innerHTML = "";

  forecast.forEach(day => {
    const date = new Date(day.dt_txt).toDateString();

    this.forecastContainer.innerHTML += `
      <div class="forecast-card">
        <h4>${date}</h4>
        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" />
        <p>${day.weather[0].description}</p>
        <strong>${day.main.temp} °C</strong>
      </div>
    `;
  });
};
const app = new WeatherApp();
app.init();
