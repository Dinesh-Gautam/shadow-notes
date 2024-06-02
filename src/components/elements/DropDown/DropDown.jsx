import { MoreVert, Share, Star } from "@mui/icons-material";
import { m } from "framer-motion";
import React, { useState } from "react";
import { AnchorWrapper, Menu, MenuProvider } from "../Menu/Menu";
import styles from "styles/components/elements/DropDown.module.scss";

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

  const dropInnerContainer = (e) => {
    setDropdownDisplay((prev) => !prev);
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout="position"
      className={
        styles.container
        // + " " + (dropdownDisplay ? styles.visible : "")
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
          </div>
        )}
      </div>

      <m.div
        initial={{ height: 0, overflow: "hidden" }}
        animate={{
          height: dropdownDisplay ? "auto" : 0,
        }}
        className={styles.innerContainer}
      >
        {children}
      </m.div>
    </m.div>
  );
}

export default DropDown;
