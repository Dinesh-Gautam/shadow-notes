import React, { Fragment, useState } from "react";
import { useAuth } from "../context/AuthContext";
import UseSvg from "./elements/UseSvg";
import { Menu, AnchorWrapper, MenuProvider } from "./elements/Menu/Menu";
import { ModalProvider, useModal } from "./elements/Modal/Modal";

import Separator from "./elements/Separator/Separator";
import TrashBtn from "./TrashBtn";

import styles from "./SideBar.module.scss";
import { GroupOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

function SideBar() {
  const { logout, currentUser } = useAuth();
  const { photoURL, displayName, email } = currentUser;
  const { setModalOpen } = useModal();
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.upperContainer}>
        <button
          title="Add Note"
          onClick={() => setModalOpen(true)}
          className={styles.addButton}
        >
          <UseSvg type="add" />

          <HideWhenSideBarIsClosed>
            <span>Add Note</span>
          </HideWhenSideBarIsClosed>
        </button>
        <Separator type="horizontal-bold" />

        <div className={styles.linksContainer}>
          <ModalProvider>
            <TrashBtn
              text={
                <HideWhenSideBarIsClosed>
                  <span>Trash</span>
                </HideWhenSideBarIsClosed>
              }
            />
          </ModalProvider>
          <Link title="Shared Notes with you" to={"/shared"}>
            <GroupOutlined />

            <HideWhenSideBarIsClosed>
              <span>Shared Notes</span>
            </HideWhenSideBarIsClosed>
          </Link>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.userInfo}>
          <MenuProvider>
            <AnchorWrapper>
              <img src={photoURL} className={styles.userPhoto} alt="user" />
            </AnchorWrapper>
            <Menu>
              <button onClick={logout}>
                <span> Sign Out </span>
                <UseSvg type="logOut" />
              </button>
            </Menu>
          </MenuProvider>
          <HideWhenSideBarIsClosed>
            <div className={styles.userCredentials}>
              <h3 className={styles.userName}>{displayName}</h3>
              <span className={styles.userEmail}>{email}</span>
            </div>
          </HideWhenSideBarIsClosed>
        </div>
      </div>
    </div>
  );
}

function HideWhenSideBarIsClosed({ children }) {
  const [closed] = useState(true);

  return <Fragment>{!closed && children}</Fragment>;
}

export default SideBar;
