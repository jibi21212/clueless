import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget';
import './OutfitSuggestion.css';

const OutfitSuggestion = () => {
  const [currentSuggestion, setCurrentSuggestion] = useState({
    event: {
      title: 'Business Meeting',
      time: '10:00 AM',
      dressCode: 'business'
    },
    outfit: {
      top: { type: 'shirt', color: 'white', pattern: 'solid' },
      bottom: { type: 'pants', color: 'navy', pattern: 'solid' },
      shoes: { type: 'dress shoes', color: 'black' },
      accessories: [
        { type: 'tie', color: 'blue', pattern: 'striped' }
      ]
    },
    weather: {
      temperature: 72,
      condition: 'Sunny',
      precipitation: '0%'
    }
  });

  const [feedback, setFeedback] = useState(null);

  const handleRegenerateOutfit = () => {
    // This will eventually call the AI to generate a new suggestion
    console.log('Regenerating outfit...');
  };

  const handleSaveSuggestion = () => {
    // Save the suggestion to history
    console.log('Saving suggestion...');
  };

  const handleFeedback = (type) => {
    setFeedback(type);
    // This will eventually be used to improve suggestions
    console.log(`Feedback recorded: ${type}`);
  };

  return (
    <div className="outfit-suggestion">
      <div className="suggestion-header">
        <div className="event-info">
          <h3>{currentSuggestion.event.title}</h3>
          <p>{currentSuggestion.event.time} - {currentSuggestion.event.dressCode}</p>
        </div>
        <WeatherWidget weather={currentSuggestion.weather} />
      </div>

      <div className="suggested-outfit">
        <h4>Suggested Outfit</h4>
        <div className="outfit-items">
          {/* Top */}
          <div className="outfit-item">
            <div 
              className="item-preview"
              style={{ backgroundColor: currentSuggestion.outfit.top.color }}
            >
              <span>{currentSuggestion.outfit.top.type}</span>
            </div>
            <div className="item-details">
              <p>{currentSuggestion.outfit.top.color}</p>
              <p>{currentSuggestion.outfit.top.pattern}</p>
            </div>
          </div>

          {/* Bottom */}
          <div className="outfit-item">
            <div 
              className="item-preview"
              style={{ backgroundColor: currentSuggestion.outfit.bottom.color }}
            >
              <span>{currentSuggestion.outfit.bottom.type}</span>
            </div>
            <div className="item-details">
              <p>{currentSuggestion.outfit.bottom.color}</p>
              <p>{currentSuggestion.outfit.bottom.pattern}</p>
            </div>
          </div>

          {/* Shoes */}
          <div className="outfit-item">
            <div 
              className="item-preview"
              style={{ backgroundColor: currentSuggestion.outfit.shoes.color }}
            >
              <span>{currentSuggestion.outfit.shoes.type}</span>
            </div>
            <div className="item-details">
              <p>{currentSuggestion.outfit.shoes.color}</p>
            </div>
          </div>

          {/* Accessories */}
          {currentSuggestion.outfit.accessories.map((accessory, index) => (
            <div key={index} className="outfit-item accessory">
              <div 
                className="item-preview"
                style={{ backgroundColor: accessory.color }}
              >
                <span>{accessory.type}</span>
              </div>
              <div className="item-details">
                <p>{accessory.color}</p>
                {accessory.pattern && <p>{accessory.pattern}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="suggestion-actions">
          <button 
            className="regenerate-btn"
            onClick={handleRegenerateOutfit}
          >
            Try Another Outfit
          </button>
          <button 
            className="save-btn"
            onClick={handleSaveSuggestion}
          >
            Save Outfit
          </button>
        </div>

        <div className="feedback-section">
          <p>How's this suggestion?</p>
          <div className="feedback-buttons">
            <button 
              className={`feedback-btn ${feedback === 'too-casual' ? 'active' : ''}`}
              onClick={() => handleFeedback('too-casual')}
            >
              Too Casual
            </button>
            <button 
              className={`feedback-btn ${feedback === 'too-formal' ? 'active' : ''}`}
              onClick={() => handleFeedback('too-formal')}
            >
              Too Formal
            </button>
            <button 
              className={`feedback-btn ${feedback === 'perfect' ? 'active' : ''}`}
              onClick={() => handleFeedback('perfect')}
            >
              Perfect!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitSuggestion;