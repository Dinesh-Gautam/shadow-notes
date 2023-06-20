import React from "react";
import { useData } from "../../../context/DatabaseContext";
import UseSvg from "../../elements/UseSvg";
import { headingId, useInputs } from "../../MainInput/InputContext";
import { inputOptions } from "../../MainInput/inputs/inputOptions";
import { v4 as uuidv4 } from "uuid";
import Button from "../../MainInput/inputs/elements/Button";
import Separator from "../../elements/Separator/Separator";
import { serverTimestamp } from "firebase/firestore";

function AdditionalButtons({ docId, userData }) {
  const { inputsDispatch, setEditMode } = useInputs();
  const { setModalOpen } = useInputs();

  const { updateData_fireStore } = useData();

  const editButtonHandler = () => {
    setEditMode((prev) => {
      return { edit: true, editParameters: docId };
    });
    inputsDispatch({
      type: "cancel",
    });

    console.log(userData);
    inputsDispatch({ type: "edit", payload: userData });
    setModalOpen(true);
  };

  return (
    <div className="dropdown_extraButtons">
      <Button
        attr={{
          onClick: editButtonHandler,
        }}
        text={<UseSvg type="edit" />}
      />
      <Separator type="vertical-medium" />
      <button
        onClick={() => {
          const data = {
            delete: true,
            deletedOn: serverTimestamp(),
          };
          updateData_fireStore(docId, data);
        }}
      >
        <UseSvg type="close" />
      </button>
    </div>
  );
}

export default AdditionalButtons;
