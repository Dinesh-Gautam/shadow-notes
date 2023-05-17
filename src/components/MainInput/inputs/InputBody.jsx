import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { Draggable } from "react-beautiful-dnd";
import { inputOptions, input as inputNames } from "./inputOptions";

function InputBody() {
  const { inputs } = useInputs();

  return (
    <>
      {inputs.map((input, index) =>
        input.name === inputNames.heading ? (
          !input.parentId && (
            <div>
              <InputField input={input} />
            </div>
          )
        ) : (
          <Draggable
            // isDragDisabled={input.name === inputNames.heading}
            // isDragDisabled={index === 0}
            // disableInteractiveElementBlocking={index === 0}
            key={input.id}
            draggableId={input.id}
            index={index}
          >
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
        )
      )}
    </>
  );
}

export default InputBody;
