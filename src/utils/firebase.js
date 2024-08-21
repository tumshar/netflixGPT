// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFaBm57FSSUtqZn0nGN-lXP_lbN3dS-E4",
  authDomain: "netflix-be4e9.firebaseapp.com",
  projectId: "netflix-be4e9",
  storageBucket: "netflix-be4e9.appspot.com",
  messagingSenderId: "772994404949",
  appId: "1:772994404949:web:e8a9204521f982222e3adc",
  measurementId: "G-0GDCJL45Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);