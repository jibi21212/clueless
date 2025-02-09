import React, { useState, useEffect } from 'react';
import OutfitSuggestion from '../components/Suggestions/OutfitSuggestion';
import './SuggestionsPage.css';

const SuggestionsPage = () => {
  const [selectedClothes, setSelectedClothes] = useState([]);

  useEffect(() => {
    const savedSelection = localStorage.getItem('selectedForSuggestions');
    if (savedSelection) {
      setSelectedClothes(JSON.parse(savedSelection));
      // Optionally clear the storage after loading
      // localStorage.removeItem('selectedForSuggestions');
    }
  }, []);
  
  return (
    <div className="suggestions-page">
      <h2>Outfit Suggestions</h2>
      <p className="suggestions-intro">
        Based on your upcoming events, weather, and preferences
      </p>
      <OutfitSuggestion selectedClothes={selectedClothes} />
    </div>
  );
};

export default SuggestionsPage;