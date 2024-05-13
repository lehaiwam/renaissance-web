// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage" 
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "", // Removed for safety
  authDomain: "renaissance-5112a.firebaseapp.com",
  projectId: "renaissance-5112a",
  storageBucket: "renaissance-5112a.appspot.com",
  messagingSenderId: "413866920022",
  appId: "1:413866920022:web:73dc99f0c9f178dd8853f7",
};

// Initialize Firebase functions
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
