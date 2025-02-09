import React from 'react';
import './WardrobeGrid.css';

const WardrobeGrid = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="empty-wardrobe">
        <p>Your wardrobe is empty. Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="wardrobe-grid">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <div className="item-image">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.type} />
            ) : (
              <div 
                className="color-preview"
                style={{ backgroundColor: item.colors[0] }}
              />
            )}
            <div className="item-actions">
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑️</button>
            </div>
          </div>
          <div className="item-details">
            <h4>{item.type}</h4>
            <div className="item-colors">
              {item.colors.map((color, index) => (
                <span 
                  key={index}
                  className="color-tag"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p className="item-pattern">{item.pattern}</p>
            <p className="item-season">{item.season}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WardrobeGrid;