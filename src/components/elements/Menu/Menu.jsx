import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./menu.module.scss";
import { memo } from "react";

const MenuContext = React.createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export const AnchorWrapper = ({ children }) => {
  const { anchorRef, setMenuOpen, isMouseInsideMenu } = useMenu();
  return (
    <button
      type={"button"}
      className={styles.anchorWrapper}
      onBlur={(e) => {
        if (!isMouseInsideMenu) {
          setMenuOpen(false);
        } else {
          console.log("focusing");
          e.target.focus();
        }
      }}
      onClick={() => setMenuOpen((prev) => !prev)}
      ref={anchorRef}
    >
      {children}
    </button>
  );
};
export const Menu = ({ children }) => {
  const { anchorRef, menuOpen, setIsMouseInsideMenu } = useMenu();
  const menuRef = useRef();

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) {
      console.error("Anchor not provided to menu");
      return;
    }
    if (!menuRef.current) return;

    const menu = menuRef.current;
    const menuOffsetHeight = menu.offsetHeight;
    const anchorRect = anchor.getBoundingClientRect();
    const anchorY = anchorRect.top + window.scrollY + anchorRect.height;
    const windowHeight = window.innerHeight;

    const overflowingWindow = anchorY + menuOffsetHeight > windowHeight;

    if (overflowingWindow) {
      // overflowing
      console.log("overflowing");
      menu.style.top = anchor.offsetTop - menu.offsetHeight + "px";
      menu.style.left = anchorRect.left + "px";
    } else {
      // not overflowing
      menu.style.top = anchorY + "px";
      menu.style.left = anchorRect.left + "px";
    }

    console.log(anchor);
  }, [anchorRef, menuOpen]);
  return (
    menuOpen && (
      <div
        onMouseEnter={() => setIsMouseInsideMenu(true)}
        onMouseLeave={() => setIsMouseInsideMenu(false)}
        className={styles.container}
        ref={menuRef}
      >
        {children}
      </div>
    )
  );
};

export function MenuProvider({ children }) {
  const anchorRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMouseInsideMenu, setIsMouseInsideMenu] = useState(false);

  console.log(isMouseInsideMenu);
  const value = {
    anchorRef,
    menuOpen,
    setMenuOpen,
    isMouseInsideMenu,
    setIsMouseInsideMenu,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
