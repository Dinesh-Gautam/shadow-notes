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
import { serverTimestamp } from "firebase/firestore";
import { headingState, input } from "./inputs/inputOptions";
import { reauthenticateWithRedirect } from "firebase/auth";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();
const initialState = [{ ...headingState, id: headingId }];

const addElement = (state, action) => {
  const { selectedInput, id, parentId, isFocusable, index } = action.payload;

  if (index === undefined) {
    // return state.addToLast({ ...selectedInput, id, parentId })
    return sortArray([
      ...state,
      { ...selectedInput, id, parentId, isFocusable },
    ]);
  } else {
    return [
      ...state.slice(0, index),
      { ...selectedInput, id, parentId },
      ...state.slice(index),
    ];
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
      // todo : don't hardcode the heading name, check if the input is moveable or not same for the input body file
      const nonMoveableLength = newItems.filter(
        (e) => e.name === input.heading
      ).length;
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
    // case "localStorage":
    //   return action.payload;
    case "cancel":
      return initialState;
    default:
      return state;
  }
};

export function InputContext(props) {
  const [inputFocusId, setInputFocusId] = useState(null);

  const [inputs, inputsDispatch] = useReducer(setInputs, initialState);

  const value = {
    inputs,
    inputsDispatch,
    inputFocusId,
    setInputFocusId,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
