import React, { useEffect, useMemo, useRef, useState } from "react";
import InputWrapper from "./InputWrapper/InputWrapper";
import { input as InputOption } from "./inputOptions";
import useInputActions from "../useInputActions";
import UseSvg from "../../elements/UseSvg";
import { useInputs } from "../InputContext";
import styles from "./inputField.module.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";

function InputField({ input }) {
  const { changeInputValue } = useInputActions();
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
        <InputWrapper
          input={input}
          inputFooter={<ListFooterButtons id={input.id} />}
        >
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
        <InputWrapper input={input} inputFooter={<LinkInput input={input} />}>
          {input?.state?.value && (
            <a
              target="_blank"
              rel="noreferrer"
              href={input?.state?.value || ""}
            >
              {input?.state?.valueName || input?.state?.value}
            </a>
          )}
        </InputWrapper>
      )}

      {input.name === InputOption.image && (
        <InputWrapper input={input} inputFooter={<ImageInput input={input} />}>
          {input?.state?.value && (
            <img
              height={200}
              className={styles.image}
              src={input?.state?.value}
              alt={input?.state?.value}
            />
          )}
        </InputWrapper>
      )}
    </>
  );
}

function ImageInput({ input }) {
  const { changeInputValue } = useInputActions();
  return (
    <input
      value={input?.state?.value}
      placeholder="Image URL"
      onChange={(e) =>
        changeInputValue({ id: input.id, value: e.target.value })
      }
    />
  );
}

function ListFooterButtons({ id }) {
  const { addListElement } = useInputActions();
  return (
    <button onClick={() => addListElement({ parentId: id })} type="button">
      <UseSvg type="add" />
    </button>
  );
}

function HeadingInput({ value, onChange, placeholder }) {
  return (
    <input
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
  return (
    <Droppable droppableId={input.id} type="list">
      {(provided, snapshot) => (
        <ul
          className={styles.list}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <li>
            <ListInput
              value={value || ""}
              onChange={onChange}
              placeholder={placeholder}
            />
          </li>

          <GetListChildren parentId={id} />

          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

function ListInputWrapper({ input, children }) {
  const [show, setShow] = useState(false);
  const { removeElement } = useInputActions();
  return (
    <div
      className={styles.listInputWrapper}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={
        {
          // outline: show ? "1px solid rgba(0,0,0,0.2)" : "none",
        }
      }
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

function GetListChildren({ parentId }) {
  const { inputs } = useInputs();
  const { changeInputValue } = useInputActions();
  const children = inputs.filter((e) => e.parentId === parentId);

  return children.map((input, index) => (
    <Draggable
      key={input.id}
      draggableId={input.id}
      index={inputs.findIndex((e) => e.id === input.id)}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={input.id}
        >
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
        </div>
      )}
    </Draggable>
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
    <>
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
    </>
  );
}

export default InputField;
