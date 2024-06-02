import { useState } from "react";
import UseSvg from "../../elements/UseSvg";
import useInputActions from "../useInputActions";
import styles from "styles/components/input/inputWrapper.module.scss";

function getTextWidth(text, font) {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function classes(...cls) {
  return cls.filter(Boolean).join(" ");
}

function InputWrapper({
  input,
  children,
  noRemovable,
  inputFooter,
  isDragging,
}) {
  const [show, setShow] = useState(false);
  const { removeElement, changeInputValue } = useInputActions();

  return (
    <div
      onMouseLeave={() => setShow(false)}
      onMouseEnter={() => setShow(true)}
      className={classes(styles.container, isDragging ? styles.dragging : "")}
    >
      {show && (
        <div>
          <div className={styles.header}>
            <div className={styles.buttons}>
              {!noRemovable && (
                <button
                  type="button"
                  onClick={() => removeElement({ id: input.id })}
                >
                  <UseSvg type="close" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className={styles.inputContainer}>
        <input
          style={{
            width:
              getTextWidth(
                input?.state?.labelValue || input.value,
                "normal 12px poppins"
              ) + "px",
          }}
          type="text"
          onChange={(e) =>
            changeInputValue({
              id: input.id,
              isLabel: true,
              value: e.target.value,
            })
          }
          value={input?.state?.labelValue ?? input.value}
        />
      </div>
      <div className={styles.childContainer}>{children}</div>
      {inputFooter && <div className={styles.inputFooter}>{inputFooter}</div>}
    </div>
  );
}

export default InputWrapper;
