import React, { useEffect, useRef, useState } from "react";
import InputWrapper from "./InputWrapper/InputWrapper";
import { input as InputOption } from "./inputOptions";
function InputField({ input }) {
  return (
    <>
      {input.name === InputOption.heading && (
        <InputWrapper id={input.id} noRemovable>
          <HeadingInputValue placeholder={input.value} />
        </InputWrapper>
      )}

      {input.name === InputOption.title && (
        <InputWrapper id={input.id}>
          <HeadingInputValue placeholder={input.value} />
        </InputWrapper>
      )}
    </>
  );
}

function HeadingInputValue({ placeholder }) {
  return <input placeholder={placeholder} type="text"></input>;
}

export default InputField;
