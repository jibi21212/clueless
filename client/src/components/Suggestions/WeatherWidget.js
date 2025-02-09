import React from 'react';
import './WeatherWidget.css';

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    // Simple weather icon mapping
    switch (condition.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'snowy':
        return '🌨️';
      default:
        return '🌤️';
    }
  };

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