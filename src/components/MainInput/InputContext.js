import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../context/DatabaseContext";
import { firebase } from "../../firebase";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export function InputContext(props) {
  const initialState = [
    {
      value: "Heading",
      id: uuidv4(),
      name: "heading_input_value",
      inputValue: "",
      attr: { required: true, type: "text" },
      tag: "input",
      isRequired: true,
    },
  ];

  const setinputValue = (state, action) => {
    const { payload } = action;

    switch (action.type) {
      case "normalValue":
        return {
          ...state,
          [payload.id]: {
            value: payload.value,
            additionalValue: "",
          },
        };
      case "listValue":
        return {
          ...state,
          [payload.parentId]: {
            additionalValue: "",
            inputChildren: {
              ...state[payload.parentId]?.inputChildren,
              [payload.childrenId]: { value: payload.value },
            },
          },
        };
      case "delete":
        delete state[action.payload.id];
        return state;
      case "listDelete":
        const list = state[action.payload.parentId]?.inputChildren;
        if (!list) return state;
        delete list[action.payload.childrenId];
        return state;
      case "clear":
        return {};
      default:
        return state;
    }
  };
  const [inputValue, inputValueDispatch] = useReducer(setinputValue, {});

  const addElement = (state, action) => {
    return [
      ...state,
      { ...action.payload.selectedInput, id: action.payload.id },
    ];
  };

  const removeListELement = (state, action) => {
    inputValueDispatch({
      type: "listDelete",
      payload: {
        parentId: action.payload.parentId,
        childrenId: action.payload.id,
      },
    });
    const listRemoved = state.map((input) => {
      return input.id === action.payload.parentId
        ? {
            ...input,
            inner: input.inner.filter((list) => list.id !== action.payload.id),
          }
        : input;
    });
    return [...listRemoved];
  };

  const addListElement = (state, action) => {
    const listAdded = state.map((input) => {
      return input.id === action.payload.id
        ? {
            ...input,
            inner: [
              ...input.inner,
              {
                id: uuidv4(),
                attr: { type: "text" },
                inputValue: "",
                tag: "input",
              },
            ],
          }
        : input;
    });
    return [...listAdded];
  };

  const removeElement = (state, action) => {
    inputValueDispatch({ type: "delete", payload: { id: action.payload.id } });
    return state.filter((input) => input.id !== action.payload.id);
  };

  const setinputs = (state, action) => {
    switch (action.type) {
      case "addElement":
        return addElement(state, action);
      case "removeElement":
        return removeElement(state, action);
      case "addListElement":
        return addListElement(state, action);
      case "removeListElement":
        return removeListELement(state, action);
      case "clear":
        return initialState;
      default:
        return state;
    }
  };

  const [inputs, inputsDispatch] = useReducer(setinputs, initialState);

  const { setData_firestore } = useData();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let finalInputSubmitValues = inputs.map((input) => {
      const { value, name, id, inner } = input;
      const valueOfInput = inputValue[id] || "";

      if (!valueOfInput) {
        return null;
      }
      return inner
        ? {
            name,
            value,
            id,
            inner:
              valueOfInput > 0 &&
              inner.map(
                (list) =>
                  valueOfInput.inputChildren[list.id].value.trim() !== "" &&
                  valueOfInput.inputChildren[list.id].value
              ),
          }
        : valueOfInput &&
            valueOfInput.value.trim() &&
            valueOfInput.value !== "" && {
              name,
              inputValue: valueOfInput.value.trim(),
              value,
              id,
            };
    });
    inputsDispatch({
      type: "clear",
    });
    inputValueDispatch({
      type: "clear",
    });

    setData_firestore({
      delete: false,
      options: false,
      publishDate: firebase.firestore.FieldValue.serverTimestamp(),
      data: finalInputSubmitValues.filter((e) => e !== null),
    });
  };

  const value = {
    inputs,
    inputsDispatch,
    formSubmitHandler,
    inputValue,
    inputValueDispatch,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
