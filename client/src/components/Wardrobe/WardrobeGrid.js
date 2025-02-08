import React, { useState } from 'react';
import './WardrobeGrid.css';

const WardrobeGrid = () => {
  // This will be replaced with actual data later
  const [items, setItems] = useState([
    { id: 1, type: 'shirt', colors: ['blue', 'white'], pattern: 'striped', season: 'summer', image: 'placeholder.jpg' },
    { id: 2, type: 'pants', colors: ['black'], pattern: 'solid', season: 'all', image: 'placeholder.jpg' },
  ]);

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEdit = (id) => {
    // This will be implemented to open the edit form
    console.log('Edit item:', id);
  };

  return (
    <div className="wardrobe-grid">
      <h3>My Clothes</h3>
      <div className="grid">
        {items.map(item => (
          <div key={item.id} className="grid-item">
            <div className="item-image">
              <div className="placeholder-image"></div>
              <div className="item-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(item.id)}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="item-details">
              <p className="item-type">{item.type}</p>
              <p className="item-colors">
                {item.colors.map((color, index) => (
                  <span 
                    key={index} 
                    className="color-tag"
                    style={{ backgroundColor: color }}
                  >
                    {color}
                  </span>
                ))}
              </p>
              <p className="item-pattern">{item.pattern}</p>
              <p className="item-season">{item.season}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardrobeGrid;