// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your config (keep as is)
const firebaseConfig = {
  apiKey: "AIzaSyA1R3saDyhWna4vve-7pVhuLgjj4f52J64",
  authDomain: "getyourstay-1dbaa.firebaseapp.com",
  projectId: "getyourstay-1dbaa",
  storageBucket: "getyourstay-1dbaa.firebasestorage.app",
  messagingSenderId: "106829021323",
  appId: "1:106829021323:web:087030eb6c003a099a948e",
  measurementId: "G-FSS3RLRKW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();