import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

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

  function logout() {
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
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
