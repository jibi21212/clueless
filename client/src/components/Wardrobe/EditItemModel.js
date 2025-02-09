import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... keep all your existing occasion options and helper functions ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update in Firebase
      const itemRef = doc(db, 'wardrobe', item.id);
      await updateDoc(itemRef, formData);
      
      // Update local state through context
      updateWardrobeItem(formData);
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... keep all your existing JSX and form elements ...
  // Just update the submit button to show loading state:

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* ... keep all your existing form elements ... */}

        <div className="modal-buttons">
          <button 
            type="submit" 
            className="save-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModel;