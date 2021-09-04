import React from "react";

function Loading({ type }) {
  switch (type) {
    case "simple-card":
      return <div className={type}></div>;
    default:
      return "loading...";
  }
}

export default Loading;
