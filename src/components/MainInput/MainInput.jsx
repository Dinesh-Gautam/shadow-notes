import React from "react";
import { useInputs } from "./InputContext";
import InputBody from "./inputs/InputBody";
import InputControls from "./inputs/InputControls";
// import Button from "./inputs/elements/Button";

function MainInput() {
  const { formSubmitHandler } = useInputs();
  return (
    <div className="input_container">
      <form
      //  onSubmit={formSubmitHandler}
      >
        <InputBody />
        <InputControls />
      </form>
    </div>
  );
}

export default MainInput;
