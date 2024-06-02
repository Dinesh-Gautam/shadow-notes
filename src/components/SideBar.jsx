import { Fragment, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AnchorWrapper, Menu, MenuProvider } from "./elements/Menu/Menu";
import { ModalProvider, useModal } from "./elements/Modal/Modal";
import UseSvg from "./elements/UseSvg";

import Separator from "./elements/Separator/Separator";
import TrashBtn from "./Trash/TrashBtn";

import {
  AccountCircle,
  GroupOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import styles from "styles/components/SideBar.module.scss";
import { ToggleButton } from "./Theme";

function SideBar() {
  const { logout, isGuestUser, linkAccount, getUserInfo } = useAuth();
  const { photoURL, displayName, email } = getUserInfo();
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
              {isGuestUser() ? (
                <AccountCircle className={styles.userPhoto} />
              ) : (
                <img src={photoURL} className={styles.userPhoto} alt="img" />
              )}
            </AnchorWrapper>
            <Menu>
              <ToggleButton />
              {isGuestUser() && (
                <button onClick={() => linkAccount()}>
                  <LinkOutlined fontSize="small" /> Link Account{" "}
                </button>
              )}
              <button onClick={logout}>
                <UseSvg type="logOut" />
                <span> Sign Out </span>
              </button>
            </Menu>
          </MenuProvider>
          <HideWhenSideBarIsClosed>
            <div className={styles.userCredentials}>
              {isGuestUser() ? (
                <h3 className={styles.userName}>Guest</h3>
              ) : (
                <>
                  <h3 className={styles.userName}>{displayName}</h3>
                  <span className={styles.userEmail}>{email}</span>
                </>
              )}
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
