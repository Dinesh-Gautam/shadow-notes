import React from "react";

function OutputTemplet({ userData }) {
  return (
    <div>
      {userData.map((data) => {
        const { name, value, inputValue, id, inner } = data;

        return (
          <div key={id}>
            {name === "heading_input_value" || <label>{value}</label>}
            {name === "title_input_value" && <h2>{inputValue}</h2>}
            {name === "description_input_value" && <h5>{inputValue}</h5>}
            {name === "list_input_value" && (
              <ul>
                {inner.map((listValue, index) => (
                  <li key={index}>{listValue}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OutputTemplet;
