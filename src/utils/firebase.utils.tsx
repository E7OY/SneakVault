import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase } from "firebase/database";
import '../index.css';

const firebaseConfig = {
  apiKey: "AIzaSyCY3DqPX0uyC3_rqBTay9t0R0yUK5lIrDc",
  authDomain: "sneakvault-559a9.firebaseapp.com",
  databaseURL: "https://sneakvault-559a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sneakvault-559a9",
  storageBucket: "sneakvault-559a9.appspot.com",
  messagingSenderId: "776046331965",
  appId: "1:776046331965:web:59357401a30eefea43c254"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
