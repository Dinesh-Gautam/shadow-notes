import React, { useState } from "react";
import UseSvg from "../../../elements/UseSvg";
import Button from "./Button";
// import { gsap } from "gsap";
// import { Draggable } from "gsap/all";

import { Draggable } from "react-beautiful-dnd";
/* function List({
  index,
  list,
  input,
  inputValueDispatch,
  inputsDispatch,
  listInputValue,
}) {
  const [dragDisplay, setdragDisplay] = useState(false);
  const listDragRef = useRef(null);
  const listEleRef = useRef(null);
  const [dragState, setdragState] = useState(false);

  const getDragAfterElement = useCallback((container, y) => {
    const draggableElements = [
      ...container.querySelectorAll(".list-container:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }, []);

  const dragOverHandler = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setdragDisplay(false);
    const container = e.target.closest(".list_input_box");
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      console.time();
      container.insertBefore(draggable, afterElement);
      console.timeEnd();
    }
  }, []);

  useEffect(() => {
    // gsap.registerPlugin(Draggable);
    // Draggable.create(
    //   listDragRef.current,
    //   {
    //     type: "x,y",
    //     bounds: ".list-container",
    //     inertia: true,
    //   },
    //   []
    // );

    const dragContainer = listDragRef.current.closest(".list_input_box");

    dragContainer.addEventListener("dragover", dragOverHandler);

    return () => {
      // console.log("clearing drag event");
      dragContainer.removeEventListener("dragover", dragOverHandler);
    };
  }, []);
  return (
    <div
      ref={listEleRef}
      onMouseEnter={() => {
        setdragDisplay(true);
      }}
      onMouseLeave={() => {
        setdragDisplay(false);
      }}
      className="list-container"
      id={list.id}
      draggable={dragState}
      onDragStart={(e) => {
        e.target.classList.add("dragging");
      }}
      onDragEnd={(e) => {
        e.target.classList.remove("dragging");
      }}
    >
      <div
        ref={listDragRef}
        style={{ display: dragDisplay ? "flex" : "none" }}
        className="list-drag"
        onMouseEnter={() => {
          setdragState(true);
        }}
        onMouseLeave={() => {
          setdragState(false);
        }}
      >
        <UseSvg type="drag" />
      </div>
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
} */

function List({
  index,
  list,
  input,
  inputValueDispatch,
  inputsDispatch,
  listInputValue,
}) {
  const [dragDisplay, setdragDisplay] = useState(false);
  return (
    <Draggable key={list.id} draggableId={list.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onMouseEnter={() => {
            setdragDisplay(true);
          }}
          onMouseOver={(e) => {
            dragDisplay || setdragDisplay(true);
          }}
          onMouseLeave={() => {
            setdragDisplay(false);
          }}
          className="list-container"
          id={list.id}
        >
          <div
            {...provided.dragHandleProps}
            style={{ display: dragDisplay ? "flex" : "none" }}
            className="list-drag"
          >
            <UseSvg type="drag-handle" />
          </div>
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
          {input.inner.length > 1 && (
            <Button
              attr={{
                style: { display: dragDisplay ? "flex" : "none" },
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
      )}
    </Draggable>
  );
}

export default List;
