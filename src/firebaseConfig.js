import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  initializeFirestore,
  persistentLocalCache, 
  persistentSingleTabManager 
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyClA0ZVh8NDUfyNzdF1jTODeP2oh1IU30s",
  authDomain: "swiggy-2e426.firebaseapp.com",
  databaseURL: "https://swiggy-2e426-default-rtdb.firebaseio.com",
  projectId: "swiggy-2e426",
  storageBucket: "swiggy-2e426.firebasestorage.app",
  messagingSenderId: "900840475725",
  appId: "1:900840475725:web:2b9bdc9b48ff45a10d2004",
  measurementId: "G-HGQVPJXNE8"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const FirestoreDB = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager(),
  })
});