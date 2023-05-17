import React from "react";
import { useInputs } from "./InputContext";
import InputBody from "./inputs/InputBody";
import InputControls from "./inputs/InputControls";
// import Button from "./inputs/elements/Button";
import styles from "./mainInput.module.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import useInputActions from "./useInputActions";

function MainInput() {
  const { formSubmitHandler } = useInputs();
  const { onDragEnd } = useInputActions();

  return (
    <form
      className={styles.form}
      //  onSubmit={formSubmitHandler}
    >
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result.source.index, result.destination.index)
        }
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.inputBody}
            >
              <InputBody />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className={styles.inputControls}>
        <InputControls />
      </div>
    </form>
  );
}

export default MainInput;
