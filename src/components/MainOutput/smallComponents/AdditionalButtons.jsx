import React from "react";
import { useData } from "../../../context/DatabaseContext";
import UseSvg from "../../elements/UseSvg";
import { headingId, useInputs } from "../../MainInput/InputContext";
import { inputOptions } from "../../MainInput/inputs/inputOptions";
import { v4 as uuidv4 } from "uuid";
import Button from "../../MainInput/inputs/elements/Button";
import Separator from "../../elements/Separator";
import { serverTimestamp } from "firebase/firestore";

function AdditionalButtons({ docId, userData }) {
  const { inputsDispatch, inputValueDispatch, setisEditMode } = useInputs();

  const { updateData_firestore } = useData();

  const editButtonHandler = () => {
    setisEditMode((prev) => {
      return { edit: true, editParameters: docId };
    });
    inputsDispatch({
      type: "clear",
    });
    inputValueDispatch({
      type: "clear",
    });

    userData.forEach((e) => {
      const { inputValue, name, id, additionalValue } = e;

      const selectedInput = inputOptions.find((input) => input.name === name);

      const firsInputId = uuidv4();

      if (selectedInput) {
        switch (name) {
          case "list_input_value":
            inputsDispatch({
              type: "addElement",
              payload: {
                id: id,
                selectedInput: {
                  ...selectedInput,
                  inner: [{ ...selectedInput.inner[0], id: firsInputId }],
                },
              },
            });
            inputValueDispatch({
              type: "labelValue",
              payload: { id: id, value: additionalValue?.labelValue },
            });
            e.inner.forEach((listInputValue, index) => {
              const uid = uuidv4();

              if (index < 1) {
                inputValueDispatch({
                  type: "listValue",
                  payload: {
                    parentId: id,
                    childrenId: firsInputId,
                    value: listInputValue,
                  },
                });
              } else {
                inputsDispatch({
                  payload: { id, listId: uid },
                  type: "addListElement",
                });
                inputValueDispatch({
                  type: "listValue",
                  payload: {
                    parentId: id,
                    childrenId: uid,
                    value: listInputValue,
                  },
                });
              }
            });
            break;

          default:
            inputsDispatch({
              type: "addElement",
              payload: { id: id, selectedInput },
            });
            inputValueDispatch({
              type: "normalValue",
              payload: { id: id, value: inputValue },
            });
            inputValueDispatch({
              type: "labelValue",
              payload: { id: id, value: additionalValue?.labelValue },
            });
            break;
        }
      } else {
        if (name === "heading_input_value") {
          inputValueDispatch({
            type: "normalValue",
            payload: { id: headingId, value: inputValue },
          });
        }
      }
    });
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
          updateData_firestore(docId, data);
        }}
      >
        <UseSvg type="close" />
      </button>
    </div>
  );
}

export default AdditionalButtons;
