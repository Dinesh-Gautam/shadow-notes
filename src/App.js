import React, { useState } from "react";
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
  const { currentUser } = useAuth();
  const [userDisplay, setuserDisplay] = useState(false);
  return (
    <main>
      {!currentUser ? (
        <SignWithGoogle />
      ) : (
        <DatabaseContext>
          <InputContext>
            <div className="mainContainer">
              <MainInput />
              <OutputFilter
                userDisplay={userDisplay}
                setuserDisplay={setuserDisplay}
              />
              <Separator type="horizontal-bold" />
              <MainOutput />
            </div>
            {userDisplay && <UserInfo />}
          </InputContext>
        </DatabaseContext>
      )}
    </main>
  );
}

const UserInfo = () => {
  const { logout } = useAuth();
  return (
    <div className="user-info-container">
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

export default App;
