import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import OutfitCard from './OutfitCard';
import './OutfitHistory.css';

const OutfitHistory = () => {
  const { outfitHistory } = useUser();
  const [filteredOutfits, setFilteredOutfits] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');

  useEffect(() => {
    let filtered = [...outfitHistory];

    // Apply time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      switch (timeFilter) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      filtered = filtered.filter(outfit => 
        new Date(outfit.dateAdded) > filterDate
      );
    }

    // Apply event filter
    if (eventFilter !== 'all') {
      filtered = filtered.filter(outfit => 
        outfit.event?.toLowerCase() === eventFilter
      );
    }

    setFilteredOutfits(filtered);
  }, [outfitHistory, timeFilter, eventFilter]);

  return (
    <div className="outfit-history">
      <div className="history-filters">
        <select 
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
        </select>
        <select 
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="business">Business</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
        </select>
      </div>

      <div className="outfits-grid">
        {filteredOutfits.map((outfit) => (
          <OutfitCard 
            key={outfit.id}
            outfit={outfit}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitHistory;