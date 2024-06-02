import { Menu as MuiMenu, styled } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import styles from "styles/components/elements/menu.module.scss";

const StyledMenu = styled((props) => <MuiMenu {...props} />)(() => ({
  ".MuiPaper-root": {
    borderRadius: "var(--default-border-radius)",
    minWidth: 100,
    boxShadow: "var(--boxShadow-more-depth)",
    background: "var(--default-backgroundcolor)",
    color: "var(--default-text-color)",
  },
}));

const MenuContext = React.createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export const AnchorWrapper = ({ children }) => {
  const { anchorRef, setMenuOpen } = useMenu();

  return (
    <div
      style={{ cursor: "pointer" }}
      className={styles.anchorWrapper}
      onClick={() => setMenuOpen(true)}
      ref={anchorRef}
    >
      {children}
    </div>
  );
};

export const Menu = ({ children }) => {
  const { anchorRef, menuOpen, setMenuOpen } = useMenu();

  return (
    <StyledMenu
      className={styles.container}
      anchorEl={anchorRef.current}
      open={menuOpen}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={() => setMenuOpen(false)}
    >
      <div>{children}</div>
    </StyledMenu>
  );
};
export function MenuProvider({ children }) {
  const anchorRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMouseInsideMenu, setIsMouseInsideMenu] = useState(false);

  const value = {
    anchorRef,
    menuOpen,
    setMenuOpen,
    isMouseInsideMenu,
    setIsMouseInsideMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
