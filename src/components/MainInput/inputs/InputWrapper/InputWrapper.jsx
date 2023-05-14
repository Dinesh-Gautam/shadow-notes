import React, { useState } from "react";
import styles from "./inputWraper.module.scss";
import UseSvg from "../../../elements/UseSvg";
import useInputActions from "../../useInputActions";

function InputWrapper({ input, children, noRemovable, inputFooter }) {
  const [show, setShow] = useState(false);
  const { removeElement, changeInputValue } = useInputActions();
  return (
    <div
      onMouseLeave={() => setShow(false)}
      onMouseEnter={() => setShow(true)}
      style={{
        outline: show ? "1px solid rgba(0, 0, 0, 0.2)" : "none",
      }}
      className={styles.container}
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
        <div className={styles.inputButtons}>{inputFooter}</div>
      )}
    </div>
  );
}

export default InputWrapper;
