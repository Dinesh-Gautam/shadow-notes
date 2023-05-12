import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";

function InputBody() {
  const { inputs } = useInputs();

  return (
    <div className="input_fields">
      {inputs.map((input, index) => (
        <InputField key={input.id} input={input} />
      ))}
    </div>
  );
}

export default InputBody;
