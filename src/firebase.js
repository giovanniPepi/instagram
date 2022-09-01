import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlUzR1UPwV61pcrmhjpCYXvaVTJKG_6eI",
  authDomain: "notinstagram-f120f.firebaseapp.com",
  projectId: "notinstagram-f120f",
  storageBucket: "notinstagram-f120f.appspot.com",
  messagingSenderId: "996450131456",
  appId: "1:996450131456:web:b6e2ba5d6b1478b07942e5",
  measurementId: "G-PZ3QT67MGT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, analytics, storage };
