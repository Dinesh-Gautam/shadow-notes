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
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();

const addElement = (state, action) => {
  return [...state, { ...action.payload.selectedInput, id: action.payload.id }];
};

const removeElement = (state, action) => {
  const id = action.payload.id;
  return state.filter((e) => e.id !== id);
};

const setInputs = (state, action) => {
  switch (action.type) {
    case "addElement":
      return addElement(state, action);
    case "removeElement":
      return removeElement(state, action);
    // case "localStorage":
    //   return action.payload;
    // case "clear":
    //   return initialState;
    default:
      return state;
  }
};

export function InputContext(props) {
  const initialState = [
    {
      value: "Heading",
      id: headingId,
      name: "heading_input_value",
      inputValue: "",
      attr: { required: true, type: "text" },
      tag: "input",
      isRequired: true,
    },
  ];

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
