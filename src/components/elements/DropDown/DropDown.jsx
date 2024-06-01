import React, { useEffect, useRef, useState } from "react";
import styles from "./DropDown.module.scss";
import { AnchorWrapper, Menu, MenuProvider } from "../Menu/Menu";
import { MoreVert, Share, Star } from "@mui/icons-material";
import autoAnimate from "@formkit/auto-animate";
import { motion } from "framer-motion";

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
    <motion.div
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

      <motion.div
        initial={{ height: 0, overflow: "hidden" }}
        animate={{
          height: dropdownDisplay ? "auto" : 0,
        }}
        className={styles.innerContainer}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default DropDown;
