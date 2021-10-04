import React, { useEffect, useRef } from "react";
import Button from "./elements/Button";
import List from "./elements/List";
import { useInputs } from "../InputContext";
import ColorAdditons from "./elements/ColorAdditons";
import UseSvg from "../../elements/UseSvg";

const MemoAddions = React.memo(ColorAdditons);

function InputField({ input }) {
  const { inputsDispatch, inputValueDispatch, inputValue } = useInputs();

  const labelRef = useRef(null);

  const additionValue = inputValue[input.id]?.additionalValue?.labelValue;

  useEffect(() => {
    const e = labelRef.current;
    e.style.width =
      Math.min(
        (e.value.length + 1) * 8 +
          parseInt(getComputedStyle(e).paddingLeft.replace("px", "")) * 2,
        e.scrollWidth,
        window.innerWidth / 1.2
      ) + "px";
  }, [additionValue]);

  return (
    <div
      className={
        "input_box" +
        (input.name !== "heading_input_value" ? " added_input_box" : "")
      }
    >
      <div className="input_box_header">
        {input.name === "color_input_value" ? (
          <div></div>
        ) : (
          <input
            type="text"
            className="input-label"
            ref={labelRef}
            value={
              inputValue[input.id]?.additionalValue?.labelValue !== undefined
                ? inputValue[input.id]?.additionalValue?.labelValue
                : input.value
            }
            onChange={(e) => {
              inputValueDispatch({
                type: "labelValue",
                payload: { id: input.id, value: e.target.value },
              });
            }}
          />
        )}
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
            text={<UseSvg type="close" />}
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
              onChange: (e) => {
                input.tag === "div" ||
                  inputValueDispatch({
                    type: "normalValue",
                    payload: { id: input.id, value: e.target.value },
                  });
                if (e.target.tagName === "TEXTAREA") {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }
              },
              value: inputValue[input.id]?.value || input.inputValue,
            },
            input.inner &&
              input.inner.map((list, index) => {
                return (
                  <List
                    key={list.id}
                    list={list}
                    index={index}
                    input={input}
                    inputsDispatch={inputsDispatch}
                    inputValueDispatch={inputValueDispatch}
                    listInputValue={
                      inputValue[input.id]?.inputChildren[list.id]?.value || ""
                    }
                  />
                );
              })
          )}

          {input.isOption && input.name === "color_input_value" && (
            <div className="color_addition_inputs" id={input.id}>
              <MemoAddions
                inputValueDispatch={inputValueDispatch}
                parentId={input.id}
              />
            </div>
          )}
        </div>
        {input.name === "image_input_value" && !!inputValue[input.id]?.value && (
          <div className="image_container">
            <img src={inputValue[input.id]?.value} alt={"Not found"} />
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
              text={<UseSvg type="add" />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default InputField;
