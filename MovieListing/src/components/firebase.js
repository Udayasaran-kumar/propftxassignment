// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh14nJVhYt-x5Be30chI5c-Hi1_x7IpGU",
  authDomain: "movielisting-cbc5a.firebaseapp.com",
  projectId: "movielisting-cbc5a",
  storageBucket: "movielisting-cbc5a.firebasestorage.app",
  messagingSenderId: "1044714994904",
  appId: "1:1044714994904:web:6e297754179af4b3572bad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);