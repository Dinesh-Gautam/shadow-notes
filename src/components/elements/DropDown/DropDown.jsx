import React, { useState } from "react";
import styles from "./DropDown.module.scss";
import { AnchorWrapper, Menu, MenuProvider } from "../Menu/Menu";
import { MoreVert, Share, Star } from "@mui/icons-material";

function DropDown({
  children,
  open,
  className,
  mainText,
  extraButtons,
  DropdownBackgroundColor,
  id,
  data,
}) {
  const [dropdownDisplay, setDropdownDisplay] = useState(open || false);

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
      {(data?.linkSharing || data?.star) && (
        <div className={styles.badge}>
          {data.linkSharing && <Share />}
          {data.star && <Star />}
        </div>
      )}
      <div className={styles.wrapper}>
        <div
          style={{ backgroundColor: DropdownBackgroundColor || "" }}
          className={styles.headerSideColor + " color-filter"}
        ></div>
        <div onClick={dropInnerContainer} className={styles.heading}>
          <h1 className={className || styles.defaultDropDownMainContainer}>
            {mainText}
          </h1>
        </div>
        {extraButtons && (
          <div className={styles.buttonContainer}>
            {/* {extraButtons} */}

            <MenuProvider>
              <AnchorWrapper>
                <button>
                  <MoreVert />
                </button>
              </AnchorWrapper>

              <Menu>{extraButtons}</Menu>
            </MenuProvider>

            {/* <Separator type="vertical-medium" /> */}
            {/* <button
            style={{
              transform: dropdownDisplay ? "rotate(180deg)" : "rotate(0deg)",
            }}
            onClick={dropInnerContainer}
          >
            <UseSvg type="expand" />
          </button> */}
          </div>
        )}
      </div>
      {dropdownDisplay && (
        <div className={styles.innerContainer}>{children}</div>
      )}
    </div>
  );
}

export default DropDown;
