import React, { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../context/DatabaseContext";
import { serverTimestamp } from "firebase/firestore";
export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export const headingId = uuidv4();

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

  const setinputValue = (state, action) => {
    const { payload } = action;

    switch (action.type) {
      case "normalValue":
        return {
          ...state,
          [payload.id]: {
            value: payload.value,
            additionalValue: { ...state[payload.id]?.additionalValue },
          },
        };
      case "listValue":
        return {
          ...state,
          [payload.parentId]: {
            additionalValue: { ...state[payload.parentId]?.additionalValue },
            inputChildren: {
              ...state[payload.parentId]?.inputChildren,
              [payload.childrenId]: { value: payload.value },
            },
          },
        };
      case "labelValue":
        return {
          ...state,
          [payload.id]: {
            ...state[payload.id],
            additionalValue: {
              ...state[payload.id]?.additionalValue,
              labelValue: payload.value,
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
                id: action.payload.listId || uuidv4(),
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

  const listReOrder = (state, action) => {
    const reOrderedList = state.map((input) => {
      if (input.inner && input.id === action.payload.id) {
        const refListArr = [...input.inner];

        const [pickedListInput] = refListArr.splice(action.payload.sIndex, 1);

        refListArr.splice(action.payload.dIndex, 0, pickedListInput);

        return {
          ...input,
          inner: refListArr,
        };
      } else {
        return input;
      }
    });

    return reOrderedList;
  };

  const inputReOrder = (state, action) => {
    const refInputArr = [...state];

    const [pickedInput] = refInputArr.splice(action.payload.sIndex, 1);

    refInputArr.splice(action.payload.dIndex, 0, pickedInput);

    return refInputArr;
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
      case "listReOrder":
        return listReOrder(state, action);
      case "inputReOrder":
        return inputReOrder(state, action);
      case "clear":
        return initialState;
      default:
        return state;
    }
  };

  //////////

  const [inputs, inputsDispatch] = useReducer(setinputs, initialState);

  const { setData_firestore, updateData_firestore } = useData();

  const [isEditMode, setisEditMode] = useState({ edit: false, parameters: {} });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let finalInputSubmitValues = inputs.map((input) => {
      const { value, name, id, inner } = input;
      const valueOfInput = inputValue[id] || "";
      if (!valueOfInput) {
        return null;
      }
      const additionalValue = inputValue[id].additionalValue;
      return inner
        ? {
            name,
            value,
            id,
            additionalValue: {
              labelValue:
                additionalValue.labelValue === undefined
                  ? null
                  : additionalValue.labelValue,
            },
            inner:
              valueOfInput &&
              inner
                .map((list) =>
                  valueOfInput?.inputChildren?.[list?.id]?.value === undefined
                    ? null
                    : valueOfInput?.inputChildren?.[list.id]?.value?.trim() !==
                        "" && valueOfInput?.inputChildren?.[list.id]?.value
                )
                .filter((e) => e),
          }
        : valueOfInput && {
            name,
            inputValue:
              valueOfInput?.value &&
              valueOfInput?.value !== "" &&
              valueOfInput?.value === undefined &&
              valueOfInput.value.trim()
                ? null
                : valueOfInput.value || null,
            value,
            additionalValue: {
              labelValue:
                additionalValue.labelValue === undefined
                  ? null
                  : additionalValue.labelValue,
            },
            id,
          };
    });
    // console.log(finalInputSubmitValues);

    setisEditMode({ edit: false, editParameters: {} });
    inputsDispatch({
      type: "clear",
    });
    inputValueDispatch({
      type: "clear",
    });

    if (isEditMode.edit) {
      const docId = isEditMode.editParameters;
      updateData_firestore(docId, {
        data: finalInputSubmitValues.filter((e) => e !== null),
      });
    } else {
      setData_firestore({
        delete: false,
        options: false,
        publishDate: serverTimestamp(),
        data: finalInputSubmitValues.filter((e) => e !== null),
      });
    }
  };

  const value = {
    inputs,
    inputsDispatch,
    formSubmitHandler,
    inputValue,
    inputValueDispatch,
    isEditMode,
    setisEditMode,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
