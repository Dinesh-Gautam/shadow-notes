import React, { useState } from "react";
import styles from "./inputWraper.module.scss";
import UseSvg from "../../../elements/UseSvg";

function InputWrapper({ children }) {
  const [hideHeader, setHideHeader] = useState(true);
  return (
    <div
      onMouseLeave={() => setHideHeader(true)}
      onMouseEnter={() => setHideHeader(false)}
      className={styles.container}
    >
      {!hideHeader && (
        <div className={styles.header}>
          <div>additions</div>
          <div className="buttons">
            <button>
              <UseSvg type="close" />
            </button>
          </div>
        </div>
      )}
      <div className={styles.childContainer}>{children}</div>
    </div>
  );
}

export default InputWrapper;
