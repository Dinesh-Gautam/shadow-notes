import React, {
  createContext,
  useContext,
  useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";
// import { useData } from "../../context/DatabaseContext";

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
      default:
        return state;
    }
  };

  const addElement = (state, action) => {
    return [
      ...state,
      { ...action.payload.selectedInput, id: action.payload.id },
    ];
  };

  const removeListELement = (state, action) => {
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
    return state.filter((input) => input.id !== action.payload.id);
  };
  const [inputs, inputsDispatch] = useReducer(setinputs, initialState);

  // const headingInput = {
  //   id : uuidv4(),
  //   state : [
  //     {
  //       value: "Heading",
  //       id: uuidv4(),
  //       name: "heading_input_value",
  //       inputValue: "",
  //       attr: { required: true, type: "text" },
  //       tag: "input",
  //       isRequired: true,
  //     },
  //   ],
  //   valueState : {[this.id] : {value: "" , additionalValue : ""}}
  // }

  // const { setData_firestore } = useData();

  // const addListInput = (e) => {
  //   e.preventDefault();
  //   setinputs((prev) => {
  //     const listAdded = prev.map((input) => {
  //       return input.id === e.target.name
  //         ? {
  //             ...input,
  //             inner: [
  //               ...input.inner,
  //               {
  //                 id: uuidv4(),
  //                 attr: { type: "text" },
  //                 inputValue: "",
  //                 tag: "input",
  //               },
  //             ],
  //           }
  //         : input;
  //     });
  //     return [...listAdded];
  //   });
  // };

  // const removeElement = () => {
  // e.preventDefault();
  // setinputs((prev) =>
  //   prev.filter((input) => input.id !== e.target.dataset.id)
  // );

  // setinputValue((prev) => {
  //   delete prev[e.target.dataset.id];
  //   return prev;
  // });
  // };

  // const removeListInput = (e) => {
  // e.preventDefault();
  // const parentId = e.target.parentElement.parentElement.id;
  // setinputs((prev) => {
  //   const listRemoved = prev.map((input) => {
  //     return input.id === parentId
  //       ? {
  //           ...input,
  //           inner: input.inner.filter((list) => list.id !== e.target.id),
  //         }
  //       : input;
  //   });
  //   return [...listRemoved];
  // });
  // setinputValue((prev) => {
  //   delete prev[e.target.id];
  //   return prev;
  // });
  // };

  // const valueUpdater = useCallback((e) => {
  // setinputValue((prev) => {
  //   return {
  //     ...prev,
  //     [e.target.id]: { ...prev[e.target.id], value: e.target.value },
  //   };
  // });
  // }, []);

  // const formSubmitHandler = (e) => {
  //   e.preventDefault();
  //   // let finalInputSubmitValues = inputs.map((input) => {
  //   //   const { value, inputValue, name, id, inner } = input;
  //   //   return inner
  //   //     ? {
  //   //         name,
  //   //         value,
  //   //         id,
  //   //         inner: inner.map(
  //   //           (list) => list.inputValue.trim() !== "" && list.inputValue
  //   //         ),
  //   //       }
  //   //     : inputValue.trim() &&
  //   //         inputValue !== "" && {
  //   //           name,
  //   //           inputValue: inputValue.trim(),
  //   //           value,
  //   //           id,
  //   //         };
  //   // });
  //   // setinputs([
  //   //   {
  //   //     value: "Heading",
  //   //     id: uuidv4(),
  //   //     name: "heading_input_value",
  //   //     inputValue: "",
  //   //     attr: { required: true, type: "text" },
  //   //     tag: "input",
  //   //     isRequired: true,
  //   //   },
  //   // ]);
  //   // setData_firestore({ options: false, data: finalInputSubmitValues });
  // };

  const value = {
    inputs,
    // setinputs,
    inputsDispatch,
    // addListInput,
    // removeElement,
    // removeListInput,
    // valueUpdater,
    // formSubmitHandler,
    // inputValue,
    // setinputValue,
  };
  return (
    <input_context.Provider value={value}>
      {props.children}
    </input_context.Provider>
  );
}
