import React, { useContext } from "react";
import Button from "./elements/Button";
import List from "./elements/List";
import { input_context } from "../InputContext";
import { v4 as uuidv4 } from "uuid";

function InputField({ input }) {
  const { setinputs } = useContext(input_context);

  const addListInput = (e) => {
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

  return (
    <div className="input_box">
      <div className="input_box_header">
        <label className="input_label" htmlFor={input.name}>
          {input.value}
        </label>
        {input.value === "Heading" || (
          <Button
            attr={{ onClick: removeElement, "data-id": input.id }}
            text="Remove Element"
          />
        )}
      </div>
      <div className="input">
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
                <List
                  key={list.id}
                  list={list}
                  input={input}
                  valueUpdater={valueUpdater}
                  removeListInput={removeListInput}
                />
              );
            })
        )}
      </div>
      <div className="list_control_btns">
        {input.inner && (
          <Button attr={{ name: input.id, onClick: addListInput }} text="add" />
        )}
      </div>
    </div>
  );
}

export default InputField;
