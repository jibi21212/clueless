import React, { useState } from 'react';
import OutfitCard from './OutfitCard';
import './OutfitHistory.css';

const OutfitHistory = () => {
  // This will eventually come from your backend
  const [outfits] = useState([
    {
      id: 1,
      date: '2024-02-08',
      event: 'Business Meeting',
      items: [
        { id: 1, type: 'shirt', color: 'white', image: 'placeholder.jpg' },
        { id: 2, type: 'pants', color: 'black', image: 'placeholder.jpg' },
      ],
      rating: null,
      weather: 'Sunny, 72°F',
    },
    // Add more sample outfits
  ]);

  const handleRating = (outfitId, rating) => {
    // This will eventually update the backend
    console.log(`Outfit ${outfitId} rated ${rating}`);
  };

  return (
    <div className="outfit-history">
      <div className="history-filters">
        <select defaultValue="all">
          <option value="all">All Time</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
        </select>
        <select defaultValue="all">
          <option value="all">All Events</option>
          <option value="business">Business</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
        </select>
      </div>

      <div className="outfits-grid">
        {outfits.map((outfit) => (
          <OutfitCard 
            key={outfit.id}
            outfit={outfit}
            onRate={handleRating}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitHistory;