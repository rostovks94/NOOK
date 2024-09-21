// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyCXqXjA1K47NXMDoo3BMOEfr8Yt7cwbfVI",
  
    authDomain: "nook-aa562.firebaseapp.com",
  
    projectId: "nook-aa562",
  
    storageBucket: "nook-aa562.appspot.com",
  
    messagingSenderId: "1089641107584",
  
    appId: "1:1089641107584:web:e5cf8586c346ba8b45d665",
  
    measurementId: "G-04SWWQYJP3"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase Auth persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting Firebase Auth persistence:', error);
  });

export { auth };