import React from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { input as inputNames } from "./inputOptions";
import { getStyle } from "../MainInput";
import styles from "./InputBody.module.scss";
import useInputActions from "../useInputActions";
import useMenu from "../../elements/Menu/Menu";
import ColorAdditions from "./elements/ColorAdditions";

function ColorInput({ input }) {
  return (
    <div
      style={{
        backgroundColor: input?.state?.value,
      }}
      className={styles.colorInput}
    ></div>
  );
}

function InputBody() {
  const { inputs } = useInputs();
  const { onDragEnd } = useInputActions();
  const { Menu, AnchorWrapper } = useMenu();

  return (
    <>
      <div className={styles.heading}>
        {inputs.map((input, index) => (
          <>
            {input.name === inputNames.color && (
              <>
                <AnchorWrapper>
                  <ColorInput input={input} />
                </AnchorWrapper>
                <Menu>
                  <ColorAdditions input={input} />
                </Menu>
              </>
            )}
            {input.name === inputNames.heading && <InputField input={input} />}
          </>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="main">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.inputBody}
              style={getStyle(provided.droppableProps.style, snapshot)}
            >
              {inputs
                .filter(
                  (input) =>
                    !input.parentId &&
                    input.name !== inputNames.heading &&
                    input.name !== inputNames.color
                )
                .map((input, index) => (
                  <Draggable
                    key={input.id}
                    draggableId={input.id}
                    index={index}
                  >
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

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default InputBody;
