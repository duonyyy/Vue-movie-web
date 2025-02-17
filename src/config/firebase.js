// src/firebase.js
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDG9fu5ORHzRTk5z8Y7w-gArzouezzoC04",
  authDomain: "loginmoviehce.firebaseapp.com",
  projectId: "loginmoviehce",
  storageBucket: "loginmoviehce.appspot.com",
  messagingSenderId: "335379859023",
  appId: "1:335379859023:web:85212a14696600b4f90c3a",
  measurementId: "G-H0SYR6VTVZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
//