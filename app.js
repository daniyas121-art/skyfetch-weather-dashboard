const apiKey="PUT_YOUR_KEY";

function getWeather(city){

const url=
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url)

.then(function(res){

const d=res.data;

document.getElementById("city").innerText=d.name;
document.getElementById("temp").innerText=d.main.temp+"°C";
document.getElementById("desc").innerText=d.weather[0].description;

const icon=d.weather[0].icon;
document.getElementById("icon").src=
`https://openweathermap.org/img/wn/${icon}@2x.png`;

})

.catch(function(err){
console.log(err);
});

}

getWeather("London");
