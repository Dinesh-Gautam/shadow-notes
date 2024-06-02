import { useAutoAnimate } from "@formkit/auto-animate/react";
import { InputContext, useInputs } from "./components/MainInput/InputContext";
import MainInput, { MainInputControls } from "./components/MainInput/MainInput";
import MainOutput from "./components/MainOutput/MainOutput";
import OutputFilter from "./components/OutputFilters/OutputFilters";
import { FilterProvider } from "./components/OutputFilters/filterContext";
import SideBar from "./components/SideBar";
import Modal, { ModalProvider } from "./components/elements/Modal";
import Separator from "./components/elements/Separator";
import UndoDelete from "./components/elements/UndoDelete";
import { DatabaseContext, useData } from "./context/DatabaseContext";

export default function LazyMain() {
  return (
    <FilterProvider>
      <DatabaseContext>
        <ModalProvider>
          <InputContext>
            <Main />
          </InputContext>
        </ModalProvider>
      </DatabaseContext>
    </FilterProvider>
  );
}
function Main() {
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
            <OutputFilter />
            <Separator type="horizontal-bold" />
          </>
        )}
        <MainOutput />
      </div>
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
