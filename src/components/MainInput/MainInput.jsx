import React from "react";
import { useInputs } from "./InputContext";
import InputBody from "./inputs/InputBody";
import InputControls from "./inputs/InputControls";
// import Button from "./inputs/elements/Button";
import styles from "./mainInput.module.scss";

function MainInput() {
  const { formSubmitHandler } = useInputs();
  return (
    <form
      className={styles.form}
      //  onSubmit={formSubmitHandler}
    >
      <div className={styles.inputBody}>
        <div>
          <InputBody />
        </div>
      </div>
      <div className={styles.inputControls}>
        <InputControls />
      </div>
    </form>
  );
}

export default MainInput;
