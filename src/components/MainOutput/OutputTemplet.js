import React from "react";

function OutputTemplet({ userData }) {
  return (
    <div className="outputTemplet_wraper">
      {userData.map((data) => {
        const { name, value, inputValue, id, inner } = data;
        const url = name === "link_input_value" && new URL(inputValue);
        return (
          <div key={id}>
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
          </div>
        );
      })}
    </div>
  );
}

export default OutputTemplet;
