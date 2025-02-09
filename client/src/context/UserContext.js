import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  getDocs,
  query as firestoreQuery,
  orderBy as firestoreOrderBy
} from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [wardrobe, setWardrobe] = useState([]);
  const [outfitHistory, setOutfitHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [preferences, setPreferences] = useState({
    stylePreferences: [],
    colorPreferences: [],
    occasionPreferences: []
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch wardrobe
        const wardrobeSnapshot = await getDocs(collection(db, 'wardrobe'));
        const wardrobeItems = wardrobeSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWardrobe(wardrobeItems);

        // Fetch outfit history
        const historyQuery = firestoreQuery(
          collection(db, 'outfitHistory'), 
          firestoreOrderBy('date', 'desc')
        );
        const historySnapshot = await getDocs(historyQuery);
        const historyItems = historySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOutfitHistory(historyItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch events
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
      const itemRef = doc(db, 'wardrobe', updatedItem.id);
      await updateDoc(itemRef, updatedItem);
      
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
      const eventData = {
        title: event.title,
        description: event.description,
        dress_code: event.dress_code,
        time: event.time,
        location: event.location,
        date: new Date(event.date).toISOString(),
        dateCreated: new Date().toISOString()
      };
  
      const docRef = await addDoc(collection(db, 'events'), eventData);
      const newEvent = { ...eventData, id: docRef.id };
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  };

  const updateOutfitFeedback = async (outfitId, isPositive) => {
    try {
      const outfitRef = doc(db, 'outfitHistory', outfitId);
      await updateDoc(outfitRef, {
        feedback: isPositive,
        updatedAt: new Date().toISOString()
      });
  
      setOutfitHistory(prev => prev.map(outfit => 
        outfit.id === outfitId 
          ? { ...outfit, feedback: isPositive }
          : outfit
      ));
    } catch (error) {
      console.error("Error updating feedback:", error);
      throw error;
    }
  };
  
  const addToHistory = async (outfit) => {
    try {
      const docRef = await addDoc(collection(db, 'outfitHistory'), {
        ...outfit,
        dateAdded: new Date().toISOString()
      });

      const historyEntry = {
        id: docRef.id,
        ...outfit,
        dateAdded: new Date().toISOString()
      };

      setOutfitHistory(prev => [historyEntry, ...prev]);
      return docRef.id;
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
    loading,
    deleteFromWardrobe,
    updateWardrobeItem,
    addToWardrobe,
    addEvent,
    addToHistory,
    updateOutfitFeedback,
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

export default UserProvider;