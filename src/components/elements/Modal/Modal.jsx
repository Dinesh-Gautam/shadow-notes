import { AnimatePresence, m } from "framer-motion";
import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import UseSvg from "../UseSvg";
import styles from "styles/components/elements/Modal.module.scss";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

function ModalPortal({ title, children, header }) {
  const { modalOpen, setModalOpen } = useModal();

  return (
    <AnimatePresence>
      {modalOpen && (
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            ease: "easeInOut",
            duration: 0.2,
          }}
          className={styles.container}
        >
          <div className={styles.header}>
            <h1>{title || "Modal"}</h1>
            {header ? header : <div style={{ flex: 1 }}></div>}
            <div>
              <button onClick={() => setModalOpen(false)}>
                <UseSvg type="close" />
              </button>
            </div>
          </div>
          <div className={styles.body}>{children}</div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function Modal(props) {
  return createPortal(<ModalPortal {...props} />, document.body);
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
