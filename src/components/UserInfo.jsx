import React from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";

const UserInfo = () => {
  const { logout } = useAuth();
  return (
    <div className="user-info-container">
      <button onClick={logout}>
        <span> Sign Out </span>
        <UseSvg type="logOut" />
      </button>
    </div>
  );
};

export default UserInfo;
