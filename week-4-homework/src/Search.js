import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [city, setCity] = useState("");
  const [buttonClicked, setbuttonClicked] = useState(false);
  const [weather, setWeather] = useState({});

  function showWeather(response) {
    setbuttonClicked(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,

      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function handleError(error) {
    if (error.response) {
      console.error(
        "Server responded with error status:",
        error.response.status
      );
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Error setting up the request:", error.message);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url).then(showWeather).catch(handleError);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="search" onChange={updateCity} placeholder="Type a city" />
        <input type="submit" value="Search" />
      </form>
      {buttonClicked && (
        <ul>
          <li>Temperature: {Math.round(weather.temperature)} °C </li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity} %</li>
          <li>Wind: {weather.wind} km/h </li>
          <li>
            {" "}
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      )}
    </>
  );
}
