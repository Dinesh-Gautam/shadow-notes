import React, { useState } from "react";
import styles from "./inputWraper.module.scss";
import UseSvg from "../../../elements/UseSvg";
import useInputActions from "../../useInputActions";

function InputWrapper({ id, children, noRemovable }) {
  const [hideHeader, setHideHeader] = useState(true);
  const { removeElement } = useInputActions();
  return (
    <div
      onMouseLeave={() => setHideHeader(true)}
      onMouseEnter={() => setHideHeader(false)}
      style={{
        outline: !hideHeader ? "1px solid rgba(0, 0, 0, 0.2)" : "none",
      }}
      className={styles.container}
    >
      {!hideHeader && (
        <div className={styles.header}>
          <div>additions</div>
          <div className="buttons">
            {!noRemovable && (
              <button type="button" onClick={() => removeElement({ id })}>
                <UseSvg type="close" />
              </button>
            )}
          </div>
        </div>
      )}
      <div className={styles.childContainer}>{children}</div>
    </div>
  );
}

export default InputWrapper;
