import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWD7EqVUkdejhH_dCxecDUghZ7agkJ72k",
  authDomain: "mdpstudioapp.firebaseapp.com",
  projectId: "mdpstudioapp",
  messagingSenderId: "1042728980049",
  appId: "1:1042728980049:web:ca0f95f5afe7df81d43270"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
