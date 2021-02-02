import React, { useState, createContext, useContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../context/DatabaseContext";

export const input_context = createContext();

export function useInputs() {
  return useContext(input_context);
}

export function InputContext(props) {
  const { setData_firestore } = useData();
  const [inputs, setinputs] = useState([
    {
      value: "Heading",
      id: uuidv4(),
      name: "heading_input_value",
      inputValue: "",
      attr: { required: true, type: "text" },
      tag: "input",
      isRequired: true,
    },
  ]);

  const addListInput = (e) => {
    e.preventDefault();
    setinputs((prev) => {
      const listAdded = prev.map((input) => {
        return input.id === e.target.name
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
    });
  };

  const removeElement = (e) => {
    e.preventDefault();
    setinputs((prev) =>
      prev.filter((input) => input.id !== e.target.dataset.id)
    );
  };

  const removeListInput = (e) => {
    e.preventDefault();
    const parentId = e.target.parentElement.parentElement.id;
    setinputs((prev) => {
      const listRemoved = prev.map((input) => {
        return input.id === parentId
          ? {
              ...input,
              inner: input.inner.filter((list) => list.id !== e.target.id),
            }
          : input;
      });
      return [...listRemoved];
    });
  };

  const valueUpdater = useCallback(
    (e) => {
      setinputs((prev) => {
        const updatedinputs = prev.map((inputs) => {
          if (e.target.name === "list_input_value") {
            if (e.target.parentElement.parentElement.id === inputs.id) {
              return {
                ...inputs,
                inner: inputs.inner.map((list) =>
                  list.id === e.target.dataset.id
                    ? { ...list, inputValue: e.target.value }
                    : list
                ),
              };
            } else {
              return inputs;
            }
          } else if (e.target.name === "color_input_value") {
            return inputs.id === e.target.parentElement.parentElement.id ||
              inputs.id === e.target.id
              ? { ...inputs, inputValue: e.target.value }
              : inputs;
          } else {
            return inputs.id === e.target.id
              ? { ...inputs, inputValue: e.target.value }
              : inputs;
          }
        });
        return updatedinputs;
      });
    },
    [setinputs]
  );
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let finalInputSubmitValues = inputs.map((input) => {
      const { value, inputValue, inner, name } = input;
      return inner && inputValue !== ""
        ? {
            value,
            name,
            inner: inner.map((list) => list.inputValue),
          }
        : {
            value,
            inputValue,
            name,
          };
    });
    setinputs([
      {
        value: "Heading",
        id: uuidv4(),
        name: "heading_input_value",
        inputValue: "",
        attr: { required: true, type: "text" },
        tag: "input",
        isRequired: true,
      },
    ]);
    setData_firestore({ options: false, data: finalInputSubmitValues });
  };

  const value = {
    inputs,
    setinputs,
    addListInput,
    removeElement,
    removeListInput,
    valueUpdater,
    formSubmitHandler,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
