import React, { useState } from "react";

function DropDown({
  children,
  className,
  mainText,
  extraButtons,
  DropdownBackgroundColor,
}) {
  const [dropdownDisplay, setdropdownDisplay] = useState(false);

  const dropInnerContainer = () => {
    setdropdownDisplay((prev) => !prev);
  };

  return (
    <div
      style={{ backgroundColor: DropdownBackgroundColor }}
      className="dropdown_container"
    >
      <div className="dropdown_wraper">
        <h1 className={className || "default_dropdown_main_container"}>
          {mainText}
        </h1>
        <div className="dropdown_btn_container">
          {extraButtons}
          <button onClick={dropInnerContainer}>drop</button>
        </div>
      </div>
      <div
        style={{ display: dropdownDisplay ? "block" : "none" }}
        className="dropdown_inner_container"
      >
        {children}
      </div>
    </div>
  );
}

export default DropDown;
