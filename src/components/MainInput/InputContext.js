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
import { headingState } from "./inputs/inputOptions";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();

const addElement = (state, action) => {
  const { selectedInput, id, parentId } = action.payload;

  return [...state, { ...selectedInput, id, parentId }];
};

const removeElement = (state, action) => {
  const id = action.payload.id;
  return state.filter((e) => e.id !== id);
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
  const { sIndex, dIndex } = action.payload;

  const newItems = [...state];
  const [removed] = newItems.splice(sIndex, 1);
  newItems.splice(dIndex, 0, removed);
  return newItems;
};

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
    // case "localStorage":
    //   return action.payload;
    // case "clear":
    //   return initialState;
    default:
      return state;
  }
};

export function InputContext(props) {
  const initialState = [{ ...headingState, id: uuidv4() }];

  const [inputs, inputsDispatch] = useReducer(setInputs, initialState);

  const value = {
    inputs,
    inputsDispatch,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
