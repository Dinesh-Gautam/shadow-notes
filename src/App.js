import React, { useState } from "react";
import Loading from "./components/elements/Loading";
import Separator from "./components/elements/Separator";
import UndoDelete from "./components/elements/UndoDelete";
import { InputContext } from "./components/MainInput/InputContext";
import MainInput from "./components/MainInput/MainInput";
import MainOutput from "./components/MainOutput/MainOutput";
import OutputFilter from "./components/OutputFilters/OutputFilter";
import SignWithGoogle from "./components/signIn/SignWithGoogle";
import UserInfo from "./components/UserInfo";
import { useAuth } from "./context/AuthContext";
import { DatabaseContext, useData } from "./context/DatabaseContext";

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

            <UndoDelete />
          </InputContext>
        </DatabaseContext>
      )}
    </main>
  );
}

export default App;
