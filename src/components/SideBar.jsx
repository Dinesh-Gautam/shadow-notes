import React from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";

function SideBar() {
  const { logout, currentUser } = useAuth();
  const { photoURL, displayName, email } = currentUser;

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
          <button>
            <UseSvg type="moreInfo" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
