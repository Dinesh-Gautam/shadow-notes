import React, { useState } from "react";
import Separator from "./components/elements/Separator/Separator";
import UndoDelete from "./components/elements/UndoDelete";
import { InputContext, useInputs } from "./components/MainInput/InputContext";
import MainInput from "./components/MainInput/MainInput";
import MainOutput from "./components/MainOutput/MainOutput";
import OutputFilter from "./components/OutputFilters/OutputFilter";
import SignWithGoogle from "./components/signIn/SignWithGoogle";
import UserInfo from "./components/UserInfo";
import { useAuth } from "./context/AuthContext";
import { DatabaseContext } from "./context/DatabaseContext";

import "./styles/styles.scss";
import SideBar from "./components/SideBar";
import Modal, { ModalProvider } from "./components/elements/Modal/Modal";
import { FilterProvider } from "./context/useOutputFilters";

function App() {
  const { currentUser } = useAuth();

  return (
    <main>
      {!currentUser ? (
        <SignWithGoogle />
      ) : (
        <FilterProvider>
          <DatabaseContext>
            <ModalProvider>
              <InputContext>
                <Main />
              </InputContext>
            </ModalProvider>
          </DatabaseContext>
        </FilterProvider>
      )}
    </main>
  );
}

function Main() {
  const [userDisplay, setuserDisplay] = useState(false);
  const { editMode } = useInputs();
  return (
    <>
      <SideBar />
      <div className="mainContainer">
        {/* <MainInput /> */}
        <OutputFilter
          userDisplay={userDisplay}
          setuserDisplay={setuserDisplay}
        />
        <Separator type="horizontal-bold" />
        <MainOutput />
      </div>
      {userDisplay && <UserInfo />}
      <UndoDelete />
      <Modal title={editMode.edit ? "Edit Note" : "Add Note"}>
        <MainInput />
      </Modal>
    </>
  );
}

export default App;
