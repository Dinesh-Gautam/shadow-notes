import React, { useState } from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { input as inputNames } from "./inputOptions";
import { getStyle } from "../MainInput";
import styles from "./InputBody.module.scss";
import useInputActions from "../useInputActions";
import useMenu, {
  AnchorWrapper,
  Menu,
  MenuProvider,
} from "../../elements/Menu/Menu";
import ColorAdditions from "./elements/ColorAdditions";
import InputControls from "./InputControls";

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

function ColorSelection({ value, id }) {
  const { changeInputValue } = useInputActions();
  return (
    <div>
      <input
        type="color"
        onChange={(e) =>
          changeInputValue({
            id: id,
            value: e.target.value,
          })
        }
        value={value}
        className="color_input"
      />
    </div>
  );
}

function InputBody() {
  const { inputs } = useInputs();
  const { onDragEnd } = useInputActions();

  return (
    <>
      <div className={styles.heading}>
        {inputs.map((input, index) => (
          <React.Fragment key={input.id}>
            {input.name === inputNames.color && (
              <MenuProvider>
                <AnchorWrapper>
                  <ColorInput input={input} />
                </AnchorWrapper>
                <Menu>
                  <div className={styles.colorMenu}>
                    <ColorSelection value={input?.state?.value} id={input.id} />
                    <ColorAdditions input={input} />
                  </div>
                </Menu>
              </MenuProvider>
            )}
            {input.name === inputNames.heading && <InputField input={input} />}
          </React.Fragment>
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
                .map((input, index, arr) => (
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
                        {!input.parentId && (
                          <>
                            <InputField input={input} />

                            {index < arr.length - 1 && <AddInput />}
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
              <AddInput />

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

function AddInput() {
  const [visible, setVisible] = useState(false);
  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={styles.addInput}
    >
      {visible && <InputControls />}
    </div>
  );
}

export default InputBody;
