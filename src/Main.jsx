import React, { useState } from "react";
import Separator from "./components/elements/Separator/Separator";
import UndoDelete from "./components/elements/UndoDelete";
import { InputContext, useInputs } from "./components/MainInput/InputContext";
import MainInput, { MainInputControls } from "./components/MainInput/MainInput";
import MainOutput from "./components/MainOutput/MainOutput";
import OutputFilter from "./components/OutputFilters/OutputFilter";
import UserInfo from "./components/UserInfo";
import { DatabaseContext, useData } from "./context/DatabaseContext";
import SideBar from "./components/SideBar";
import Modal, { ModalProvider } from "./components/elements/Modal/Modal";
import { FilterProvider } from "./context/useOutputFilters";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { LazyMotion } from "framer-motion";

const animationFeatures = () =>
  import("./animations.js").then((res) => res.default);

export default function LazyMain() {
  // const Main = lazy(() => import("./components/Main"));
  return (
    <FilterProvider>
      <DatabaseContext>
        <ModalProvider>
          <InputContext>
            <LazyMotion features={animationFeatures}>
              <Main />
            </LazyMotion>
          </InputContext>
        </ModalProvider>
      </DatabaseContext>
    </FilterProvider>
  );
}
function Main() {
  const [userDisplay, setuserDisplay] = useState(false);
  const { editMode } = useInputs();
  const { userData } = useData();

  const [animationParent] = useAutoAnimate();

  return (
    <>
      <SideBar />
      <div ref={animationParent} className="mainContainer">
        {/* <MainInput /> */}
        {userData?.length > 0 && (
          <>
            <OutputFilter
              userDisplay={userDisplay}
              setuserDisplay={setuserDisplay}
            />
            <Separator type="horizontal-bold" />
          </>
        )}
        <MainOutput />
      </div>
      {userDisplay && <UserInfo />}
      <UndoDelete />
      <Modal
        title={editMode.edit ? "Edit Note" : "Add Note"}
        header={<MainInputControls />}
      >
        <MainInput />
      </Modal>
    </>
  );
}
