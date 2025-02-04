import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import '../index.css';

const firebaseConfig = {
  apiKey: "AIzaSyCY3DqPX0uyC3_rqBTay9t0R0yUK5lIrDc",
  authDomain: "sneakvault-559a9.firebaseapp.com",
  databaseURL: "https://sneakvault-559a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sneakvault-559a9",
  storageBucket: "sneakvault-559a9.firebasestorage.app",
  messagingSenderId: "776046331965",
  appId: "1:776046331965:web:59357401a30eefea43c254"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

/*

export const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering with email and password", error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in with email and password");
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};*/