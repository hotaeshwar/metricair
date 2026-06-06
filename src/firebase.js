import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIdiVStbdZ-njrpy_ip3smEO30CF0k4Nc",
  authDomain: "concrete-c8b1b.firebaseapp.com",
  projectId: "concrete-c8b1b",
  storageBucket: "concrete-c8b1b.firebasestorage.app",
  messagingSenderId: "361457116812",
  appId: "1:361457116812:web:e6bc69f6f7b39ab3f7fda9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
