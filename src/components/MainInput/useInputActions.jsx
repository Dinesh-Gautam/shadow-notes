import React, { useContext } from "react";
import { inputOptions, input } from "./inputs/inputOptions";
import { useInputs } from "./InputContext";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "../elements/Modal/Modal";
function useInputActions() {
  const {
    inputsDispatch,
    setInputFocusId,
    inputFocusId,
    setEditMode,
    addToHistory,
  } = useInputs();
  const { setModalOpen } = useModal();

  function addInputElement({
    selectedInput,
    id = uuidv4(),
    isFocusable,
    index,
    parentId = null,
  }) {
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id, isFocusable: isFocusable, index, parentId },
    });
    setInputFocusId(id);
    addToHistory();
  }

  function addListElement({
    selectedInput,
    parentId = null,
    id = uuidv4(),
    index,
  }) {
    if (!selectedInput) {
      selectedInput = inputOptions.find((o) => o.name === input.list);
    }
    inputsDispatch({
      type: "addElement",
      payload: { selectedInput, id, parentId, index },
    });
    setInputFocusId(id);
    addToHistory();
  }

  function removeElement({ id }) {
    inputsDispatch({
      type: "removeElement",
      payload: { id },
    });
    addToHistory();
  }

  function changeInputValue({ id, value, valueName, isLabel, isLink }) {
    inputsDispatch({
      type: "changeInputValue",
      payload: { id, value, isLabel, isLink, valueName },
    });

    addToHistory({ useTimeout: true });
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
    setEditMode({ edit: false, editParameters: {} });
    setModalOpen(false);
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
