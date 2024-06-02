import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styles from "styles/components/input/inputField.module.scss";
import { LinkPreview, isUrlValid } from "../../elements/LinkPreview";
import UseSvg from "../../elements/UseSvg";
import { useInputs } from "../InputContext";
import { getStyle } from "../MainInput";
import useInputActions from "../useInputActions";
import InputWrapper from "./InputWrapper";
import { input as InputOption, listTypes } from "./inputOptions";

function useKeyboardEvents() {
  const { removeElement } = useInputActions();
  const { inputs, setInputFocusId } = useInputs();

  function onKeyDown(e, input) {
    const codes = {
      deleteKey: "Delete",
      enterKey: "Enter",
      arrowUpKey: "ArrowUp",
      arrowDownKey: "ArrowDown",
    };
    e.stopPropagation();

    if (e.code === codes.deleteKey && input.name !== InputOption.heading) {
      const index = getIndex(input, 1);
      setInputFocusId(inputs[index].id);
      removeElement({ id: input.id });
      return;
    }

    if (e.code === codes.arrowUpKey) {
      const index = getIndex(input, -1);
      const nextInput = getInput(index);
      setInputFocusId(nextInput.id);
    }

    if (e.code === codes.arrowDownKey) {
      const index = getIndex(input, 1);
      const nextInput = getInput(index);
      setInputFocusId(nextInput.id);
    }
  }

  function getInput(index) {
    let nextInput = inputs[index];
    return nextInput;
  }

  function getIndex(input, direction = 0) {
    const currentIndex = inputs.findIndex((i) => i.id === input.id);
    let index = currentIndex;

    do {
      index += direction;
      if (index > inputs.length - 1) {
        index = 0;
      }
      if (index < 0) {
        index = inputs.length - 1;
      }
    } while (inputs[index]?.isFocusable === false);

    return index;
  }

  return { onKeyDown };
}

function useInputProps() {
  const { changeInputValue, inputFocusId } = useInputActions();
  const inputRef = useRef({});
  const { onKeyDown } = useKeyboardEvents();

  useEffect(() => {
    inputRef.current &&
      inputRef?.current[inputFocusId] &&
      inputRef.current[inputFocusId].focus();
  }, [inputFocusId]);

  useEffect(() => {
    if (!inputRef.current) return;

    const textAreas = Object.values(inputRef.current).filter(
      (e) => e.tagName === "TEXTAREA"
    );

    textAreas.forEach((ele) => {
      ele.style.height = "auto";
      ele.style.height = ele.scrollHeight + "px";
    });
  }, [inputRef]);

  function attachProps(input) {
    return {
      ref: (e) => (inputRef.current[input.id] = e),
      onKeyDown: (e) => onKeyDown(e, input),
      value: input?.state?.value || "",
      onChange: (e) => {
        if (e.target.tagName === "TEXTAREA") {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }
        changeInputValue({ id: input.id, value: e.target.value });
      },
      required: input?.isRequired || false,
    };
  }

  return { attachProps };
}

function Input(props) {
  const { attachProps } = useInputProps();
  const { input, ...otherProps } = props;

  return props.type === "textarea" ? (
    <textarea {...attachProps(props.input)} {...otherProps} />
  ) : (
    <input {...attachProps(props.input)} {...otherProps} />
  );
}

function InputField({ input }) {
  return (
    <>
      {input.name === InputOption.heading && (
        <HeadingInput input={input} placeholder={input.value} />
      )}

      {input.name === InputOption.title && (
        <InputWrapper input={input}>
          <TitleInput input={input} placeholder={input.value} />
        </InputWrapper>
      )}

      {input.name === InputOption.description && (
        <InputWrapper input={input}>
          <DescriptionInput input={input} placeholder={input.value} />
        </InputWrapper>
      )}

      {input.name === InputOption.paragraph && (
        <InputWrapper input={input}>
          <ParagraphInput input={input} placeholder={input.value} />
        </InputWrapper>
      )}

      {input.name === InputOption.list && (
        <InputWrapper
          input={input}
          inputFooter={<ListFooterButtons id={input.id} type={input.type} />}
        >
          <List input={input} />
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
              {isUrlValid(input?.state?.value) && (
                <LinkPreview url={input.state.value} useCache={false} />
              )}
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
  return <Input input={input} placeholder="Image URL" />;
}

function ListFooterButtons({ id, type }) {
  const { addListElement, changeListType } = useInputActions();

  return (
    <>
      <button onClick={() => addListElement({ parentId: id })} type="button">
        <UseSvg type="add" />
      </button>
      <div>
        <label htmlFor="list_type">type:</label>

        <select
          id="list_type"
          value={type || listTypes.default}
          onChange={(e) => {
            changeListType({ id, type: e.target.value });
          }}
        >
          {Object.keys(listTypes).map((type) => (
            <option key={type} value={listTypes[type]}>
              {listTypes[type]}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export function HeadingInput({ input, placeholder }) {
  return (
    <Input
      className={styles.heading}
      input={input}
      placeholder={placeholder}
      type="text"
    ></Input>
  );
}

function TitleInput({ input, placeholder }) {
  return (
    <Input
      input={input}
      className={styles.title}
      placeholder={placeholder}
      type="text"
    ></Input>
  );
}

function DescriptionInput({ input, placeholder }) {
  return (
    <Input
      input={input}
      className={styles.description}
      placeholder={placeholder}
      type="text"
    ></Input>
  );
}

function ParagraphInput({ input, placeholder }) {
  return (
    <Input input={input} placeholder={placeholder} type="textarea"></Input>
  );
}

function List({ input }) {
  const { id } = input;
  return (
    <Droppable droppableId={input.id} type={"list"}>
      {(provided, snapshot) => (
        <ul
          className={styles.list}
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            ...getStyle(provided.droppableProps.style, snapshot),
            listStyle: input.type === listTypes.checked ? "none" : "initial",
          }}
        >
          <GetListChildren parentId={id} type={input.type} />
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
    >
      {show && (
        <div className={styles.dragHandle}>
          <button type="button">
            <UseSvg type="drag-handle" />
          </button>
        </div>
      )}
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

function GetListChildren({ parentId, type }) {
  const { inputs } = useInputs();
  const { changeInputChecked } = useInputActions();
  const children = inputs.filter((e) => e.parentId === parentId);

  return children.map((input, index) => (
    <Draggable
      key={input.id}
      draggableId={input.id}
      index={inputs.findIndex((e) => e.id === input.id)}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={input.id}
        >
          <li>
            {type === listTypes.checked && (
              <input
                className={styles.listCheckbox}
                type="checkbox"
                checked={input.state?.checked || false}
                onChange={(e) =>
                  changeInputChecked({
                    id: input.id,
                    checked: e.target.checked,
                  })
                }
              />
            )}
            <ListInputWrapper input={input}>
              <Input
                input={input}
                placeholder={input.value + " " + (index + 1)}
                type="text"
              ></Input>
            </ListInputWrapper>
          </li>
        </div>
      )}
    </Draggable>
  ));
}

function LinkInput({ input }) {
  const { changeInputValue } = useInputActions();
  const { attachProps } = useInputProps();
  return (
    <>
      <input {...attachProps(input)} placeholder={"URL"} type="text"></input>
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
