// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTsAXzRk5l1eq4b6ioZd3A-6QCxIGYjCA",
  authDomain: "journal-app-88836.firebaseapp.com",
  projectId: "journal-app-88836",
  storageBucket: "journal-app-88836.appspot.com",
  messagingSenderId: "433721090198",
  appId: "1:433721090198:web:2e29ca38e797efd72c22b7",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
