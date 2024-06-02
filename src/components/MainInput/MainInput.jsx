import { useInputs } from "./InputContext";
import InputBody from "./inputs/InputBody";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import useInputActions from "./useInputActions";
import styles from "styles/components/input/mainInput.module.scss";

export function getStyle(style, snapshot) {
  console.log(snapshot);
  if (!snapshot.isDraggingOver) {
    return {
      ...style,
      borderRadius: "6px",
    };
  }

  return {
    ...style,
    borderRadius: "6px",
    outlineOffset: "-6px",
    outline: "3px dashed rgba(0,0,0,0.1)",
  };
}

function MainInput() {
  const { formRef } = useInputs();
  const { formSubmitHandler } = useInputs();

  return (
    <form ref={formRef} className={styles.form} onSubmit={formSubmitHandler}>
      <InputBody />
    </form>
  );
}

export function MainInputControls() {
  const { history, undo, redo, formRef } = useInputs();
  const { inputFormCancel } = useInputActions();

  return (
    <div className={styles.inputControls}>
      <div className={styles.formControls}>
        {history.undo.length > 0 && (
          <button title="Undo" type="button" onClick={undo}>
            <UndoIcon />
          </button>
        )}
        {history.redo.length > 0 && (
          <button title="Redo" type="button" onClick={redo}>
            <RedoIcon />
          </button>
        )}
      </div>
      <div className={styles.formControls}>
        <button
          type="button"
          onClick={() => {
            inputFormCancel();
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default MainInput;
