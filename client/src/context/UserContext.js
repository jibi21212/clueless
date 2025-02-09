import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [wardrobe, setWardrobe] = useState([]);
  const [outfitHistory, setOutfitHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [preferences, setPreferences] = useState({
    stylePreferences: [],
    colorPreferences: [],
    occasionPreferences: []
  });

  const addToWardrobe = (item) => {
    setWardrobe([...wardrobe, { ...item, id: Date.now() }]);
  };

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
  };

  const addToHistory = (outfit) => {
    setOutfitHistory([...outfitHistory, { ...outfit, id: Date.now() }]);
  };

  const updatePreferences = (newPreferences) => {
    setPreferences({ ...preferences, ...newPreferences });
  };

  const value = {
    wardrobe,
    outfitHistory,
    events,
    preferences,
    addToWardrobe,
    addEvent,
    addToHistory,
    updatePreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};