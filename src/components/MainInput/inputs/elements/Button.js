import React from "react";

function Button({ attr, text }) {
  return (
    <button type="button" {...attr}>
      {text}
    </button>
  );
}

export default Button;
