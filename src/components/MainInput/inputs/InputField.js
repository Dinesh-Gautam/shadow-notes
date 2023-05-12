import React, { useEffect, useRef, useState } from "react";
import InputWrapper from "./InputWrapper/InputWrapper";

function InputField({ input }) {
  return (
    <InputWrapper>
      <div>
        <h1>{input.value}</h1>
      </div>
    </InputWrapper>
  );
}

export default InputField;
