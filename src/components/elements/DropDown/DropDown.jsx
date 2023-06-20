import React, { useState } from "react";
import Separator from "../Separator/Separator";
import UseSvg from "../UseSvg";
import styles from "./DropDown.module.scss";
function DropDown({
  children,
  className,
  mainText,
  extraButtons,
  DropdownBackgroundColor,
  id,
}) {
  const [dropdownDisplay, setDropdownDisplay] = useState(false);

  const dropInnerContainer = () => {
    setDropdownDisplay((prev) => !prev);
  };

  return (
    <div
      className={
        styles.container + " " + (dropdownDisplay ? styles.visible : "")
      }
      id={id}
    >
      <div className={styles.wrapper}>
        <div
          style={{ backgroundColor: DropdownBackgroundColor || "" }}
          className={styles.headerSideColor}
        ></div>
        <div onClick={dropInnerContainer} className={styles.heading}>
          <h1 className={className || styles.defaultDropDownMainContainer}>
            {mainText}
          </h1>
        </div>
        <div className={styles.buttonContainer}>
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
      {dropdownDisplay && (
        <div className={styles.innerContainer}>{children}</div>
      )}
    </div>
  );
}

export default DropDown;
