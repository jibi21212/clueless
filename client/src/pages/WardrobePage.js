import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import WardrobeGrid from '../components/Wardrobe/WardrobeGrid';
import UploadForm from '../components/Wardrobe/UploadForm';
import './WardrobePage.css';

const WardrobePage = () => {
  const { wardrobe } = useUser();
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="wardrobe-page">
      <div className="wardrobe-header">
        <h2>My Wardrobe</h2>
        <button 
          className="add-item-btn"
          onClick={() => setShowUploadForm(true)}
        >
          Add New Item
        </button>
      </div>

      {/* Wardrobe Stats */}
      <div className="wardrobe-stats">
        <div className="stat-item">
          <span className="stat-number">{wardrobe.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        {/* Add more stats as needed */}
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setShowUploadForm(false)}
            >
              ×
            </button>
            <UploadForm onClose={() => setShowUploadForm(false)} />
          </div>
        </div>
      )}

      {/* Wardrobe Grid */}
      <WardrobeGrid items={wardrobe} />
    </div>
  );
};

export default WardrobePage;