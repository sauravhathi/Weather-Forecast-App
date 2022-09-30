import React, { useState } from "react";

function App() {
  const axios = require("axios").default;
  const key = "d8bd8597aba671d277e0b4f021f6a665";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
      );
      const data = response.data;
      const temp = data.main.temp;
      const feels_like = data.main.feels_like;
      const temp_min = data.main.temp_min;
      const temp_max = data.main.temp_max;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const wind_speed = data.wind.speed;
      const wind_deg = data.wind.deg;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const country = data.sys.country;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const timezone = data.timezone;
      const name = data.name;

      setWeather({
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        pressure,
        wind_speed,
        wind_deg,
        description,
        icon,
        country,
        sunrise,
        sunset,
        timezone,
        name,
      });
      console.log(response.data);
      setError(false);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <div className="">
        <div className="grid  grid-cols-1 justify-items-center">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-3xl font-bold mb-2"
                htmlFor="username"
              >
                Weather Forecast
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter city name"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={getWeather}
              >
                Get Weather
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div className="grid grid-cols-2 gap-4">
              {error ? <p className="text-red-500">City not found</p> : null}
              {weather.temp ? (
                <>
                  <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-2xl font-bold">
                        {weather.name}, {weather.country}
                      </p>
                      <p className="text-sm font-bold">
                        Date: {new Date().toLocaleDateString(weather.timezone)}
                      </p>
                      <p className="text-sm font-bold">
                        Day:{" "}
                        {new Date()
                          .toLocaleDateString(weather.timezone, {
                            weekday: "long",
                          })
                          .toUpperCase()}
                      </p>
                      <p className="text-sm font-bold">
                        Wind speed: {weather.wind_speed} m/s
                      </p>
                      <p className="text-sm font-bold">
                        Wind direction: {weather.wind_deg}°
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-2xl font-bold">
                        {Math.round(weather.temp - 273.15)}°C
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold">
                      {weather.description.toUpperCase()}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                      alt="weather icon"
                    />
                    <p className="text-sm font-bold">
                      Feels like: {Math.round(weather.feels_like - 273.15)}°C
                    </p>
                    <p className="text-sm font-bold">
                      Min: {Math.round(weather.temp_min - 273.15)}°C
                    </p>
                    <p className="text-sm font-bold">
                      Max: {Math.round(weather.temp_max - 273.15)}°C
                    </p>
                    <p className="text-sm font-bold">
                      Humidity: {weather.humidity}%
                    </p>
                    <p className="text-sm font-bold">
                      Pressure: {weather.pressure} hPa
                    </p>

                    <p className="text-sm font-bold">
                      Sunrise:{" "}
                      {new Date(weather.sunrise * 1000).toLocaleTimeString(
                        weather.timezone,
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </p>
                    <p className="text-sm font-bold">
                      Sunset:{" "}
                      {new Date(weather.sunset * 1000).toLocaleTimeString(
                        weather.timezone,
                        {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }
                      )}
                    </p>
                    <p className="text-sm font-bold">
                      Time:{" "}
                      {new Date().toLocaleTimeString(weather.timezone, {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
