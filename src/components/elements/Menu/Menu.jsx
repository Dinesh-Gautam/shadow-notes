import React, { useContext, useEffect, useRef, useState } from "react";

import styles from "./menu.module.scss";
import { memo } from "react";
// import { createPortal } from "react-dom";

import { Menu as MuiMenu, styled } from "@mui/material";

const StyledMenu = styled((props) => <MuiMenu {...props} />)(({ theme }) => ({
  ".MuiPaper-root": {
    borderRadius: 6,
    minWidth: 100,
    boxShadow:
      "0px 0px 8px rgba(0, 0, 0, 0.1), 0px 4px 32px rgba(0, 0, 0, 0.1)",
    background: "#fafafa",
    color: "#000",
  },
}));

const MenuContext = React.createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export const AnchorWrapper = ({ children }) => {
  const { anchorRef, setMenuOpen, isMouseInsideMenu } = useMenu();

  return (
    <div
      style={{ cursor: "pointer" }}
      // role="button"
      // onBlur={(e) => {
      //   if (!isMouseInsideMenu) {
      //     setMenuOpen(false);
      //   } else {
      //     console.log("focusing");
      //     e.target.focus();
      //   }
      // }}
      className={styles.anchorWrapper}
      onClick={() => setMenuOpen(true)}
      ref={anchorRef}
    >
      {children}
    </div>
  );
};
// export const Menu = ({ outer, className, children }) => {
//   const { anchorRef, menuOpen, setMenuOpen, setIsMouseInsideMenu } = useMenu();
//   const menuRef = useRef();

//   useEffect(() => {
//     function handelClick() {
//       console.log(menuOpen);
//       if (menuOpen) setMenuOpen(false);
//     }
//     if (!window.blurEventAdded) {
//       window.addEventListener("click", handelClick);
//       window.blurEventAdded = true;
//     }

//     return () => {
//       window.removeEventListener("click", handelClick);
//     };
//   }, []);

//   useEffect(() => {
//     const anchor = anchorRef.current;
//     if (!anchor) {
//       console.error("Anchor not provided to menu");
//       return;
//     }
//     if (!menuRef.current) return;

//     const menu = menuRef.current;
//     const menuOffsetHeight = menu.offsetHeight;
//     const anchorRect = anchor.getBoundingClientRect();
//     const anchorY = anchorRect.top + window.scrollY + anchorRect.height;
//     const diff = anchorRect.left + menu.offsetWidth - window.innerWidth;
//     let anchorLeft = 0;
//     if (diff > 0) {
//       anchorLeft += diff;
//     }
//     const windowHeight = window.innerHeight;

//     const overflowingWindow = anchorY + menuOffsetHeight > windowHeight;

//     if (overflowingWindow) {
//       // overflowing
//       console.log("overflowing");
//       menu.style.top = anchor.offsetTop - menu.offsetHeight + "px";
//       menu.style.left = anchorRect.left - anchorLeft + "px";
//     } else {
//       // not overflowing
//       menu.style.top = anchorY + "px";
//       menu.style.left = anchorRect.left - anchorLeft + "px";
//     }

//     console.log(anchor);
//   }, [anchorRef, menuOpen]);

//   return (
//     menuOpen &&
//     (outer ? (
//       createPortal(
//         <div
//           onMouseEnter={() => setIsMouseInsideMenu(true)}
//           onMouseLeave={() => setIsMouseInsideMenu(false)}
//           className={[styles.container, className].join(" ")}
//           ref={menuRef}
//         >
//           {children}
//         </div>,
//         document.body
//       )
//     ) : (
//       <div
//         onMouseEnter={() => setIsMouseInsideMenu(true)}
//         onMouseLeave={() => setIsMouseInsideMenu(false)}
//         className={[styles.container, className].join(" ")}
//         ref={menuRef}
//       >
//         {children}
//       </div>
//     ))
//   );
// };

export const Menu = ({ outer, className, children }) => {
  const { anchorRef, menuOpen, setMenuOpen, setIsMouseInsideMenu } = useMenu();

  return (
    <StyledMenu
      sx={{
        borderRadius: 12,
        boxShadow: "none",
      }}
      // className={[styles.container, className].join(" ")}
      className={styles.container}
      anchorEl={anchorRef.current}
      open={menuOpen}
      // onClick={() => setMenuOpen(false)}
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
