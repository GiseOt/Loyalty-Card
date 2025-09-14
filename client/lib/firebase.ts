// Import Firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVUnd6TT3iDQ2U_fmU6CQenE24EEipKCg",
  authDomain: "interactiva-lab.firebaseapp.com",
  projectId: "interactiva-lab",
  storageBucket: "interactiva-lab.appspot.com", // CORREGIDO
  messagingSenderId: "153360748776",
  appId: "1:153360748776:web:13e42e4d4de6b4ee24395d",
  measurementId: "G-PFV8E75N6B",
};

// Inicializa Firebase solo una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
