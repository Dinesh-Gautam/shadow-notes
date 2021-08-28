import React from "react";
import UseSvg from "../../../elements/UseSvg";
import Button from "./Button";

function List({
  index,
  list,
  input,
  inputValueDispatch,
  inputsDispatch,
  listInputValue,
}) {
  return (
    <div className="list-container" id={list.id}>
      {React.createElement(list.tag, {
        ...list.attr,
        id: list.id,
        "data-id": list.id,
        placeholder: `${input.value} ${index}`,
        name: input.name,
        onChange: (e) =>
          inputValueDispatch({
            type: "listValue",
            payload: {
              parentId: input.id,
              childrenId: list.id,
              value: e.target.value,
            },
          }),
        value: listInputValue,
      })}
      {index > 0 && (
        <Button
          attr={{
            id: list.id,
            onClick: () => {
              inputsDispatch({
                payload: { parentId: input.id, id: list.id },
                type: "removeListElement",
              });
            },
          }}
          text={<UseSvg type="remove" />}
        />
      )}
    </div>
  );
}

export default List;
