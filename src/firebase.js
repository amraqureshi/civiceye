import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDGgjOHI4wDJ6ZyuAzbLEcvLzDxWNWSFcY",
  authDomain: "civiceye-1a22d.firebaseapp.com",
  projectId: "civiceye-1a22d",
  storageBucket: "civiceye-1a22d.firebasestorage.app",
  messagingSenderId: "1062693115189",
  appId: "1:1062693115189:web:840f7adeef606f198d287c",
  measurementId: "G-MD761W3PZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export default app;
