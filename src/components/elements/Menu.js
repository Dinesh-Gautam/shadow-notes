import React, { useEffect, useRef } from "react";

function Menu({ anchorRef, children }) {
  const menuRef = useRef();

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) {
      console.error("Anchor not provided to menu");
      return;
    }

    const menu = menuRef.current;
    const menuOffsetHeight = menu.offsetHeight;
    const anchorY = anchor.offsetTop + anchor.offsetHeight;
    const windowHeight = window.innerHeight;

    const overflowingWindow = anchorY + menuOffsetHeight > windowHeight;

    if (overflowingWindow) {
      menu.style.top = anchor.offsetTop - menu.offsetHeight + "px";
      menu.style.left = anchor.offsetLeft + "px";
      console.log("overflowing ");
    } else {
      console.log("not overflowing");
      menu.style.top = anchorY + "px";
      menu.style.left = anchor.offsetLeft + "px";
    }

    console.log(anchor);
  }, []);

  return (
    <div class="menu-container" ref={menuRef}>
      {children}
    </div>
  );
}

export default Menu;
