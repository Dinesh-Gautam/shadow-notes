import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";

function InputBody() {
  const { inputs } = useInputs();

  return (
    <>
      {inputs.map(
        (input, index) =>
          !input.parentId && <InputField key={input.id} input={input} />
      )}
    </>
  );
}

export default InputBody;
