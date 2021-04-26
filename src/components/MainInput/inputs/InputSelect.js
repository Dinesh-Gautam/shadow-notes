import React, { useContext, useState } from "react";
import { input_context } from "../InputContext";
import Button from "./elements/Button";
import InputField from "./InputField";
import { inputOptions } from "./inputOptions";
import { v4 as uuidv4 } from "uuid";

function InputSelect() {
  const [inputSelect, setinputSelect] = useState("title");
  const { inputs, inputsDispatch } = useContext(input_context);

  const inputAdderHandler = () => {
    const uid = uuidv4();

    const selectedInput = inputOptions.find(
      (input) => input.value.toLowerCase() === inputSelect.toLowerCase()
    );
    // console.log(uid);

    inputsDispatch({ type: "addElement", payload: { id: uid, selectedInput } });

    // setinputs((prev) => {
    //   return [...prev, { ...selectedInput, id: uid }];
    // });
  };

  return (
    <div className="input_select_container">
      <div className="input_fields">
        {inputs.map((input) => {
          return <InputField key={input.id} input={input} />;
        })}
      </div>

      <div className="input_selection">
        <select
          value={inputSelect}
          onChange={(e) => setinputSelect(e.target.value)}
          name="inputs_options"
        >
          {inputOptions.map((inputType) => (
            <option key={inputType.name} value={inputType.value}>
              {inputType.value}
            </option>
          ))}
        </select>
        <Button attr={{ onClick: inputAdderHandler }} text="Add" />
      </div>
    </div>
  );
}

export default InputSelect;
