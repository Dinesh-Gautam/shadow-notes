import React from "react";
import { createPortal } from "react-dom";
import UseSvg from "../UseSvg";
import styles from "./Modal.module.scss";
function ModalPortal({ title, children, setOpen }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{title || "Modal"}</h1>
        <div>
          <button onClick={() => setOpen(false)}>
            <UseSvg type="close" />
          </button>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

function Modal(props) {
  return props.open && createPortal(<ModalPortal {...props} />, document.body);
}

export default Modal;
