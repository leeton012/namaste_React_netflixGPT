// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAK5fWaPG8EZFsLeUPnUXP6IXtqxXQPQvg",
    authDomain: "netflix-gpt-9bcaa.firebaseapp.com",
    projectId: "netflix-gpt-9bcaa",
    storageBucket: "netflix-gpt-9bcaa.appspot.com",
    messagingSenderId: "391837608032",
    appId: "1:391837608032:web:839e0ca4f54a80c771fb05",
    measurementId: "G-6NPBKZWDXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();