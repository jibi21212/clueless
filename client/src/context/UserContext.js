import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  getDocs 
} from 'firebase/firestore';

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

  // Fetch initial wardrobe data
// Add this after your wardrobe fetch effect
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = [];
      querySnapshot.forEach((doc) => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();
}, []);
  const addToWardrobe = async (item) => {
    try {
      console.log('Adding item to Firebase:', item);
      const docRef = await addDoc(collection(db, 'wardrobe'), item);
      console.log('Successfully added to Firebase with ID:', docRef.id);
      
      const newItem = { ...item, id: docRef.id };
      setWardrobe(prev => [...prev, newItem]);
      return newItem;
    } catch (error) {
      console.error("Error adding to wardrobe:", error);
      throw error;
    }
};

const deleteFromWardrobe = async (itemId) => {
    try {
      console.log('Deleting item from Firebase:', itemId);
      await deleteDoc(doc(db, 'wardrobe', itemId));
      console.log('Successfully deleted from Firebase');
      
      setWardrobe(prev => prev.filter(item => item.id !== itemId));
      return true;
    } catch (error) {
      console.error("Error deleting from wardrobe:", error);
      throw error;
    }
};

  const updateWardrobeItem = async (updatedItem) => {
    try {
      // Update in Firestore
      const itemRef = doc(db, 'wardrobe', updatedItem.id);
      await updateDoc(itemRef, updatedItem);
      
      // Update local state
      setWardrobe(prev => 
        prev.map(item => item.id === updatedItem.id ? updatedItem : item)
      );
      return true;
    } catch (error) {
      console.error("Error updating wardrobe item:", error);
      throw error;
    }
  };

  const addEvent = async (event) => {
    try {
      console.log('Received event data:', event); // Debug log
  
      // Format the event data for Firestore
      const eventData = {
        title: event.title,
        description: event.description,
        dress_code: event.dress_code,
        time: event.time,
        location: event.location,
        date: new Date(event.date).toISOString(), // Ensure proper date formatting
        dateCreated: new Date().toISOString()
      };
  
      console.log('Formatted event data:', eventData); // Debug log
  
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'events'), eventData);
      console.log('Added to Firestore with ID:', docRef.id); // Debug log
  
      // Create new event object with ID
      const newEvent = { ...eventData, id: docRef.id };
      
      // Update local state
      setEvents(prev => [...prev, newEvent]);
      
      return newEvent;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };

  
  const addToHistory = async (outfit) => {
    try {
      const historyData = {
        outfit: outfit,
        dateAdded: new Date().toISOString(),
        feedback: true, // assuming accepted suggestion
        feedback_history: {
          feedback: [true],
          Outfit: outfit
        }
      };
  
      const docRef = await addDoc(collection(db, 'History'), historyData);
      const newHistory = { ...historyData, id: docRef.id };
      setOutfitHistory(prev => [...prev, newHistory]);
      return newHistory;
    } catch (error) {
      console.error("Error adding to history:", error);
      throw error;
    }
  };
  const updatePreferences = async (newPreferences) => {
    try {
      const preferencesRef = doc(db, 'preferences', 'userPreferences');
      await updateDoc(preferencesRef, newPreferences);
      setPreferences(prev => ({ ...prev, ...newPreferences }));
      return true;
    } catch (error) {
      console.error("Error updating preferences:", error);
      throw error;
    }
  };

  const value = {
    wardrobe,
    outfitHistory,
    events,
    preferences,
    deleteFromWardrobe,
    updateWardrobeItem,
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