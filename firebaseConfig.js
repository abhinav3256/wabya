import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHCoKN5ev0fcSctuWT_7B5JMtPyobqFHw",
  authDomain: "wabya-45dba.firebaseapp.com",
  projectId: "wabya-45dba",
  storageBucket: "wabya-45dba.appspot.com",
  messagingSenderId: "320308726941",
  appId: "1:320308726941:web:fb0d28b8fe5526f582d874"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
