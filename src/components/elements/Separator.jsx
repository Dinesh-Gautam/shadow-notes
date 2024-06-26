import React from "react";
import styles from "styles/components/elements/Separator.module.scss";

function Separator({ type, mr }) {
  return (
    <div
      styles={
        mr && {
          marginRight: mr,
        }
      }
      className={type ? styles[type] : styles.default}
    ></div>
  );
}

export default Separator;
