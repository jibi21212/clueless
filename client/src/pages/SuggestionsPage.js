import React from 'react';
import OutfitSuggestion from '../components/Suggestions/OutfitSuggestion';
import './SuggestionsPage.css';

const SuggestionsPage = () => {
  return (
    <div className="suggestions-page">
      <h2>Outfit Suggestions</h2>
      <p className="suggestions-intro">
        Based on your upcoming events, weather, and preferences
      </p>
      <OutfitSuggestion />
    </div>
  );
};

export default SuggestionsPage;