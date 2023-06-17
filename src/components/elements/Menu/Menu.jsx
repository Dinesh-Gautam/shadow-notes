import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./menu.module.scss";
import { memo } from "react";

const MenuContext = React.createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export const AnchorWrapper = ({ children }) => {
  const { anchorRef, setMenuOpen } = useMenu();

  return (
    <div
      className={styles.anchorWrapper}
      onBlur={(e) => {
        setMenuOpen(false);
      }}
      onClick={() => setMenuOpen((prev) => !prev)}
      ref={anchorRef}
    >
      {children}
    </div>
  );
};
export const Menu = ({ children }) => {
  const { anchorRef, menuOpen } = useMenu();
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
    const anchorY = anchor.offsetTop + anchor.offsetHeight;
    const windowHeight = window.innerHeight;

    const overflowingWindow = anchorY + menuOffsetHeight > windowHeight;

    if (overflowingWindow) {
      // overflowing
      menu.style.top = anchor.offsetTop - menu.offsetHeight + "px";
      menu.style.left = anchor.offsetLeft + "px";
    } else {
      // not overflowing
      menu.style.top = anchorY + "px";
      menu.style.left = anchor.offsetLeft + "px";
    }

    console.log(anchor);
  }, [anchorRef, menuOpen]);
  return (
    menuOpen && (
      <div className={styles.container} ref={menuRef}>
        {children}
      </div>
    )
  );
};

export function MenuProvider({ children }) {
  const anchorRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const value = {
    anchorRef,
    menuOpen,
    setMenuOpen,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
