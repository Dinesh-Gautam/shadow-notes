import React from "react";

function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="upper-container">
        <button>Add Note</button>
      </div>
      <div className="bottom-container">
        <div className="user-info">
          <div className="user-username">user Name</div>
          <div className="user-email">test@demo.com</div>
          <div className="user-buttons">
            <button>more</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
