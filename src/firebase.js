import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// firebase init
const app = initializeApp({
  apiKey: "AIzaSyB9VgvbdmNX1EmSQtJA69ME2Wqy7svMDYU",
  authDomain: "list-app-v2-development.firebaseapp.com",
  projectId: "list-app-v2-development",
  storageBucket: "list-app-v2-development.appspot.com",
  messagingSenderId: "528664552621",
  appId: "1:528664552621:web:445439863059ac1dc85224",
});

// firebase auth
export const auth = getAuth();

// firebase firestore database
export const db = getFirestore(app);

// sign in popup by google
export const googleProvider = new GoogleAuthProvider();
export default app;
