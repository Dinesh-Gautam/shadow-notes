import React from "react";
import { useData } from "../../../context/DatabaseContext";
import UseSvg from "../../elements/UseSvg";
import { headingId, useInputs } from "../../MainInput/InputContext";
import { inputOptions } from "../../MainInput/inputs/inputOptions";
import { v4 as uuidv4 } from "uuid";
import Button from "../../MainInput/inputs/elements/Button";
import Separator from "../../elements/Separator/Separator";
import { serverTimestamp } from "firebase/firestore";
import ShareButton from "./ShareButton";
import { Delete, Edit } from "@mui/icons-material";

function AdditionalButtons({ docId, userData, data }) {
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
    <>
      <ShareButton docId={docId} data={data} />
      <Button
        attr={{
          onClick: editButtonHandler,
        }}
        text={
          <>
            <Edit fontSize="sm" /> <span>Edit</span>
          </>
        }
      />

      <button
        onClick={() => {
          const data = {
            delete: true,
            deletedOn: serverTimestamp(),
          };
          updateData_fireStore(docId, data);
        }}
      >
        <Delete fontSize="sm" />
        <span>Trash</span>
      </button>
    </>
  );
}

export default AdditionalButtons;
