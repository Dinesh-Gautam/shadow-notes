import React from "react";
import { headingId, edit, useInputs } from "../MainInput/InputContext";
import Button from "../MainInput/inputs/elements/Button";
import { inputOptions } from "../MainInput/inputs/inputOptions";
import { v4 as uuidv4 } from "uuid";
function OutputTemplet({ userData, publishDate, docId }) {
  const { inputsDispatch, inputValueDispatch } = useInputs();

  const editButtonHandler = () => {
    edit.isEditMode = true;
    edit.editParameters = { docId };

    inputsDispatch({
      type: "clear",
    });
    inputValueDispatch({
      type: "clear",
    });

    userData.forEach((e, index) => {
      const { inputValue, name, id } = e;

      const selectedInput = inputOptions.find((input) => input.name === name);

      const firsInputId = uuidv4();

      if (selectedInput) {
        switch (name) {
          case "list_input_value":
            inputsDispatch({
              type: "addElement",
              payload: {
                id: id,
                selectedInput: {
                  ...selectedInput,
                  inner: [{ ...selectedInput.inner[0], id: firsInputId }],
                },
              },
            });

            e.inner.forEach((listInputValue, index, arr) => {
              const uid = uuidv4();

              if (index < 1) {
                inputValueDispatch({
                  type: "listValue",
                  payload: {
                    parentId: id,
                    childrenId: firsInputId,
                    value: listInputValue,
                  },
                });
              } else {
                inputsDispatch({
                  payload: { id, listId: uid },
                  type: "addListElement",
                });
                inputValueDispatch({
                  type: "listValue",
                  payload: {
                    parentId: id,
                    childrenId: uid,
                    value: listInputValue,
                  },
                });
              }
            });
            break;

          default:
            inputsDispatch({
              type: "addElement",
              payload: { id: id, selectedInput },
            });
            inputValueDispatch({
              type: "normalValue",
              payload: { id: id, value: inputValue },
            });
            break;
        }
      } else {
        if (name === "heading_input_value") {
          console.log(headingId);
          inputValueDispatch({
            type: "normalValue",
            payload: { id: headingId, value: inputValue },
          });
        }
      }
    });
  };

  return (
    <div className="outputTemplet_wraper">
      {userData.map((data) => {
        const { name, value, inputValue, id, inner } = data;
        const url = name === "link_input_value" && new URL(inputValue);
        return (
          <React.Fragment key={id}>
            {name === "heading_input_value" || name === "color_input_value" || (
              <label>{value}</label>
            )}
            {name === "title_input_value" && <h2>{inputValue}</h2>}
            {name === "description_input_value" && <h5>{inputValue}</h5>}
            {name === "Pragraph_input_value" && <p>{inputValue}</p>}
            {name === "link_input_value" && (
              <a href={url.href}>{url.hostname}</a>
            )}
            {name === "image_input_value" && (
              <img src={inputValue} alt={inputValue} />
            )}
            {name === "list_input_value" && (
              <ul className="list_input_ul">
                {inner.map((listValue, index) => (
                  <li key={index}>{listValue}</li>
                ))}
              </ul>
            )}
          </React.Fragment>
        );
      })}
      <div className="output_footer">
        <Button
          attr={{
            onClick: editButtonHandler,
          }}
          text="Edit"
        />
        <div className="publishing-date">
          <h6>Published on:</h6>
          <span>{publishDate && publishDate.toDate().toDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default OutputTemplet;
