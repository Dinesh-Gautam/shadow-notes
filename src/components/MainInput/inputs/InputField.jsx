import React, { useEffect, useRef, useState } from "react";
import InputWrapper from "./InputWrapper/InputWrapper";
import { input as InputOption } from "./inputOptions";
import useInputActions from "../useInputActions";
function InputField({ input }) {
  const { changeInputValue } = useInputActions();
  console.log(input);
  return (
    <>
      {input.name === InputOption.heading && (
        <InputWrapper id={input.id} noRemovable>
          <HeadingInputValue
            onChange={(e) => {
              changeInputValue({ id: input.id, value: e.target.value });
            }}
            value={input?.state?.value}
            placeholder={input.value}
          />
        </InputWrapper>
      )}

      {input.name === InputOption.title && (
        <InputWrapper id={input.id}>
          <HeadingInputValue
            onChange={(e) => {
              changeInputValue({ id: input.id, value: e.target.value });
            }}
            value={input?.state?.value}
            placeholder={input.value}
          />
        </InputWrapper>
      )}
    </>
  );
}

function HeadingInputValue({ value, onChange, placeholder }) {
  return (
    <input
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    ></input>
  );
}

export default InputField;
