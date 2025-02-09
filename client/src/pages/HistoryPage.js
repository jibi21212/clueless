import React from 'react';
import OutfitHistory from '../components/History/OutfitHistory';
import './HistoryPage.css';

const HistoryPage = () => {
  return (
    <div className="history-page">
      <h2>Outfit History</h2>
      <p className="history-intro">
        Review and rate your past outfits to help improve future suggestions
      </p>
      <OutfitHistory />
    </div>
  );
};

export default HistoryPage;