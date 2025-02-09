// components/Suggestions/OutfitSuggestion.js
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import WeatherWidget from './WeatherWidget';
import './OutfitSuggestion.css';

const OutfitSuggestion = ({ selectedClothes }) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const { wardrobe, addToHistory } = useUser();
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState({
    temperature: '',
    condition: '',
    precipitation: ''
  });

  // Generate outfit suggestions based on event, weather, and wardrobe
  useEffect(() => {
    // This is where you'd implement your outfit generation logic
    const generateSuggestions = () => {
      // Example logic - you'd want to make this more sophisticated
      const tops = wardrobe.filter(item => item.type === 'shirt');
      const bottoms = wardrobe.filter(item => item.type === 'pants');
      const shoes = wardrobe.filter(item => item.type === 'shoes');
      const accessories = wardrobe.filter(item => item.type === 'accessory');

      let outfits = [];
      // Generate different combinations
      tops.forEach(top => {
        bottoms.forEach(bottom => {
          shoes.forEach(shoe => {
            const outfit = {
              items: [top, bottom, shoe],
              accessories: accessories.slice(0, 1) // Optional accessory
            };
            outfits.push(outfit);
          });
        });
      });

      return outfits;
    };

    setSuggestions(generateSuggestions());
  }, [wardrobe]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace with your API key and desired location
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=${API_KEY}&units=imperial`
        );
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          precipitation: `${data.main.humidity}%`
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);
  
  const handleTryAnother = () => {
    if (currentSuggestionIndex < suggestions.length - 1) {
      setCurrentSuggestionIndex(prev => prev + 1);
    } else {
      alert('No more suggestions available!');
    }
  };

  const handleSaveOutfit = () => {
    const currentOutfit = suggestions[currentSuggestionIndex];
    addToHistory({
      id: Date.now(),
      date: new Date().toISOString(),
      items: currentOutfit.items,
      accessories: currentOutfit.accessories,
      weather: weather,
      event: 'Business Meeting', // Get this from your calendar/event context
      rating: null
    });
  };

  if (suggestions.length === 0) return <div>Loading suggestions...</div>;

  const currentOutfit = suggestions[currentSuggestionIndex];

  return (
    <div className="outfit-suggestion">
      <div className="suggestion-header">
        <div className="event-info">
          <h3>Business Meeting</h3>
          <p>10:00 AM - business</p>
        </div>
        <WeatherWidget weather={weather} />
      </div>

      <h4>Suggested Outfit</h4>
      <div className="outfit-items">
        {currentOutfit.items.map((item, index) => (
          <div key={index} className="outfit-item">
            <div 
              className="item-preview"
              style={{ backgroundColor: item.colors[0] }}
            >
              <span>{item.type}</span>
            </div>
            <div className="item-details">
              <p>{item.colors.join(', ')}</p>
              <p>{item.pattern}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="suggestion-actions">
        <button onClick={handleTryAnother} className="try-another-btn">
          Try Another Outfit
        </button>
        <button onClick={handleSaveOutfit} className="save-btn">
          Save Outfit
        </button>
      </div>

      <div className="feedback-section">
        <p>How's this suggestion?</p>
        <div className="feedback-buttons">
          <button>Too Casual</button>
          <button>Too Formal</button>
          <button>Perfect!</button>
        </div>
      </div>
    </div>
  );
};

export default OutfitSuggestion;