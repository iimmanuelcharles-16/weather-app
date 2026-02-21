import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "f55b99945c8ec76c7e58de3560987085"; // Your key

  const getWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log(data);

      if (data.cod !== 200) {
        setError(data.message || "City not found!");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Network error!");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && getWeather()}
      />

      <button onClick={getWeather}>Search</button>
<br/>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>☁ Weather: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;

