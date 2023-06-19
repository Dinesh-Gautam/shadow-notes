import React, { Fragment, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";
import { Menu, AnchorWrapper, MenuProvider } from "./elements/Menu/Menu";
import Modal from "./elements/Modal/Modal";
import MainInput from "./MainInput/MainInput";
import { useInputs } from "./MainInput/InputContext";
import Separator from "./elements/Separator";
import { useData } from "../context/DatabaseContext";
import TrashBtn from "./OutputFilters/filterComponents/TrashBtn";

function SideBar() {
  const { logout, currentUser } = useAuth();
  const { photoURL, displayName, email } = currentUser;
  const { trashData, settrashData } = useData();

  const { modalOpen, setModalOpen, editMode } = useInputs();
  return (
    <div className="sidebar-container">
      <div className="upper-container">
        <button onClick={() => setModalOpen(true)} className="add-button">
          <UseSvg type="add" />

          <HideWhenSideBarIsClosed>
            <span>Add Note</span>
          </HideWhenSideBarIsClosed>
        </button>
        <Separator type="horizontal-bold" />

        <div>
          <TrashBtn
            text={
              <HideWhenSideBarIsClosed>
                <span>Trash</span>
              </HideWhenSideBarIsClosed>
            }
            data={trashData}
            setData={settrashData}
          />
        </div>
      </div>

      <div className="bottom-container">
        <div className="user-info">
          <MenuProvider>
            <AnchorWrapper>
              <img src={photoURL} className="user-photo" alt="user" />
            </AnchorWrapper>
            <Menu>
              <button onClick={logout}>
                <span> Sign Out </span>
                <UseSvg type="logOut" />
              </button>
            </Menu>
          </MenuProvider>
          <HideWhenSideBarIsClosed>
            <div className="user-credentials">
              <h3 className="user-name">{displayName}</h3>
              <span className="user-email">{email}</span>
            </div>
          </HideWhenSideBarIsClosed>
        </div>
        {/* <HideWhenSideBarIsClosed>
          <div className="user-buttons">
            <MenuProvider>
           
                <div className="button">
                  <UseSvg type="moreInfo" />
                </div>
           
             
            </MenuProvider>
          </div>
        </HideWhenSideBarIsClosed> */}
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

function HideWhenSideBarIsClosed({ children }) {
  const [closed, setClosed] = useState(true);

  return <Fragment>{!closed && children}</Fragment>;
}

export default SideBar;
