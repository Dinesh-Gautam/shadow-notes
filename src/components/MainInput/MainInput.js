import React from "react";
import { useInputs } from "./InputContext";
// import Button from "./inputs/elements/Button";

import InputSelect from "./inputs/InputSelect";

function MainInput() {
  const { formSubmitHandler } = useInputs();
  return (
    <div className="input_container">
      <form onSubmit={formSubmitHandler}>
        <InputSelect />
        {/* <div className="input_main_button">
          <Button attr={{ type: "submit" }} text="Submit" />
        </div> */}
      </form>
    </div>
  );
}

export default MainInput;
