import React, { useContext } from "react";
import { inputOptions, input } from "./inputs/inputOptions";
import { useInputs } from "./InputContext";

function useInputActions() {
  const { inputsDispatch } = useInputs();

  function addInputElement({ selectedInput, id }) {
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id },
    });
  }

  function removeElement({ id }) {
    inputsDispatch({
      type: "removeElement",
      payload: { id },
    });
  }

  function changeInputValue({ id, value, isLabel }) {
    inputsDispatch({
      type: "changeInputValue",
      payload: { id, value, isLabel },
    });
  }

  return { addInputElement, removeElement, changeInputValue };
}

export default useInputActions;
