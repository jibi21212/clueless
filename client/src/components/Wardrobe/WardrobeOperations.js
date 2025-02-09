import { db } from './config';
import { collection, doc, setDoc, updateDoc, deleteDoc, getDocs, arrayUnion, arrayRemove } from 'firebase/firestore';

// Get all wardrobe items
export const getWardrobeItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'wardrobe'));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Error getting wardrobe items: ", error);
    return [];
  }
};

// Add item to wardrobe
export const addItemToWardrobe = async (item) => {
  try {
    const docRef = doc(collection(db, 'wardrobe'));
    await setDoc(docRef, {
      ...item,
      id: docRef.id
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding item to wardrobe: ", error);
    return null;
  }
};

// Update wardrobe item
export const updateWardrobeItem = async (item) => {
  try {
    const docRef = doc(db, 'wardrobe', item.id);
    await updateDoc(docRef, item);
    return true;
  } catch (error) {
    console.error("Error updating wardrobe item: ", error);
    return false;
  }
};

// Delete wardrobe item
export const deleteWardrobeItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'wardrobe', itemId));
    return true;
  } catch (error) {
    console.error("Error deleting wardrobe item: ", error);
    return false;
  }
};

// Bulk delete items
export const bulkDeleteItems = async (itemIds) => {
  try {
    const deletePromises = itemIds.map(id => 
      deleteDoc(doc(db, 'wardrobe', id))
    );
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error bulk deleting items: ", error);
    return false;
  }
};