import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export const getOutfitSuggestion = async (wardrobeItems, weather, event, history) => {
  try {
    // This would be your API endpoint
    const response = await fetch('your-backend-url/suggest-outfit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wardrobe: wardrobeItems,
        weather,
        event,
        history
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error getting outfit suggestion:', error);
    throw error;
  }
};

export const saveOutfitToHistory = async (outfit) => {
  try {
    const historyRef = collection(db, 'outfitHistory');
    await addDoc(historyRef, {
      ...outfit,
      date: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving outfit to history:', error);
    throw error;
  }
};