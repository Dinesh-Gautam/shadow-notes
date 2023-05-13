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
        <HeadingInputValue
          onChange={(e) => {
            changeInputValue({ id: input.id, value: e.target.value });
          }}
          value={input?.state?.value}
          placeholder={input.value}
        />
      )}

      {input.name === InputOption.title && (
        <InputWrapper input={input}>
          <TitleInputValue
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
      style={{
        marginBottom: "1em",
      }}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    ></input>
  );
}

function TitleInputValue({ value, onChange, placeholder }) {
  return (
    <input
      style={{
        fontSize: 24,
        fontWeight: "bold",
      }}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    ></input>
  );
}

export default InputField;
