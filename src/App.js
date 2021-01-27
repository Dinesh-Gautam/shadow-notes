import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const inputOptions = [
  {
    value: "Title",
    name: "tile_input_value",
    inputValue: "",
    attr: { type: "text" },
    tag: "input",
  },
  {
    value: "Description",
    name: "description_input_value",
    inputValue: "",
    attr: { type: "text" },
    tag: "input",
  },
  {
    value: "Paragraph",
    name: "Pragraph_input_value",
    inputValue: "",
    attr: { type: "text" },
    tag: "textarea",
  },
  {
    value: "Link",
    name: "link_input_value",
    inputValue: "",
    attr: { type: "url" },
    tag: "input",
  },
  {
    value: "Image",
    name: "image_input_value",
    inputValue: "",
    attr: { type: "url" },
    tag: "input",
  },
  {
    value: "List",
    name: "list_input_value",
    attr: {},
    tag: "div",
    inner: [
      {
        id: uuidv4(),
        attr: { type: "text" },
        inputValue: "",
        tag: "input",
      },
    ],
  },
];

function App() {
  const [inputSelect, setinputSelect] = useState("title");
  const [inputs, setinputs] = useState([
    {
      value: "Heading",
      id: uuidv4(),
      name: "heading_input_value",
      inputValue: "",
      attr: { type: "text" },
      tag: "input",
    },
  ]);
  const [inputValues, setinputValues] = useState({});

  const AddListInput = (e) => {
    e.preventDefault();
    setinputs((prev) => {
      const listAdded = prev.map((input) => {
        return input.id === e.target.name
          ? {
              ...input,
              inner: [
                ...input.inner,
                {
                  id: uuidv4(),
                  attr: { type: "text" },
                  inputValue: "",
                  tag: "input",
                },
              ],
            }
          : input;
      });
      return [...listAdded];
    });
  };

  const removeElement = (e) => {
    e.preventDefault();
    setinputs((prev) =>
      prev.filter((input) => input.id !== e.target.dataset.id)
    );
  };

  const removeListInput = (e) => {
    e.preventDefault();
    const parentId = e.target.parentElement.parentElement.id;
    setinputs((prev) => {
      const listRemoved = prev.map((input) => {
        return input.id === parentId
          ? {
              ...input,
              inner: input.inner.filter((list) => list.id !== e.target.id),
            }
          : input;
      });
      return [...listRemoved];
    });
  };

  const valueUpdater = (e) => {
    setinputs((prev) => {
      const updatedinputs = prev.map((inputs) => {
        if (e.target.name === "list_input_value") {
          if (e.target.parentElement.parentElement.id === inputs.id) {
            return {
              ...inputs,
              inner: inputs.inner.map((list) =>
                list.id === e.target.dataset.id
                  ? { ...list, inputValue: e.target.value }
                  : list
              ),
            };
          } else {
            return inputs;
          }
        } else {
          return inputs.id === e.target.id
            ? { ...inputs, inputValue: e.target.value }
            : inputs;
        }
      });
      return updatedinputs;
    });
  };

  const inputAdderHandler = () => {
    const selectedInput = inputOptions.find(
      (input) => input.value.toLowerCase() === inputSelect.toLowerCase()
    );
    setinputs((prev) => {
      return [...prev, { ...selectedInput, id: uuidv4() }];
    });
  };
  return (
    <>
      <form>
        {inputs.map((input) => {
          return (
            <div key={input.id}>
              <label htmlFor={input.name}>{input.value}</label>
              {React.createElement(
                input.tag,
                {
                  ...input.attr,
                  id: input.id,
                  name: input.name,
                  onChange: valueUpdater,
                  value: input.inputValue,
                },
                input.inner &&
                  input.inner.map((list) => {
                    return (
                      <div id={list.id} key={list.id}>
                        {React.createElement(list.tag, {
                          ...list.attr,
                          "data-id": list.id,
                          name: input.name,
                          onChange: valueUpdater,
                          value: list.inputValue,
                        })}
                        <button onClick={removeListInput} id={list.id}>
                          remove
                        </button>
                      </div>
                    );
                  })
              )}
              {input.inner && (
                <button name={input.id} onClick={AddListInput}>
                  add
                </button>
              )}
              {input.value === "Heading" || (
                <button onClick={removeElement} data-id={input.id}>
                  remove Element
                </button>
              )}
            </div>
          );
        })}
      </form>
      <select
        value={inputSelect}
        onChange={(e) => setinputSelect(e.target.value)}
        name="inputs_options"
      >
        {inputOptions.map((inputType) => (
          <option key={inputType.name} value={inputType.value}>
            {inputType.value}
          </option>
        ))}
      </select>
      <button onClick={inputAdderHandler}>Add</button>
    </>
  );
}

export default App;
