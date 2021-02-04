import React from "react";
import { InputContext } from "./components/MainInput/InputContext";
import MainInput from "./components/MainInput/MainInput";
import MainOutput from "./components/MainOutput/MainOutput";
import SignWithGoogle from "./components/signIn/SignWithGoogle";
import { useAuth } from "./context/AuthContext";

import "./styles/app.css";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <main>
      {!currentUser ? (
        <SignWithGoogle />
      ) : (
        <>
          <InputContext>
            <MainInput />
            <MainOutput />
          </InputContext>
          <button onClick={logout}>Sign Out</button>
        </>
      )}
    </main>
  );
}

export default App;
