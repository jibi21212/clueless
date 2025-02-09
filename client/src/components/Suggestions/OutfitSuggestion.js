import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import './OutfitSuggestion.css';

const OutfitSuggestion = ({ selectedClothes }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      // Replace with your actual weather API
      const response = await fetch('YOUR_WEATHER_API_ENDPOINT');
      const data = await response.json();
      setWeather({
        temperature: data.temperature,
        condition: data.condition
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data');
    }
  };

  const generateSuggestion = async () => {
    if (!selectedClothes.length || !weather) {
      setError('Please select clothes and ensure weather data is available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/suggest-outfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wardrobe: selectedClothes,
          weather: weather,
          event: {
            type: 'casual',
            time: new Date().toISOString(),
            dress_code: 'casual'
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSuggestion(data.suggestion);
      } else {
        setError(data.error || 'Failed to generate suggestion');
      }
    } catch (error) {
      console.error('Error generating suggestion:', error);
      setError('Failed to generate outfit suggestion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outfit-suggestion">
      {error && <div className="error-message">{error}</div>}
      
      <div className="weather-info">
        {weather && (
          <>
            <h3>Current Weather</h3>
            <p>Temperature: {weather.temperature}°F</p>
            <p>Condition: {weather.condition}</p>
          </>
        )}
      </div>

      <button 
        onClick={generateSuggestion}
        disabled={loading || !selectedClothes.length || !weather}
        className="generate-button"
      >
        {loading ? 'Generating...' : 'Generate Outfit Suggestion'}
      </button>

      {suggestion && (
        <div className="suggestion-result">
          <h3>Suggested Outfit</h3>
          <div className="suggested-items">
            {suggestion.map((item, index) => (
              <div key={index} className="suggested-item">
                <p className="item-type">{item.type}</p>
                <p className="item-colors">Colors: {item.colors.join(', ')}</p>
                <p className="item-pattern">Pattern: {item.pattern}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitSuggestion;