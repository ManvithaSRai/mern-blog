// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-aabb9.firebaseapp.com",
  projectId: "mern-blog-aabb9",
  storageBucket: "mern-blog-aabb9.firebasestorage.app",
  messagingSenderId: "197524823742",
  appId: "1:197524823742:web:d4db6ab3213a07b83108ef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

