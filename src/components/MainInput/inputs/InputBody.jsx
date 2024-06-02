import React, { useState } from "react";
import { useInputs } from "../InputContext";
import InputField from "./InputField";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { input as inputNames, inputOptions } from "./inputOptions";
import { getStyle } from "../MainInput";
import styles from "./InputBody.module.scss";
import useInputActions from "../useInputActions";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu/Menu";
import ColorAdditions from "./elements/ColorAdditions";
import InputControls from "./InputControls";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function ColorInput({ input }) {
  return (
    <div
      style={{
        backgroundColor: input?.state?.value,
      }}
      className={styles.colorInput + " color-filter"}
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
        className={styles.color + " color-filter"}
      />
    </div>
  );
}

function InputBody() {
  const { inputs } = useInputs();
  const { onDragEnd, addInputElement, removeElement } = useInputActions();
  const [animationParent, enableAnimation] = useAutoAnimate({
    duration: 200,
    easing: "ease-in-out",
  });

  function hasInnerNotes() {
    return inputs.filter((e) => !e.nonMoveable).length > 0;
  }

  function addColorInput() {
    const colorInput = inputOptions.find((e) => e.name === inputNames.color);
    addInputElement({
      selectedInput: colorInput,
    });
  }

  return (
    <>
      <div className={styles.heading}>
        {!inputs.some((e) => e.name === inputNames.color) && (
          <button type="button" onClick={() => addColorInput()}>
            +
          </button>
        )}
        {inputs.map((input, index) => (
          <React.Fragment key={input.id}>
            {input.name === inputNames.color && (
              <MenuProvider>
                <AnchorWrapper>
                  <ColorInput input={input} />
                </AnchorWrapper>
                <Menu>
                  <div className={styles.colorMenu}>
                    <div className={styles.colorMenuHeader}>
                      <div>
                        <ColorSelection
                          value={input?.state?.value}
                          id={input.id}
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => removeElement({ id: input.id })}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <ColorAdditions input={input} />
                  </div>
                </Menu>
              </MenuProvider>
            )}
            {input.name === inputNames.heading && <InputField input={input} />}
          </React.Fragment>
        ))}
      </div>

      <DragDropContext
        onBeforeDragStart={() => enableAnimation(false)}
        onDragEnd={(...args) => {
          onDragEnd(...args);
          setTimeout(() => enableAnimation(true), 1);
        }}
      >
        <Droppable droppableId="droppable" type="main">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.inputBody}
              style={getStyle(provided.droppableProps.style, snapshot)}
            >
              <div ref={animationParent}>
                {inputs
                  .filter(
                    (input) =>
                      !input.parentId &&
                      input.name !== inputNames.heading &&
                      input.name !== inputNames.color
                  )
                  .map((input, index) => (
                    <React.Fragment key={input.id}>
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
                              <div>
                                <InputField input={input} />
                                <AddInput input={input} />
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    </React.Fragment>
                  ))}

                {provided.placeholder}
              </div>
              {!hasInnerNotes() && <AddInput visible={true} />}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

function AddInput({ input, visible: v = false }) {
  const [visible, setVisible] = useState(v);
  const { inputs } = useInputs();

  return (
    <div
      onMouseEnter={() => !v && setVisible(true)}
      onMouseLeave={() => !v && setVisible(false)}
      className={styles.addInput}
      style={
        visible
          ? {
              opacity: 1,
              // pointerEvents: "auto",
            }
          : {
              opacity: 0,
              // pointerEvents: "none",
            }
      }
    >
      <div>
        <InputControls index={inputs.findIndex((e) => e.id === input?.id)} />
      </div>
    </div>
  );
}

export default InputBody;
