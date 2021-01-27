import React, { useContext } from "react";
import { input_context } from "./InputContext";
import Button from "./inputs/elements/Button";

import InputSelect from "./inputs/InputSelect";

function MainInput() {
  const { inputs } = useContext(input_context);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let finalInputSubmitValues = inputs.map((input) => {
      const { value, inputValue, inner, name } = input;
      return inner
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
    console.log(finalInputSubmitValues);
  };
  return (
    <div className="input_container">
      <form onSubmit={formSubmitHandler}>
        <InputSelect />
        <div className="input_main_button">
          <Button attr={{ type: "submit" }} text="Submit" />
        </div>
      </form>
    </div>
  );
}

export default MainInput;
