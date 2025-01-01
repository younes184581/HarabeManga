// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHzrDjX8NKraxYs0egbzrhaCUNVcCTy9U",
  authDomain: "harabemanga.firebaseapp.com",
  databaseURL: "https://harabemanga-default-rtdb.firebaseio.com/",
  projectId: "harabemanga",
  storageBucket: "harabemanga.firebasestorage.app",
  messagingSenderId: "322426727667",
  appId: "1:322426727667:web:75fd3657de2b13bd905b86"
};

// Initialize Firebase
let auth, database;
try {
  const app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized successfully');
  
  auth = getAuth(app);
  console.log('Firebase auth initialized successfully');
  
  database = getDatabase(app);
  console.log('Firebase database initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

export { auth, database, firebaseConfig };
