const apiKey = "61a4d32dfdbe3912b7e8b4f11eaf4e51";

// =======================
// WEATHER APP CLASS
// =======================

function WeatherApp() {
  this.recentSearches = [];
  this.recentContainer = document.getElementById("recent-searches");
  this.clearBtn = document.getElementById("clear-history");

  this.loadRecentSearches();
  this.loadLastCity();

  this.clearBtn.addEventListener("click", () => {
    this.clearHistory();
  });
}

// =======================
// GET WEATHER FUNCTION
// =======================

WeatherApp.prototype.getWeather = async function (cityName) {
  try {

    // If city not passed, take from input box
    if (!cityName) {
      cityName = document.getElementById("searchBox").value;
    }

    if (!cityName) return;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    document.getElementById("city").innerText = response.data.name;
    document.getElementById("temp").innerText =
      response.data.main.temp + " °C";
    document.getElementById("desc").innerText =
      response.data.weather[0].description;
    document.getElementById("icon").src =
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;

    // ✅ SAVE SEARCH
    this.saveRecentSearch(response.data.name);

  } catch (error) {
    console.log("Error fetching weather");
  }
};

// =======================
// SAVE RECENT SEARCH
// =======================

WeatherApp.prototype.saveRecentSearch = function (city) {

  // Remove duplicate
  this.recentSearches = this.recentSearches.filter(c => c !== city);

  // Add to front
  this.recentSearches.unshift(city);

  // Keep only 5
  if (this.recentSearches.length > 5) {
    this.recentSearches.pop();
  }

  localStorage.setItem("recentSearches", JSON.stringify(this.recentSearches));
  localStorage.setItem("lastCity", city);

  this.displayRecentSearches();
};

// =======================
// LOAD RECENT SEARCHES
// =======================

WeatherApp.prototype.loadRecentSearches = function () {
  const stored = localStorage.getItem("recentSearches");

  if (stored) {
    this.recentSearches = JSON.parse(stored);
    this.displayRecentSearches();
  }
};

// =======================
// DISPLAY BUTTONS
// =======================

WeatherApp.prototype.displayRecentSearches = function () {
  this.recentContainer.innerHTML = "";

  this.recentSearches.forEach(city => {
    const btn = document.createElement("button");
    btn.textContent = city;

    btn.addEventListener("click", () => {
      this.getWeather(city);
    });

    this.recentContainer.appendChild(btn);
  });
};

// =======================
// AUTO LOAD LAST CITY
// =======================

WeatherApp.prototype.loadLastCity = function () {
  const lastCity = localStorage.getItem("lastCity");

  if (lastCity) {
    this.getWeather(lastCity);
  }
};

// =======================
// CLEAR HISTORY
// =======================

WeatherApp.prototype.clearHistory = function () {
  localStorage.removeItem("recentSearches");
  localStorage.removeItem("lastCity");
  this.recentSearches = [];
  this.displayRecentSearches();
};

// =======================
// INITIALIZE APP
// =======================

const app = new WeatherApp();

// Make global function for HTML button
function getWeather() {
  app.getWeather();
}
