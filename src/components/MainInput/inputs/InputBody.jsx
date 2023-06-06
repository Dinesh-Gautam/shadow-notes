import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { Draggable } from "react-beautiful-dnd";
import { input as inputNames } from "./inputOptions";

function InputBody() {
  const { inputs } = useInputs();

  return (
    <>
      {inputs.map(
        (input, index) =>
          input.name === inputNames.heading && (
            <div key={input.id}>
              <InputField input={input} />
            </div>
          )
      )}
      {inputs
        .filter((input) => !input.parentId && input.name !== inputNames.heading)
        .map((input, index) => (
          <Draggable key={input.id} draggableId={input.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                {!input.parentId && <InputField input={input} />}
              </div>
            )}
          </Draggable>
        ))}
    </>
  );
}

export default InputBody;
