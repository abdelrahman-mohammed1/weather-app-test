const container = document.querySelector(".container");
const search = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
search.addEventListener("click", () => {
  const APIkey = "946d98e39874d05aa83d835fb901a797";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error.style.display = "block";
        error.classList.add("fadeIn");
        return;
      }
      error.style.display = "none";
      error.classList.remove("fadeIn");
      const image = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temp");
      const desc = document.querySelector(".weather-box .desc");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }
      //   console.log(Math.floor(json.main.temp))
      //   temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      temp.innerHTML = `${Math.floor(json.main.temp)}<span>°C</span>`;
      desc.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}km/h`;
      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
