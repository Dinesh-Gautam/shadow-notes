import React from "react";
import Button from "./elements/Button";
import List from "./elements/List";
import { useInputs } from "../InputContext";
import ColorAdditons from "./elements/ColorAdditons";

const MemoAddions = React.memo(ColorAdditons);

function InputField({ input }) {
  const {
    valueUpdater,
    removeListInput, 
    inputsDispatch,
    // inputValue,
  } = useInputs();
  return (
    <div className="input_box">
      <div className="input_box_header">
        <label className="input_label" htmlFor={input.name}>
          {input.value}
        </label>
        {input.name === "heading_input_value" || (
          <Button
            attr={{
              onClick: () => {
                inputsDispatch({
                  payload: { id: input.id },
                  type: "removeElement",
                });
              },
              "data-id": input.id,
            }}
            text={<i className="fas fa-times"></i>}
          />
        )}
      </div>
      <div className="inputWaper">
        <div className="input">
          {React.createElement(
            input.tag,
            {
              ...input.attr,
              id: input.id,
              name: input.name,
              placeholder: input.value,
              onChange: valueUpdater,
              // value: inputValue[input.id]?.value,
            },
            input.inner &&
              input.inner.map((list, index) => {
                return (
                  <List
                    key={list.id}
                    list={list}
                    index={index}
                    input={input}
                    valueUpdater={valueUpdater}
                    removeListInput={removeListInput}
                    inputsDispatch={inputsDispatch}
                    // listInputValue={inputValue[list.id]?.value}
                  />
                );
              })
          )}

          {input.isOption && input.name === "color_input_value" && (
            <div className="color_addition_inputs" id={input.id}>
              <MemoAddions valueUpdater={valueUpdater} />
            </div>
          )}
        </div>
        {input.name === "image_input_value" && !!input.inputValue && (
          <div className="image_container">
            <img src={input.inputValue} alt={"Not found"} />
          </div>
        )}
        {input.inner && (
          <div className="list_control_btns">
            <Button
              attr={{
                name: input.id,
                onClick: () => {
                  inputsDispatch({
                    payload: { id: input.id },
                    type: "addListElement",
                  });
                },
              }}
              text="Add"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;
