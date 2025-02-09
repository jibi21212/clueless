import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './OutfitSuggestion.css';

const OutfitSuggestion = () => {
  const [weather, setWeather] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { wardrobe, addToHistory } = useUser();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const defaultLat = '40.7128';
        const defaultLon = '-74.0060';
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${defaultLat}&lon=${defaultLon}&units=imperial&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Weather data fetch failed');
        }

        const data = await response.json();
        setWeather({
          temperature: data.main.temp,
          condition: data.weather[0].main,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data');
      }
    };

    fetchWeather();
  }, []);

  const generateSuggestion = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!wardrobe || wardrobe.length === 0) {
        throw new Error('Please add some items to your wardrobe first');
      }
  
      const validWardrobe = wardrobe.map(item => ({
        type: item.type,
        colors: item.colors,
        pattern: item.pattern || 'solid',
        season: item.season,
        occasions: item.occasions,
        id: item.id,
        imageUrl: item.imageUrl
      }));
  
      const requestData = {
        wardrobe: validWardrobe,
        weather: weather || {
          temperature: 70,
          condition: "Clear"
        },
        event: {
          type: "casual",
          time: "now",
          dress_code: "casual",
          description: "Default casual outfit"
        },
        // Add a random seed to ensure different combinations
        seed: Math.random()
      };
  
      const response = await fetch('http://localhost:8080/suggest-outfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });
  
      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to generate suggestion');
      }
  
      // Force React to see this as a new suggestion by adding a timestamp
      setSuggestion(data.suggestion.map(item => ({
        ...item,
        key: Date.now() + Math.random()
      })));
    } catch (error) {
      console.error('Error generating suggestion:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOutfit = async () => {
    try {
      if (!suggestion) return;

      const outfitHistory = {
        outfit: suggestion.map(item => ({
          ...item,
          imageUrl: wardrobe.find(w => w.type === item.type)?.imageUrl
        })),
        date: new Date().toISOString(),
        weather: weather,
        event: {
          type: "casual",
          time: "now",
          dress_code: "casual"
        },
        feedback: true
      };

      await addToHistory(outfitHistory);
      setSuggestion(null);
      
      // Show success message
      alert('Outfit saved to history!');
    } catch (error) {
      console.error('Error saving outfit:', error);
      setError('Failed to save outfit to history');
    }
  };

  return (
    <div className="outfit-suggestion-container">
      <h2>Outfit Suggestions</h2>
      <p className="suggestion-intro">
        Based on your upcoming events, weather, and preferences
      </p>

      {weather && (
        <div className="weather-info">
          <div className="weather-detail">
            <i className="fas fa-temperature-high"></i>
            <span>{Math.round(weather.temperature)}°F</span>
          </div>
          <div className="weather-detail">
            <i className="fas fa-cloud"></i>
            <span>{weather.condition}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      <button 
        className="generate-button"
        onClick={generateSuggestion}
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i>
            Generating Suggestion...
          </>
        ) : (
          <>
            <i className="fas fa-tshirt"></i>
            Generate Outfit Suggestion
          </>
        )}
      </button>

      {suggestion && (
        <div className="suggestion-result">
          <h3>Recommended Outfit</h3>
          <div className="outfit-items">
            {suggestion.map((item, index) => {
              const wardrobeItem = wardrobe.find(w => w.type === item.type);
              
              return (
                <div key={`${item.type}-${index}-${Date.now()}`} className="outfit-item-card">
                  {wardrobeItem?.imageUrl && (
                    <div className="item-image-container">
                      <img 
                        src={wardrobeItem.imageUrl} 
                        alt={item.type}
                        className="item-image"
                      />
                    </div>
                  )}
                  <div className="item-details">
                    <span className="item-type">
                      <i className="fas fa-check-circle"></i>
                      {item.type}
                    </span>
                    <span className="item-colors">
                      {Array.isArray(item.colors) ? item.colors.join(', ') : item.colors}
                    </span>
                    <span className="item-category">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="feedback-buttons">
            <button 
              className="accept-button"
              onClick={handleAcceptOutfit}
            >
              <i className="fas fa-check"></i>
              Accept Outfit
            </button>
            <button 
              className="reject-button"
              onClick={generateSuggestion}
            >
              <i className="fas fa-times"></i>
              Try Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitSuggestion;