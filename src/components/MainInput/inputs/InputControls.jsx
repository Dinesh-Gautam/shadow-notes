import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "./elements/Button";
import UseSvg from "../../elements/UseSvg";
import { inputOptions, input } from "./inputOptions";
import { input_context } from "../InputContext";

function InputControls() {
  const [inputSelect, setinputSelect] = useState("title");
  const { inputsDispatch } = useContext(input_context);

  const inputAdderHandler = () => {
    const uid = uuidv4();

    const selectedInput = inputOptions.find(
      (input) => input.value.toLowerCase() === inputSelect.toLowerCase()
    );

    inputsDispatch({ type: "addElement", payload: { id: uid, selectedInput } });

    // if (selectedInput.name === "color_input_value") {
    //   inputValueDispatch({
    //     type: "normalValue",
    //     payload: { id: uid, value: selectedInput.inputValue },
    //   });
    // }
  };
  return (
    <div className="input_selection">
      <div className="selection_input_btn">
        <select
          name="inputs_options"
          value={inputSelect}
          onChange={(e) => setinputSelect(e.target.value)}
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
