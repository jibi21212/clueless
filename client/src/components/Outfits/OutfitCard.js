// components/Outfits/OutfitCard.js
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './OutfitCard.css';

const OutfitCard = ({ outfit }) => {
  const [feedback, setFeedback] = useState(outfit.feedback);
  const { updateOutfitFeedback } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!outfit || !Array.isArray(outfit.outfit)) {
    return null;
  }

  const handleFeedback = async (isPositive) => {
    try {
      setIsUpdating(true);
      await updateOutfitFeedback(outfit.id, isPositive);
      setFeedback(isPositive);
    } catch (error) {
      console.error('Error updating feedback:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="outfit-card">
      <div className="outfit-header">
        <span className="outfit-date">
          {new Date(outfit.date).toLocaleDateString()}
        </span>
        {outfit.weather && (
          <span className="outfit-weather">
            {Math.round(outfit.weather.temperature)}°F, {outfit.weather.condition}
          </span>
        )}
      </div>
      <div className="outfit-items">
        {outfit.outfit.map((item, index) => (
          <div key={index} className="outfit-item">
            {item.imageUrl && (
              <div className="item-image-container">
                <img 
                  src={item.imageUrl} 
                  alt={item.type} 
                  className="item-image"
                />
              </div>
            )}
            <div className="item-details">
              <span className="item-type">{item.type}</span>
              <span className="item-colors">
                {Array.isArray(item.colors) ? item.colors.join(', ') : item.colors}
              </span>
              {item.category && (
                <span className="item-category">{item.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="outfit-feedback">
        <button
          className={`feedback-button like ${feedback === true ? 'active' : ''}`}
          onClick={() => handleFeedback(true)}
          disabled={isUpdating}
        >
          <i className="fas fa-thumbs-up"></i>
        </button>
        <button
          className={`feedback-button dislike ${feedback === false ? 'active' : ''}`}
          onClick={() => handleFeedback(false)}
          disabled={isUpdating}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
      </div>
    </div>
  );
};

export default OutfitCard;