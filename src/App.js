import React from "react";
import Loading from "./components/elements/Loading";
import Separator from "./components/elements/Separator";
import { InputContext } from "./components/MainInput/InputContext";
import MainInput from "./components/MainInput/MainInput";
import MainOutput from "./components/MainOutput/MainOutput";
import OutputFilter from "./components/OutputFilters/OutputFilter";
import SignWithGoogle from "./components/signIn/SignWithGoogle";
import { useAuth } from "./context/AuthContext";
import { DatabaseContext } from "./context/DatabaseContext";

import "./styles/styles.css";
// import "./styles/MainOutput/mainOutput.css";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <main>
      {!currentUser ? (
        <SignWithGoogle />
      ) : (
        <DatabaseContext>
          <InputContext>
            <div className="mainContainer">
              <MainInput />
              <OutputFilter />
              <Separator type="horizontal-bold" />
              <MainOutput />
            </div>
          </InputContext>
          <div className="user-additionals-container">
            <button onClick={logout}>Sign Out</button>
          </div>
        </DatabaseContext>
      )}
    </main>
  );
}

export default App;
