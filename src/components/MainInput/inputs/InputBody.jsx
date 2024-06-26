import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styles from "styles/components/input/InputBody.module.scss";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu";
import { useInputs } from "../InputContext";
import { getStyle } from "../MainInput";
import useInputActions from "../useInputActions";
import InputControls from "./InputControls";
import InputField from "./InputField";
import ColorAdditions from "./elements/ColorInput";
import { input as inputNames, inputOptions } from "./inputOptions";

function Color({ input }) {
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

  const hasNotes = useMemo(
    () => inputs.filter((e) => !e.nonMoveable).length > 0,
    [inputs]
  );
  const colorInputExists = useMemo(
    () => !inputs.some((e) => e.name === inputNames.color),
    [inputs]
  );

  function addColorInput() {
    const colorInput = inputOptions.find((e) => e.name === inputNames.color);
    addInputElement({
      selectedInput: colorInput,
    });
  }

  return (
    <>
      <div className={styles.heading}>
        {colorInputExists && (
          <button type="button" onClick={() => addColorInput()}>
            +
          </button>
        )}
        {inputs.map((input) => (
          <React.Fragment key={input.id}>
            {input.name === inputNames.color && (
              <MenuProvider>
                <AnchorWrapper>
                  <Color input={input} />
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
                        {(provided) => (
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
              {!hasNotes && <AddInput visible={true} />}
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
      style={visible ? { opacity: 1 } : { opacity: 0 }}
    >
      <div>
        <InputControls index={inputs.findIndex((e) => e.id === input?.id)} />
      </div>
    </div>
  );
}

export default InputBody;
