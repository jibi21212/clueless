import React from 'react';
import './OutfitCard.css';

const OutfitCard = ({ outfit, onRate }) => {
  const { id, date, event, items, rating, weather } = outfit;

  return (
    <div className="outfit-card">
      <div className="outfit-date">{new Date(date).toLocaleDateString()}</div>
      <div className="outfit-event">{event}</div>
      
      <div className="outfit-items">
        {items.map((item) => (
          <div key={item.id} className="outfit-item">
            <div 
              className="item-image"
              style={{ backgroundColor: item.color }}
            >
              {/* Replace with actual image */}
              <div className="placeholder-image"></div>
            </div>
            <span className="item-type">{item.type}</span>
          </div>
        ))}
      </div>

      <div className="rating-section">
        <p>How did you like this outfit?</p>
        <div className="rating-buttons">
          <button 
            className={`rating-btn ${rating === 'dislike' ? 'active' : ''}`}
            onClick={() => onRate(id, 'dislike')}
          >
            👎
          </button>
          <button 
            className={`rating-btn ${rating === 'like' ? 'active' : ''}`}
            onClick={() => onRate(id, 'like')}
          >
            👍
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;