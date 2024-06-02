import { Menu as MuiMenu, styled } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import styles from "styles/components/elements/menu.module.scss";

const StyledMenu = styled((props) => <MuiMenu {...props} />)(({ theme }) => ({
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
  const { anchorRef, menuOpen, setMenuOpen } = useMenu();

  return (
    <StyledMenu
      // className={[styles.container, className].join(" ")}
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
