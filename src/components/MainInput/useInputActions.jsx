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

  return { addInputElement, removeElement };
}

export default useInputActions;
