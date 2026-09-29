// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7-hVaAX-05H8gNGVjnkTlDiTZENvvr1Y",
  authDomain: "n-muslim.firebaseapp.com",
  databaseURL: "https://n-muslim-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "n-muslim",
  storageBucket: "n-muslim.firebasestorage.app",
  messagingSenderId: "499380773827",
  appId: "1:499380773827:web:e06ed1e06515dfba769376",
  measurementId: "G-94N5VYNYXR"
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);