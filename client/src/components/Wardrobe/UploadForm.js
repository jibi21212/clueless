import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useUser } from '../../context/UserContext';
import './UploadForm.css';

const UploadForm = ({ onClose }) => {
  const { addToWardrobe } = useUser();
  const [formData, setFormData] = useState({
    colors: [],
    pattern: '',
    type: '',
    season: '',
    occasions: [],
    description: ''
  });
  const [newColor, setNewColor] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const occasionOptions = [
    'casual', 'formal', 'business', 'sport', 'party',
    'date', 'wedding', 'outdoor', 'beach', 'workout'
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreviewImage(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, image: file }));
    }
  });

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
      if (prevData.occasions.includes(occasion)) {
        return {
          ...prevData,
          occasions: prevData.occasions.filter(o => o !== occasion)
        };
      } else {
        return {
          ...prevData,
          occasions: [...prevData.occasions, occasion]
        };
      }
    });
  };

  const handleReset = () => {
    setFormData({
      colors: [],
      pattern: '',
      type: '',
      season: '',
      occasions: [],
      description: ''
    });
    setPreviewImage(null);
    setNewColor('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.type || formData.colors.length === 0) {
      alert('Please add at least one color and select a type');
      return;
    }

    try {
      // Create the item object without the file object
      const newItem = {
        colors: formData.colors,
        type: formData.type,
        pattern: formData.pattern,
        season: formData.season,
        occasions: formData.occasions,
        description: formData.description,
        imageUrl: previewImage, // Note: For now just storing the URL
        dateAdded: new Date().toISOString()
      };

      // Add to Firestore through context
      const result = await addToWardrobe(newItem);
      
      if (result) {
        handleReset();
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
};

  return (
    <div className="upload-form">
      <h3>Add New Clothing Item</h3>
      
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {previewImage ? (
          <div className="preview-container">
            <img src={previewImage} alt="Preview" className="preview-image" />
            <button 
              type="button" 
              className="remove-image"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
              }}
            >
              Remove Image
            </button>
          </div>
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}
      </div>

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
            <button type="button" onClick={addColor} className="add-color-btn">
              Add Color
            </button>
          </div>
          <div className="color-tags">
            {formData.colors.map((color, index) => (
              <span 
                key={index} 
                className="color-tag" 
                style={{ backgroundColor: color }}
              >
                {color}
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
            required
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
                className={`occasion-tag ${formData.occasions.includes(occasion) ? 'selected' : ''}`}
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
            placeholder="Add any additional details about the item..."
            rows="3"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Add to Wardrobe
          </button>
          <button 
            type="button" 
            onClick={handleReset} 
            className="reset-btn"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;