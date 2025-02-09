import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import WeatherWidget from './WeatherWidget';
import './OutfitSuggestion.css';

const OutfitSuggestion = ({ selectedClothes }) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const { wardrobe } = useUser();
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [weather, setWeather] = useState({
    temperature: '',
    condition: '',
    precipitation: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${API_KEY}&units=imperial`
        );
        const data = await response.json();
        
        const weatherData = {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          precipitation: `${data.main.humidity}%`
        };
        
        setWeather(weatherData);
        // Once we have weather, get outfit suggestion
        await getOutfitSuggestion(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  const getOutfitSuggestion = async (weatherData) => {
    setIsLoading(true);
    try {
      const response = await fetch('YOUR_CLOUD_RUN_URL/suggest-outfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wardrobe: wardrobe,
          weather: weatherData,
          event: {
            type: 'business meeting',
            time: '10:00 AM',
            dress_code: 'business'
          }
        })
      });

      const suggestion = await response.json();
      setCurrentSuggestion(suggestion);
    } catch (error) {
      console.error('Error getting suggestion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of your component code
};