const { initializeApp } = await import("firebase/app");
const { getFirestore } = await import("firebase/firestore");
const { getAuth, GoogleAuthProvider } = await import("firebase/auth");

// firebase init
const app = initializeApp(
  process.env.NODE_ENV === "production"
    ? {
        apiKey: process.env.REACT_APP_PROD_API_KEY,
        authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
        projectId: process.env.REACT_APP_PROD_PROJECT_ID,
        storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_PROD_APP_ID,
        measurementId: process.env.REACT_APP_PROD_MEASUREMENT_ID,
      }
    : {
        apiKey: process.env.REACT_APP_DEV_API_KEY,
        authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
        projectId: process.env.REACT_APP_DEV_PROJECT_ID,
        storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_DEV_APP_ID,
        measurementId: process.env.REACT_APP_PROD_MEASUREMENT_ID,
      }
);

// firebase auth
export const auth = getAuth();

// firebase firestore database
export const db = getFirestore(app);

// sign in popup by google
export const googleProvider = new GoogleAuthProvider();
export default app;
