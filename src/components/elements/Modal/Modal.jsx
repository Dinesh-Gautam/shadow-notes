import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import UseSvg from "../UseSvg";
import styles from "./Modal.module.scss";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

function ModalPortal({ title, children }) {
  const { setModalOpen } = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{title || "Modal"}</h1>
        <div>
          <button onClick={() => setModalOpen(false)}>
            <UseSvg type="close" />
          </button>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

function Modal(props) {
  const { modalOpen } = useModal();
  return modalOpen && createPortal(<ModalPortal {...props} />, document.body);
}

export function ModalProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  const modalToggle = () => {
    setModalOpen((prev) => !prev);
  };
  const value = {
    modalOpen,
    setModalOpen,
    modalToggle,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default Modal;
