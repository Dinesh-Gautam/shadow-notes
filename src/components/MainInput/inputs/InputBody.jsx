import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { Draggable } from "react-beautiful-dnd";

function InputBody() {
  const { inputs } = useInputs();

  return (
    <>
      {inputs.map((input, index) => (
        <Draggable key={input.id} draggableId={input.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              snapshot={snapshot}
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
