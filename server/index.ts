import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  return app;
}

/* npm install firebase
Luego, inicializa Firebase y comienza a usar los SDK de los productos que quieres utilizar.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVUnd6TT3iDQ2U_fmU6CQenE24EEipKCg",
  authDomain: "interactiva-lab.firebaseapp.com",
  projectId: "interactiva-lab",
  storageBucket: "interactiva-lab.firebasestorage.app",
  messagingSenderId: "153360748776",
  appId: "1:153360748776:web:13e42e4d4de6b4ee24395d",
  measurementId: "G-PFV8E75N6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */