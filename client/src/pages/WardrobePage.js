import React from 'react';
import WardrobeGrid from '../components/Wardrobe/WardrobeGrid';
import UploadForm from '../components/Wardrobe/UploadForm';

const WardrobePage = () => {
  return (
    <div className="wardrobe-page">
      <h2>My Wardrobe</h2>
      <UploadForm />
      <WardrobeGrid />
    </div>
  );
};

export default WardrobePage;