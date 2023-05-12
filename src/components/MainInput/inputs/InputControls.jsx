import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "./elements/Button";
import UseSvg from "../../elements/UseSvg";
import { inputOptions, input } from "./inputOptions";
import useInputActions from "../useInputs";

function InputControls() {
  const [inputSelect, setInputSelect] = useState("title");
  const { addInputElement } = useInputActions();
  const inputAdderHandler = () => {
    const uid = uuidv4();

    const selectedInput = inputOptions.find(
      (input) => input.value.toLowerCase() === inputSelect.toLowerCase()
    );

    addInputElement({ id: uid, selectedInput });
  };
  return (
    <div className="input_selection">
      <div className="selection_input_btn">
        <select
          name="inputs_options"
          value={inputSelect}
          onChange={(e) => setInputSelect(e.target.value)}
        >
          {inputOptions.map((inputType) => {
            return (
              <option key={inputType.name} value={inputType.value}>
                {inputType.value}
              </option>
            );
          })}
        </select>
        <Button
          attr={{ onClick: inputAdderHandler }}
          text={<UseSvg type="add" />}
        />
      </div>
    </div>
  );
}

export default InputControls;
