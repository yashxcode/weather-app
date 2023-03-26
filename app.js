let weather = {
    "apiKey": "fe072913878ccc0d56dadd39f965d8bc",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const { name } = data
        const { icon, description} = data.weather[0]
        const { temp, humidity } = data.main
        const { speed } = data.wind
        console.log(name, icon, description, temp, humidity, speed)

        document.querySelector(".city").textContent = `Weather in ${name}`
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`
        document.querySelector(".description").textContent = `${description}`
        document.querySelector(".temp").textContent = `${temp}°C`
        document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`
        document.querySelector(".wind").textContent = `Wind speed: ${speed} km/h`

        document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1600×900/?${name},city)`

        document.querySelector(".weather").classList.remove("loading")
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
}

document.querySelector(".search button").addEventListener("click", function() {
    weather.search()
})

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search()
    }
})

weather.fetchWeather("Mumbai")