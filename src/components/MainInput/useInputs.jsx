import React, { useContext } from "react";
import { inputOptions, input } from "./inputs/inputOptions";
import { useInputs } from "./InputContext";

function useInputActions() {
  const { inputsDispatch } = useInputs();

  function addInputElement(payload) {
    inputsDispatch({
      type: "addElement",
      payload,
    });
  }

  return { addInputElement };
}

export default useInputActions;
