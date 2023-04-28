import React, { useContext, useEffect, useState } from "react";
import { input_context } from "../InputContext";
import Button from "./elements/Button";
import InputField from "./InputField";
import { inputOptions } from "./inputOptions";
import { v4 as uuidv4 } from "uuid";
import UseSvg from "../../elements/UseSvg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function InputSelect() {
  const [inputSelect, setinputSelect] = useState("title");
  const [disableColorSelect, setdisableColorSelect] = useState(false);
  const {
    inputs,
    inputValue,
    inputsDispatch,
    inputValueDispatch,
    setisEditMode,
    isEditMode,
    hasAnyNotes,
  } = useContext(input_context);

  const inputDargHandler = (result) => {
    if (!result.destination) return;

    inputsDispatch({
      payload: {
        sIndex: result.source.index,
        dIndex: result.destination.index,
      },
      type: "inputReOrder",
    });
  };

  const inputAdderHandler = () => {
    const uid = uuidv4();

    const selectedInput = inputOptions.find(
      (input) => input.value.toLowerCase() === inputSelect.toLowerCase()
    );

    inputsDispatch({ type: "addElement", payload: { id: uid, selectedInput } });

    if (selectedInput.name === "color_input_value") {
      inputValueDispatch({
        type: "normalValue",
        payload: { id: uid, value: selectedInput.inputValue },
      });
    }
  };

  useEffect(() => {
    if (inputs.some((e) => e.name === "color_input_value")) {
      setdisableColorSelect(true);
      setinputSelect("title");
    } else {
      setdisableColorSelect(false);
    }
  }, [inputs]);

  return (
    <div className="input_select_container">
      <DragDropContext onDragEnd={inputDargHandler}>
        <Droppable droppableId="input_droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="input_fields"
            >
              {inputs.map((input, index) => {
                if (input.name === "heading_input_value") {
                  return <InputField key={input.id} input={input} />;
                } else {
                  return (
                    <Draggable
                      key={input.id}
                      draggableId={input.id}
                      index={index}
                    >
                      {(provided) => (
                        <InputField
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          input={input}
                        />
                      )}
                    </Draggable>
                  );
                }
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="input_selection">
        <div className="selection_input_btn">
          <select
            value={inputSelect}
            onChange={(e) => setinputSelect(e.target.value)}
            name="inputs_options"
          >
            {inputOptions.map((inputType) => {
              if (
                inputType.name === "color_input_value" &&
                disableColorSelect
              ) {
                return null;
              } else {
                return (
                  <option key={inputType.name} value={inputType.value}>
                    {inputType.value}
                  </option>
                );
              }
            })}
          </select>
          <Button
            attr={{ onClick: inputAdderHandler }}
            text={<UseSvg type="add" />}
          />
        </div>
        <div className="input_main_button">
          {(hasAnyNotes() || isEditMode.edit) && (
            <Button
              attr={{
                onClick: () => {
                  isEditMode.edit && setisEditMode(false);
                  inputsDispatch({
                    type: "clear",
                  });
                  inputValueDispatch({
                    type: "clear",
                  });
                },
              }}
              text="Cancel"
            />
          )}
          <Button
            attr={{ type: "submit" }}
            text={isEditMode.edit ? "Done" : "Submit"}
          />
        </div>
      </div>
    </div>
  );
}

export default InputSelect;
