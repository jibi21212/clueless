import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAi5X_QUtORz3oANH-UYEfi0riwAOfqemM",
  authDomain: "clueless-b6e33.firebaseapp.com",
  projectId: "clueless-b6e33",
  storageBucket: "clueless-b6e33.firebasestorage.app",
  messagingSenderId: "1040520245215",
  appId: "1:1040520245215:web:8d2a9a0ebe85f5836d1e6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };