import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../../services/weatherService';
import './WeatherWidget.css';

const WeatherWidget = ({ onWeatherUpdate }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather();
      setWeather(weatherData);
      if (onWeatherUpdate) {
        onWeatherUpdate(weatherData);
      }
    };

    getWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(getWeather, 1800000);
    return () => clearInterval(interval);
  }, [onWeatherUpdate]);

  const getWeatherIcon = (condition) => {
    if (!condition) return '🌤️';
    
    switch (condition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '🌨️';
      case 'thunderstorm':
        return '⛈️';
      case 'drizzle':
        return '🌦️';
      case 'mist':
      case 'fog':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div className="weather-widget">
      <div className="weather-icon">
        {getWeatherIcon(weather.condition)}
      </div>
      <div className="weather-info">
        <div className="temperature">
          {weather.temperature}°F
        </div>
        <div className="condition">
          {weather.condition}
        </div>
        <div className="precipitation">
          Precipitation: {weather.precipitation}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;