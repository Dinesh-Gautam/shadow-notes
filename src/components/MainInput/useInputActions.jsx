import React, { useContext } from "react";
import { inputOptions, input } from "./inputs/inputOptions";
import { useInputs } from "./InputContext";
import { v4 as uuidv4 } from "uuid";
function useInputActions() {
  const { inputsDispatch, setInputFocusId, inputFocusId } = useInputs();

  function addInputElement({ selectedInput, id, isFocusable }) {
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id, isFocusable },
    });
    setInputFocusId(id);
  }

  function addListElement({ selectedInput, parentId, id = uuidv4(), index }) {
    if (!selectedInput) {
      selectedInput = inputOptions.find((o) => o.name === input.list);
    }
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id, parentId, index },
    });
    setInputFocusId(id);
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

  function changeInputChecked({ id, checked }) {
    inputsDispatch({
      type: "changeInputChecked",
      payload: { id, checked },
    });
  }

  function changeListType({ id, type }) {
    inputsDispatch({
      type: "changeListType",
      payload: { id, type },
    });
  }

  function inputFormCancel() {
    inputsDispatch({
      type: "cancel",
    });
  }

  function onDragEnd(result) {
    console.log(result);
    const sIndex = result?.source?.index;
    const dIndex = result?.destination?.index;
    const destinationId = result?.destination?.droppableId;
    const sourceId = result?.source?.droppableId;
    const draggableId = result?.draggableId;
    console.log(sIndex, dIndex);

    if (dIndex === undefined) {
      return;
    }

    inputsDispatch({
      type: "onDragEnd",
      payload: { sIndex, dIndex, destinationId, sourceId, draggableId },
    });
  }

  return {
    addInputElement,
    removeElement,
    changeInputValue,
    addListElement,
    onDragEnd,
    inputFocusId,
    changeListType,
    changeInputChecked,
    inputFormCancel,
  };
}

export default useInputActions;
