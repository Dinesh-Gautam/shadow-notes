import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { Draggable } from "react-beautiful-dnd";
import { input as inputNames } from "./inputOptions";

function InputBody() {
  const { inputs } = useInputs();

  return (
    <>
      {inputs.map((input, index) =>
        input.name === inputNames.heading || input.parentId ? (
          !input.parentId && (
            <div key={input.id}>
              <InputField input={input} />
            </div>
          )
        ) : (
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
        )
      )}
    </>
  );
}

export default InputBody;
