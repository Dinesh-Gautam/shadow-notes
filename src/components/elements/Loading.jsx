import React from "react";
import styles from "./Loading.module.scss";
function Loading({ type }) {
  switch (type) {
    case "simple-card":
      return <div className={styles[type]}></div>;
    default:
      return "loading...";
  }
}

export default Loading;
