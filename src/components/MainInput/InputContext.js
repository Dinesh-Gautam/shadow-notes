import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../context/DatabaseContext";

import { headingState } from "./inputs/inputOptions";
import { useModal } from "../elements/Modal/Modal";
import { serverTimestamp } from "@firebase/firestore";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();
const initialState = [{ ...headingState, id: headingId }];

const addElement = (state, action) => {
  const { selectedInput, id, parentId, isFocusable, index } = action.payload;
  console.log("focusable", isFocusable);
  console.log("value of index is: ", index);
  if (index === undefined) {
    // return state.addToLast({ ...selectedInput, id, parentId })
    return sortArray([
      ...state,
      {
        ...selectedInput,
        id,
        parentId: parentId || null,
        isFocusable: isFocusable === undefined ? null : isFocusable,
      },
    ]);
  } else {
    return sortArray([
      ...state.slice(0, index + 1),
      {
        ...selectedInput,
        id,
        parentId,
        isFocusable: isFocusable === undefined ? null : isFocusable,
      },
      ...state.slice(index + 1),
    ]);
  }
};

const changeListType = (state, action) => {
  const { id, type } = action.payload;
  return state.map((e) => (e.id === id ? { ...e, type } : e));
};

const changeInputChecked = (state, action) => {
  const { id, checked } = action.payload;
  return state.map((e) =>
    e.id === id ? { ...e, state: { ...e.state, checked } } : e
  );
};

const removeElement = (state, action) => {
  const { id } = action.payload;
  return state.filter((e) => e.id !== id && e.parentId !== id);
};

const changeInputValue = (state, action) => {
  const { id, value, isLabel, isLink } = action.payload;

  if (isLabel) {
    return state.map((e) =>
      e.id === id ? { ...e, state: { ...e.state, labelValue: value } } : e
    );
  }

  if (isLink) {
    const { valueName } = action.payload;
    return state.map((e) =>
      e.id === id ? { ...e, state: { ...e.state, valueName } } : e
    );
  }

  return state.map((e) =>
    e.id === id ? { ...e, state: { ...e.state, value } } : e
  );
};

const onDragEnd = (state, action) => {
  const { sIndex, dIndex, destinationId, sourceId, draggableId } =
    action.payload;

  let newItems = [...state];

  console.log(sourceId, destinationId);
  console.log(draggableId);
  // newItems.splice(dIndex, 0, removed);
  if (sourceId !== destinationId) {
    let removed = newItems.splice(sIndex, 1)[0];

    if (sIndex >= dIndex) {
      newItems.splice(dIndex, 0, removed);
    } else {
      newItems.splice(dIndex - 1, 0, removed);
    }
    newItems = newItems.map((e) =>
      e.id === draggableId ? { ...e, parentId: destinationId } : e
    );
  } else {
    // remove all children
    const selected = newItems.find((e) => e.id === draggableId);
    if (selected.parentId) {
      let removed = newItems.splice(sIndex, 1)[0];
      newItems.splice(dIndex, 0, removed);
    } else {
      const childrenArray = [];
      const nonMoveableLength = newItems.filter((e) => e.nonMoveable).length;
      newItems = newItems
        .map((e) => {
          if (e.parentId) {
            childrenArray.push(e);
            return null;
          } else {
            return e;
          }
        })
        .filter((e) => e);

      console.log(newItems);
      let removed = newItems.splice(sIndex + nonMoveableLength, 1)[0];
      newItems.splice(dIndex + nonMoveableLength, 0, removed);
      newItems.push(childrenArray);
    }
  }

  const flatArray = newItems.flat();

  return sortArray(flatArray);
};

function sortArray(array) {
  const copyArray = [...array];
  const sortedParents = [];
  for (let ele of copyArray) {
    if (ele.nonMoveable) {
      // remove the element and insert it at the start of the array
      const index = copyArray.findIndex((e) => e.id === ele.id);
      copyArray.splice(index, 1);
      copyArray.unshift(ele);
      continue;
    }
    if (ele.parentId) {
      // it is a child
      const splicedChildren = [];
      // get parent index
      const parentIndex = copyArray.findIndex((e) => e.id === ele.parentId);
      // get siblings
      const children = copyArray.filter((e) => e.parentId === ele.parentId);
      for (let child of children) {
        const childIndex = copyArray.findIndex((e) => e.id === child.id);
        splicedChildren.push(copyArray.splice(childIndex, 1)[0]);
      }
      copyArray.splice(parentIndex + 1, 0, ...splicedChildren);
      sortedParents.push(ele.parentId);
    }
  }

  console.log(copyArray);
  return copyArray.flat();
}

const setInputs = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "addElement":
      return addElement(state, action);
    case "removeElement":
      return removeElement(state, action);
    case "changeInputValue":
      return changeInputValue(state, action);
    case "onDragEnd":
      return onDragEnd(state, action);
    case "changeListType":
      return changeListType(state, action);
    case "changeInputChecked":
      return changeInputChecked(state, action);
    case "localStorage":
      return action.payload;
    case "edit":
      return sortArray(action.payload);
    case "cancel":
      return initialState;
    default:
      return state;
  }
};

export function InputContext(props) {
  const saveStateRef = useRef(null);
  const [inputFocusId, setInputFocusId] = useState(null);
  const [inputs, inputsDispatch] = useReducer(setInputs, initialState);
  const { setData_fireStore, updateData_fireStore } = useData();
  const [editMode, setEditMode] = useState({ edit: false, parameters: {} });
  const { modalOpen, setModalOpen } = useModal(false);

  const [history, setHistory] = useState({ undo: [], redo: [] });
  const historyChangeRef = useRef(null);

  function addToHistory({ useTimeout = false } = {}) {
    if (useTimeout) {
      clearInterval(historyChangeRef.current);
      historyChangeRef.current = setTimeout(
        () =>
          setHistory((prev) => ({ undo: [...prev.undo, inputs], redo: [] })),
        500
      );
    } else {
      setHistory((prev) => ({ undo: [...prev.undo, inputs], redo: [] }));
    }
  }

  function undo() {
    if (history.undo.length > 0) {
      const lastStateInHistory = history.undo[history.undo.length - 1];
      setHistory((prev) => ({
        undo: prev.undo.slice(0, prev.undo.length - 1),
        redo: [...prev.redo, inputs],
      }));

      inputsDispatch({ type: "edit", payload: lastStateInHistory });
    }
  }

  function redo() {
    if (history.redo.length > 0) {
      const lastStateInHistory = history.redo[history.redo.length - 1];
      setHistory((prev) => ({
        redo: prev.redo.slice(0, prev.redo.length - 1),
        undo: [...prev.undo, inputs],
      }));

      inputsDispatch({ type: "edit", payload: lastStateInHistory });
    }
  }

  useEffect(() => {
    clearTimeout(saveStateRef.current);
    saveStateRef.current = setTimeout(() => {
      if (hasAnyNotes()) {
        localStorage.setItem("inputs", JSON.stringify(inputs));
        localStorage.setItem("editMode", JSON.stringify(editMode));
      } else {
        localStorage.removeItem("inputs");
        localStorage.removeItem("editMode");
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, editMode]);

  useEffect(() => {
    const LInputs = JSON.parse(localStorage.getItem("inputs"));
    const LeditMode = JSON.parse(localStorage.getItem("editMode"));

    if (LInputs) {
      // alert(
      //   "You have unsaved changes. Save them by clicking Submit or Done button"
      // );

      inputsDispatch({ type: "localStorage", payload: LInputs });
      setEditMode(LeditMode);
    }
  }, []);

  function unloadPage() {
    if (hasAnyNotes()) {
      return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
    }
  }

  useEffect(() => {
    console.log(hasAnyNotes());

    if (window.onbeforeunload === null) {
      window.onbeforeunload = unloadPage;
    }

    return () => {
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  function hasAnyNotes() {
    return inputs.some((e) => e?.state?.value && e?.state?.value !== "");
  }

  const formSubmitHandler = () => {
    const filteredInputs = inputs.filter((e) => e?.state?.value !== "");

    setEditMode({ edit: false, editParameters: {} });
    setModalOpen(false);

    inputsDispatch({
      type: "cancel",
    });

    if (!hasAnyNotes()) {
      return null;
    }

    console.log(filteredInputs);

    if (editMode.edit) {
      const docId = editMode.editParameters;
      updateData_fireStore(docId, {
        data: filteredInputs,
      });
    } else {
      setData_fireStore({
        delete: false,
        options: false,
        publishDate: serverTimestamp(),
        data: filteredInputs,
      });
    }
  };

  const value = {
    inputs,
    inputsDispatch,
    inputFocusId,
    setInputFocusId,
    formSubmitHandler,
    editMode,
    setEditMode,
    hasAnyNotes,
    modalOpen,
    setModalOpen,
    undo,
    redo,
    setHistory,
    history,
    addToHistory,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
