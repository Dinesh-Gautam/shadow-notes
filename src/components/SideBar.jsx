import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";
import Menu from "./elements/Menu";

function SideBar() {
  const { logout, currentUser } = useAuth();
  const { photoURL, displayName, email } = currentUser;
  const menuButtonRef = useRef();
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <div className="sidebar-container">
      <div className="upper-container">
        <button className="add-button">
          <UseSvg type="add" /> <span>Add Note</span>
        </button>
      </div>
      <div className="bottom-container">
        <div className="user-info">
          <img src={photoURL} className="user-photo" alt="user" />
          <div className="user-credentials">
            <h3 className="user-name">{displayName}</h3>
            <span className="user-email">{email}</span>
          </div>
        </div>
        <div className="user-buttons">
          <button
            onBlur={() => setMenuOpen(false)}
            onClick={() => setMenuOpen((prev) => !prev)}
            ref={menuButtonRef}
          >
            <UseSvg type="moreInfo" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <Menu anchorRef={menuButtonRef}>
          <button onClick={logout}>
            <span> Sign Out </span>
            <UseSvg type="logOut" />
          </button>
        </Menu>
      )}
    </div>
  );
}

export default SideBar;
