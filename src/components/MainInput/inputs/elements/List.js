import React from "react";
import Button from "./Button";

function List({ list, input, valueUpdater, removeListInput }) {
  return (
    <div className="list-container" id={list.id}>
      {React.createElement(list.tag, {
        ...list.attr,
        "data-id": list.id,
        name: input.name,
        onChange: valueUpdater,
        value: list.inputValue,
      })}

      <Button attr={{ id: list.id, onClick: removeListInput }} text="remove" />
    </div>
  );
}

export default List;
