import React from "react";

import styles from "./Separator.module.scss";

function Separator({ type }) {
  return <div className={type ? styles[type] : styles.default}></div>;
}

export default Separator;
