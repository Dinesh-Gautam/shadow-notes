import {
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";

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
        if (error.code === "auth/credential-already-in-use") {
          alert("Account already linked");
        }
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
    if (currentUser.isAnonymous) {
      const confirm = window.confirm(
        "Are you sure you want to logout?\nYou will loose all of you guest user data!\nLink your account before Signing out."
      );
      if (!confirm) return;
    }
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
