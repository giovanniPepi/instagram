import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut,
} from "firebase/auth";

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
const provider = new GoogleAuthProvider();

const auth = getAuth();
/* signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }); */

signInWithRedirect(auth, provider);
getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });

// https://firebase.google.com/docs/auth/web/google-signin?authuser=0&hl=en

auth.useDeviceLanguage();

export {
  db,
  analytics,
  storage,
  provider,
  /* signInWithPopup, */ signOut,
  signInWithRedirect,
  getRedirectResult,
};
