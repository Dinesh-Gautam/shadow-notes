import React, { useState } from "react";
import styles from "./inputWraper.module.scss";
import UseSvg from "../../../elements/UseSvg";
import useInputActions from "../../useInputActions";

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

// function getCssStyle(element, prop) {
//   return window.getComputedStyle(element, null).getPropertyValue(prop);
// }

// function getCanvasFont(el = document.body) {
//   const fontWeight = getCssStyle(el, "font-weight") || "normal";
//   const fontSize = getCssStyle(el, "font-size") || "16px";
//   const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

//   return `${fontWeight} ${fontSize} ${fontFamily}`;
// }

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
      style={
        {
          // outline: show ? "2px solid rgba(0, 0, 0, 0.2)" : "none",
        }
      }
      className={styles.container + " " + (isDragging ? styles.dragging : "")}
    >
      {show && (
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
      {show && inputFooter && (
        <div className={styles.inputFooter}>{inputFooter}</div>
      )}
    </div>
  );
}

export default InputWrapper;
