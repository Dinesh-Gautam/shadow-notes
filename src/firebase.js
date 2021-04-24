import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init
const app = firebase.initializeApp({
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   apikey: "AIzaSyB9VgvbdmNX1EmSQtJA69ME2Wqy7svMDYU",
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
  apiKey: "AIzaSyB9VgvbdmNX1EmSQtJA69ME2Wqy7svMDYU",
  authDomain: "list-app-v2-development.firebaseapp.com",
  projectId: "list-app-v2-development",
  storageBucket: "list-app-v2-development.appspot.com",
  messagingSenderId: "528664552621",
  appId: "1:528664552621:web:445439863059ac1dc85224",
});
// firebase auth
export const auth = app.auth();

// firebase firestore database
export const db = app.firestore();

// sign in popup by google
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;
