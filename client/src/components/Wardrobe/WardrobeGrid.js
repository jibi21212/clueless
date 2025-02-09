import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import EditItemModel from './EditItemModel';
import './WardrobeGrid.css';

const WardrobeGrid = ({ items }) => {
  const { deleteFromWardrobe } = useUser();
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const navigate = useNavigate();

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteFromWardrobe(itemId);
        setSelectedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item. Please try again.");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.size} items?`)) {
      try {
        const deletePromises = Array.from(selectedItems).map(itemId => 
          deleteFromWardrobe(itemId)
        );
        await Promise.all(deletePromises);
        setSelectedItems(new Set());
      } catch (error) {
        console.error("Error deleting items:", error);
        alert("Failed to delete some items. Please try again.");
      }
    }
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleGetSuggestions = () => {
    const selectedClothes = items.filter(item => selectedItems.has(item.id));
    localStorage.setItem('selectedForSuggestions', JSON.stringify(selectedClothes));
    navigate('/suggestions');
  };

  return (
    <div className="wardrobe-container">
      {selectedItems.size > 0 && (
        <div className="bulk-actions-bar">
          <span>{selectedItems.size} items selected</span>
          <div className="bulk-actions">
            <button 
              className="bulk-action-btn delete"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </button>
            <button 
              className="bulk-action-btn suggest"
              onClick={handleGetSuggestions}
            >
              Get Suggestions
            </button>
          </div>
        </div>
      )}

      <div className="wardrobe-grid">
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`grid-item ${selectedItems.has(item.id) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              className="item-checkbox"
              checked={selectedItems.has(item.id)}
              onChange={() => toggleItemSelection(item.id)}
            />
            <button 
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              🗑️
            </button>
            
            <div className="item-image">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.type} />
              ) : (
                <div 
                  className="color-preview"
                  style={{ backgroundColor: item.colors[0] }}
                />
              )}
            </div>
            
            <div className="item-details">
              <h4>{item.type}</h4>
              <div className="item-colors">
                {item.colors.map((color, index) => (
                  <span 
                    key={index}
                    className="color-tag"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="item-pattern">{item.pattern}</p>
              <p className="item-season">{item.season}</p>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <EditItemModel
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default WardrobeGrid;