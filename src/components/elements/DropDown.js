import React, { useState } from "react";
import UseSvg from "./UseSvg";

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
      // style={{ backgroundColor: DropdownBackgroundColor || "" }}
      className="dropdown_container"
    >
      <div className="dropdown_wraper">
        <div
          style={{ backgroundColor: DropdownBackgroundColor || "" }}
          className="dropdown_header_side_color"
        ></div>
        <h1 className={className || "default_dropdown_main_container"}>
          {mainText}
        </h1>
        <div className="dropdown_btn_container">
          {extraButtons}
          <button onClick={dropInnerContainer}>
            <UseSvg type="expand" />
          </button>
        </div>
      </div>
      <div
        // style={{ display: dropdownDisplay ? "block" : "none" }}
        className={
          dropdownDisplay
            ? "dropdown_inner_container visible"
            : "dropdown_inner_container"
        }
      >
        {children}
      </div>
    </div>
  );
}

export default DropDown;
