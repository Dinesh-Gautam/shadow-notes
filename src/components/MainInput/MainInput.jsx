import React from "react";
import { useInputs } from "./InputContext";
import InputBody from "./inputs/InputBody";
import InputControls from "./inputs/InputControls";
// import Button from "./inputs/elements/Button";
import styles from "./mainInput.module.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useInputActions from "./useInputActions";

export function getStyle(style, snapshot) {
  console.log(snapshot);
  if (!snapshot.isDraggingOver) {
    return {
      ...style,
      borderRadius: "6px",
      margin: 6,
    };
  }

  return {
    ...style,
    borderRadius: "6px",
    margin: 6,
    outline: "3px dashed rgba(0,0,0,0.1)",
  };
}

function MainInput() {
  const { formSubmitHandler } = useInputs();
  const { onDragEnd, inputFormCancel } = useInputActions();

  return (
    <form
      className={styles.form}
      //  onSubmit={formSubmitHandler}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" type="main">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.inputBody}
              style={getStyle(provided.droppableProps.style, snapshot)}
            >
              <InputBody />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className={styles.inputControls}>
        <InputControls />
        <div className={styles.formControls}>
          <button
            type="button"
            onClick={() => {
              inputFormCancel();
            }}
          >
            Cancel
          </button>
          <button onClick={() => formSubmitHandler()}>Submit</button>
        </div>
      </div>
    </form>
  );
}

export default MainInput;
