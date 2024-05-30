import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  linkWithCredential,
  linkWithRedirect,
  linkWithPopup,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  function isGuestUser() {
    return currentUser.isAnonymous;
  }

  function anonymousLogin() {
    signInAnonymously(auth)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  function login() {
    signInWithRedirect(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  function linkAccount() {
    linkWithPopup(auth.currentUser, googleProvider)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
        alert("Guest account successfully linked.", user);
      })
      .catch((error) => {
        console.error(error);
        alert("Account already linked", error);
      });
  }

  function getUserInfo() {
    if (currentUser.isAnonymous) {
      return {
        email: currentUser.email,
        displayName: "Guest",
      };
    }
    return {
      email: currentUser.email,
      displayName:
        currentUser.displayName ||
        currentUser.providerData.find((e) => e.displayName).displayName,
      photoURL:
        currentUser.photoURL ||
        currentUser.providerData.find((e) => e.photoURL).photoURL,
    };
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    anonymousLogin,
    login,
    logout,
    isGuestUser,
    linkAccount,
    getUserInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
