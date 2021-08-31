import React, { useState } from "react";
import Separator from "./Separator";
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
      className={`dropdown_container ${dropdownDisplay ? "visible" : false}`}
    >
      <div className="dropdown_wraper">
        <div
          style={{ backgroundColor: DropdownBackgroundColor || "" }}
          className="dropdown_header_side_color"
        ></div>
        <div className="dropdown_heading">
          <h1 className={className || "default_dropdown_main_container"}>
            {mainText}
          </h1>
        </div>
        <div className="dropdown_btn_container">
          {extraButtons}
          <Separator type="vertical-medium" />
          <button
            style={{
              transform: dropdownDisplay ? "rotate(180deg)" : "rotate(0deg)",
            }}
            onClick={dropInnerContainer}
          >
            <UseSvg type="expand" />
          </button>
        </div>
      </div>
      <div
        // style={{ display: dropdownDisplay ? "block" : "none" }}
        className="dropdown_inner_container"
      >
        {children}
      </div>
    </div>
  );
}

export default DropDown;
