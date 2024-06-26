import React from "react";
import styles from "styles/components/elements/Loading.module.scss";

function Loading({ type }) {
  switch (type) {
    case "simple-card":
      return <div className={styles[type]}></div>;
    default:
      return <div className={styles.default} />;
  }
}

export default Loading;
