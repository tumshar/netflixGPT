// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABFgACZrFz_TkFGJYAmIG9WpumY5tmOeA",
  authDomain: "moviegpt-a99c3.firebaseapp.com",
  projectId: "moviegpt-a99c3",
  storageBucket: "moviegpt-a99c3.appspot.com",
  messagingSenderId: "683892722634",
  appId: "1:683892722634:web:93e57ccd913e02ab1b9d33",
  measurementId: "G-HQW3J578HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();