// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Q7cWOMPXNbYWbLeW8MG34-lT4cy_8uE",
  authDomain: "ashley-and-owen.firebaseapp.com",
  projectId: "ashley-and-owen",
  storageBucket: "ashley-and-owen.appspot.com",
  messagingSenderId: "548874887862",
  appId: "1:548874887862:web:527a38019b8d65e2fdbc17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
