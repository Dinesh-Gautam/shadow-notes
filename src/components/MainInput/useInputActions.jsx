import React, { useContext } from "react";
import { inputOptions, input } from "./inputs/inputOptions";
import { useInputs } from "./InputContext";
import { v4 as uuidv4 } from "uuid";
function useInputActions() {
  const { inputsDispatch } = useInputs();

  function addInputElement({ selectedInput, id }) {
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id },
    });
  }

  function addListElement({ selectedInput, parentId, id = uuidv4() }) {
    if (!selectedInput) {
      selectedInput = inputOptions.find((o) => o.name === input.list);
    }
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id, parentId },
    });
  }

  function removeElement({ id }) {
    inputsDispatch({
      type: "removeElement",
      payload: { id },
    });
  }

  function changeInputValue({ id, value, valueName, isLabel, isLink }) {
    inputsDispatch({
      type: "changeInputValue",
      payload: { id, value, isLabel, isLink, valueName },
    });
  }

  function onDragEnd(sIndex, dIndex) {
    console.log(sIndex, dIndex);
    if (dIndex === undefined) {
      return;
    }

    inputsDispatch({
      type: "onDragEnd",
      payload: { sIndex, dIndex },
    });
  }

  return {
    addInputElement,
    removeElement,
    changeInputValue,
    addListElement,
    onDragEnd,
  };
}

export default useInputActions;
