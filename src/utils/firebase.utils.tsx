import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY3DqPX0uyC3_rqBTay9t0R0yUK5lIrDc",
  authDomain: "sneakvault-559a9.firebaseapp.com",
  databaseURL: "https://sneakvault-559a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sneakvault-559a9",
  storageBucket: "sneakvault-559a9.firebasestorage.app",
  messagingSenderId: "776046331965",
  appId: "1:776046331965:web:59357401a30eefea43c254"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
/*
provider.setCustomParameters({   
     prompt : "consent"
});
*/

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
