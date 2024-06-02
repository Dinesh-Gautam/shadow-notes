import React from "react";
import { useData } from "../../context/DatabaseContext";
import { useInputs } from "../MainInput/InputContext";
import Button from "../MainInput/inputs/elements/Button";
import { serverTimestamp } from "firebase/firestore";
import ShareButton from "./ShareButton";
import { Delete, Edit, Star } from "@mui/icons-material";
import { useMenu } from "../elements/Menu";

function AdditionalButtons({ docId, userData, data }) {
  const { inputsDispatch, setEditMode } = useInputs();
  const { setModalOpen } = useInputs();
  const { updateData_fireStore, updateDocField } = useData();
  const { setMenuOpen } = useMenu();
  const editButtonHandler = () => {
    setEditMode((prev) => {
      return { edit: true, editParameters: docId };
    });
    inputsDispatch({
      type: "cancel",
    });

    inputsDispatch({ type: "edit", payload: userData });
    setMenuOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <button
        onClick={() => {
          updateDocField(docId, { star: !data?.star ?? true });
        }}
      >
        <Star fontSize="small" color={data?.star ? "warning" : "default"} />
        <span>Star</span>
      </button>
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
