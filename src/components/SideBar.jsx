import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";
import { Menu, AnchorWrapper, MenuProvider } from "./elements/Menu/Menu";
import Modal from "./elements/Modal/Modal";
import MainInput from "./MainInput/MainInput";
import { useInputs } from "./MainInput/InputContext";

function SideBar() {
  const { logout, currentUser } = useAuth();
  const { photoURL, displayName, email } = currentUser;

  const { modalOpen, setModalOpen, editMode } = useInputs();
  return (
    <div className="sidebar-container">
      <div className="upper-container">
        <button onClick={() => setModalOpen(true)} className="add-button">
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
          <MenuProvider>
            <AnchorWrapper>
              <button>
                <UseSvg type="moreInfo" />
              </button>
            </AnchorWrapper>
            <Menu>
              <button onClick={logout}>
                <span> Sign Out </span>
                <UseSvg type="logOut" />
              </button>
            </Menu>
          </MenuProvider>
        </div>
      </div>

      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        title={editMode.edit ? "Edit Note" : "Add Note"}
      >
        <MainInput />
      </Modal>
    </div>
  );
}

export default SideBar;
