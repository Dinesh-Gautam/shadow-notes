import React, { useEffect, useRef, useState } from "react";
import Button from "./elements/Button";
import List from "./elements/List";
import { useInputs } from "../InputContext";
import ColorAdditons from "./elements/ColorAdditons";
import UseSvg from "../../elements/UseSvg";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const MemoAddions = React.memo(ColorAdditons);

function InputField({ input }) {
  const { inputsDispatch, inputValueDispatch, inputValue } = useInputs();

  const [imageLink, setimageLink] = useState("");

  const labelRef = useRef(null);
  const textAreaRef = useRef(null);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    // inputValueDispatch({
    //   type: "listReOrder",
    //   payload: {
    //     id: input.id,
    //     sIndex: result.source.index,
    //     dIndex: result.destination.index,
    //   },
    // });

    inputsDispatch({
      payload: {
        id: input.id,
        sIndex: result.source.index,
        dIndex: result.destination.index,
      },
      type: "listReOrder",
    });
  }

  const additionValue = inputValue[input.id]?.additionalValue?.labelValue;
  const inputValueTxt = inputValue[input.id]?.value;
  useEffect(() => {
    const e = labelRef.current;
    if (e && e.className === "input-label") {
      e.style.width =
        Math.min(
          (e.value.length + 1) * 8 +
            parseInt(getComputedStyle(e).paddingLeft.replace("px", "")) * 2,
          e.scrollWidth,
          window.innerWidth / 1.2
        ) + "px";
    }
  }, [additionValue]);

  useEffect(() => {
    let url;
    if (input.name === "image_input_value") {
      try {
        url = new URL(inputValueTxt);
        setimageLink(url);
        console.log(url);
      } catch {
        setimageLink("");
      }
    }

    if (input.name === "Pragraph_input_value") {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueTxt]);

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
        ) : input.name === "heading_input_value" ? (
          <label>{input.value}</label>
        ) : (
          <input
            type="text"
            className="input-label"
            ref={labelRef}
            value={
              inputValue[input.id]?.additionalValue?.labelValue !== undefined &&
              inputValue[input.id]?.additionalValue?.labelValue !== null
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
              ref: textAreaRef,
              onChange: (e) => {
                input.tag === "div" ||
                  inputValueDispatch({
                    type: "normalValue",
                    payload: { id: input.id, value: e.target.value },
                  });
              },
              value: inputValue[input.id]?.value || input.inputValue,
            },

            input.inner && (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="list-inner">
                  {(provided) => (
                    <div
                      className="list-inner"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {input.inner.map((list, index) => {
                        return (
                          <List
                            key={list.id}
                            list={list}
                            index={index}
                            input={input}
                            inputsDispatch={inputsDispatch}
                            inputValueDispatch={inputValueDispatch}
                            listInputValue={
                              inputValue[input.id]?.inputChildren?.[list?.id]
                                ?.value || ""
                            }
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )
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
        {input.name === "image_input_value" &&
          !!inputValue[input.id]?.value &&
          imageLink && (
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
