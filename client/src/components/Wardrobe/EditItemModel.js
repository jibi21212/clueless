import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import './EditItemModel.css';

const EditItemModel = ({ item, onClose }) => {
  const { updateWardrobeItem } = useUser();
  const [formData, setFormData] = useState({
    ...item,
    colors: [...item.colors],
    occasions: [...(item.occasions || [])]
  });
  const [newColor, setNewColor] = useState('');

  const occasionOptions = [
    'casual', 'formal', 'business', 'sport', 'party',
    'date', 'wedding', 'outdoor', 'beach', 'workout'
  ];

  const addColor = (e) => {
    e.preventDefault();
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({
        ...formData,
        colors: [...formData.colors, newColor]
      });
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(color => color !== colorToRemove)
    });
  };

  const toggleOccasion = (occasion) => {
    setFormData(prevData => {
      const occasions = prevData.occasions || [];
      if (occasions.includes(occasion)) {
        return {
          ...prevData,
          occasions: occasions.filter(o => o !== occasion)
        };
      } else {
        return {
          ...prevData,
          occasions: [...occasions, occasion]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateWardrobeItem(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Colors:</label>
            <div className="color-input-group">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Add a color"
              />
              <button type="button" onClick={addColor}>Add Color</button>
            </div>
            <div className="color-tags">
              {formData.colors.map((color, index) => (
                <span 
                  key={index} 
                  className="color-tag" 
                  style={{ backgroundColor: color }}
                >
                  <button 
                    type="button" 
                    onClick={() => removeColor(color)}
                    className="remove-color"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Type:</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">Select Type</option>
              <option value="shirt">Shirt</option>
              <option value="pants">Pants</option>
              <option value="dress">Dress</option>
              <option value="jacket">Jacket</option>
              <option value="shoes">Shoes</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pattern:</label>
            <select
              value={formData.pattern}
              onChange={(e) => setFormData({...formData, pattern: e.target.value})}
            >
              <option value="">Select Pattern</option>
              <option value="solid">Solid</option>
              <option value="striped">Striped</option>
              <option value="floral">Floral</option>
              <option value="checkered">Checkered</option>
              <option value="polka-dot">Polka Dot</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Season:</label>
            <select
              value={formData.season}
              onChange={(e) => setFormData({...formData, season: e.target.value})}
            >
              <option value="">Select Season</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="fall">Fall</option>
              <option value="all">All Seasons</option>
            </select>
          </div>

          <div className="form-group">
            <label>Occasions:</label>
            <div className="occasions-container">
              {occasionOptions.map((occasion) => (
                <button
                  key={occasion}
                  type="button"
                  className={`occasion-tag ${formData.occasions?.includes(occasion) ? 'selected' : ''}`}
                  onClick={() => toggleOccasion(occasion)}
                >
                  {occasion}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModel;