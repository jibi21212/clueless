import React from 'react';
import { useUser } from '../context/UserContext';
import OutfitCard from '../components/Outfits/OutfitCard'; 
import './HistoryPage.css';

const HistoryPage = () => {
  const { outfitHistory, loading } = useUser();

  if (loading) {
    return <div className="loading">Loading history...</div>;
  }

  return (
    <div className="history-page">
      <h2>Outfit History</h2>
      {outfitHistory.length > 0 ? (
        <div className="history-list">
          {outfitHistory.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      ) : (
        <p className="no-history">No outfits in history yet</p>
      )}
    </div>
  );
};

export default HistoryPage;