import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function displayCity(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      Windspeed: Math.round(response.data.wind.speed),
      Description: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "7059cb165caa3316bff682d263a01b1e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCity);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={updateCity} />
        <button type="submit">Search</button>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {weather.temperature}°C</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Windspeed: {weather.Windspeed}</li>
          <li>Description: {weather.Description}</li>
          <img src={weather.icon} />
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
