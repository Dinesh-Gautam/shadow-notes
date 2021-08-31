import React from "react";

function Separator({ type }) {
  return <div className={`separator ${type ? type : "default"}`}></div>;
}

export default Separator;
