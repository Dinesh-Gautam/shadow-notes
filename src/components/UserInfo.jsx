import React from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";

const UserInfo = () => {
  const { logout, currentUser } = useAuth();
  const { photoURL, displayName, email } = currentUser;
  return (
    <div className="user-info-container">
      <div className="user-info">
        <img src={photoURL} className="user-photo" alt="user" />
        <div className="user-credentials">
          <h3 className="user-name">{displayName}</h3>
          <span className="user-email">{email}</span>
        </div>
      </div>
      <button onClick={logout}>
        <span> Sign Out </span>
        <UseSvg type="logOut" />
      </button>
    </div>
  );
};

export default UserInfo;
