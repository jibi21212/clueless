const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeather = async (location = 'Toronto') => { // Default location or use geolocation
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`
    );
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      precipitation: `${data.main.humidity}%`,
      description: data.weather[0].description,
      windSpeed: data.wind.speed
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};