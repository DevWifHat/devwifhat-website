// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjdIMBkERmypzbY0Ssyidlx38BXLX8S48",
  authDomain: "devwifhat-302cf.firebaseapp.com",
  projectId: "devwifhat-302cf",
  storageBucket: "devwifhat-302cf.appspot.com",
  messagingSenderId: "59372150925",
  appId: "1:59372150925:web:d9ff5d9bb3ec1a1627c2c4",
  measurementId: "G-B06TL1YCP1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);