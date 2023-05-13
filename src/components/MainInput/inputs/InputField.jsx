import React, { useEffect, useRef, useState } from "react";
import InputWrapper from "./InputWrapper/InputWrapper";
import { input as InputOption } from "./inputOptions";
import useInputActions from "../useInputActions";
import styles from "./inputField.scss";
import UseSvg from "../../elements/UseSvg";
import { useInputs } from "../InputContext";

function InputField({ input }) {
  const { changeInputValue } = useInputActions();
  console.log(input);
  return (
    <>
      {input.name === InputOption.heading && (
        <HeadingInput
          onChange={(e) => {
            changeInputValue({ id: input.id, value: e.target.value });
          }}
          value={input?.state?.value}
          placeholder={input.value}
        />
      )}

      {input.name === InputOption.title && (
        <InputWrapper input={input}>
          <TitleInput
            onChange={(e) => {
              changeInputValue({ id: input.id, value: e.target.value });
            }}
            value={input?.state?.value}
            placeholder={input.value}
          />
        </InputWrapper>
      )}

      {input.name === InputOption.list && (
        <InputWrapper input={input}>
          <List
            onChange={(e) => {
              changeInputValue({ id: input.id, value: e.target.value });
            }}
            value={input?.state?.value}
            placeholder={input.value}
            input={input}
          />
        </InputWrapper>
      )}

      {input.name === InputOption.link && (
        <InputWrapper input={input}>
          <LinkInput input={input} />
        </InputWrapper>
      )}
    </>
  );
}

function HeadingInput({ value, onChange, placeholder }) {
  return (
    <input
      style={{
        marginBottom: "1em",
      }}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    ></input>
  );
}

function TitleInput({ value, onChange, placeholder }) {
  return (
    <input
      style={{
        fontSize: 24,
        fontWeight: "bold",
      }}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    ></input>
  );
}

function List({ input, value, onChange, placeholder }) {
  const { id } = input;
  const { addListElement } = useInputActions();
  return (
    <ul>
      <li>
        <ListInput
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
        />
      </li>
      {GetListChildren(id)}
      <div className={styles.inputButtons}>
        <button onClick={() => addListElement({ parentId: id })} type="button">
          <UseSvg type="add" />
        </button>
      </div>
    </ul>
  );
}

function ListInputWrapper({ input, children }) {
  const [show, setShow] = useState(false);
  const { removeElement } = useInputActions();
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        display: "flex",
      }}
    >
      {children}

      {show && (
        <div>
          <button type="button" onClick={() => removeElement({ id: input.id })}>
            <UseSvg type="remove" />
          </button>
        </div>
      )}
    </div>
  );
}

function GetListChildren(parentId) {
  const { inputs } = useInputs();
  const { changeInputValue } = useInputActions();
  return inputs
    .filter((e) => e.parentId === parentId)
    .map((input, index) => (
      <li>
        <ListInputWrapper input={input}>
          <input
            value={input?.state?.value || ""}
            onChange={(e) =>
              changeInputValue({ id: input.id, value: e.target.value })
            }
            placeholder={input.value + (index + 1)}
            type="text"
          ></input>
        </ListInputWrapper>
      </li>
    ));
}

function ListInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    ></input>
  );
}

function LinkInput({ input }) {
  const { changeInputValue } = useInputActions();
  return (
    <div>
      <input
        value={input?.state?.value || ""}
        onChange={(e) =>
          changeInputValue({ id: input.id, value: e.target.value })
        }
        placeholder={"URL"}
        type="text"
      ></input>
      <input
        value={input?.state?.valueName || ""}
        onChange={(e) =>
          changeInputValue({
            id: input.id,
            valueName: e.target.value,
            isLink: true,
          })
        }
        placeholder={"link Name"}
        type="text"
      ></input>
    </div>
  );
}

export default InputField;
