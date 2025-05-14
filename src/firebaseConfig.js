import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB200swaFuJTiF5fDdEser4Fattd7ozupI",
  authDomain: "swiggy-2826f.firebaseapp.com",
  projectId: "swiggy-2826f",
  storageBucket: "swiggy-2826f.firebasestorage.app",
  messagingSenderId: "224422776969",
  appId: "1:224422776969:web:94fa6f165e31ea01afb658"
};

export const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
export const auth = new getAuth();
