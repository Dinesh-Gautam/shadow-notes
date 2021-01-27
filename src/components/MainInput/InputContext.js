import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const input_context = createContext();

export function InputContext(props) {
  const [inputs, setinputs] = useState([
    {
      value: "Heading",
      id: uuidv4(),
      name: "heading_input_value",
      inputValue: "",
      attr: { type: "text" },
      tag: "input",
    },
  ]);
  return (
    <input_context.Provider value={{ inputs, setinputs }}>
      {props.children}
    </input_context.Provider>
  );
}
