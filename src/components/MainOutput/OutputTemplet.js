import React from "react";

function OutputTemplet({ isInTrash, userData, publishDate, deletedOn }) {
  return (
    <div className="outputTemplet_wraper">
      {userData.map((data) => {
        const { name, value, inputValue, id, inner, additionalValue } = data;
        console.log(additionalValue);
        let url = null;
        if (name === "link_input_value") {
          try {
            url = new URL(inputValue);
          } catch {
            url = { hostname: "Invalid Url", href: "" };
          }
        }
        return (
          <React.Fragment key={id}>
            {name === "heading_input_value" || name === "color_input_value" || (
              <div className="label_container">
                <label>
                  {additionalValue.labelValue
                    ? additionalValue.labelValue
                    : value}
                </label>
              </div>
            )}
            {name === "title_input_value" && <h2>{inputValue}</h2>}
            {name === "description_input_value" && <h5>{inputValue}</h5>}
            {name === "Pragraph_input_value" && <p>{inputValue}</p>}
            {name === "link_input_value" && (
              <a rel="noreferrer" target="_blank" href={url.href}>
                {url.hostname}
              </a>
            )}
            {name === "image_input_value" && (
              <img loading="lazy" src={inputValue} alt={inputValue} />
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
        <div className="publishing-date">
          <h6>{isInTrash ? "Deleted on:" : "Published on:"}</h6>
          <span>
            {isInTrash
              ? deletedOn && deletedOn.toDate().toDateString()
              : publishDate && publishDate.toDate().toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OutputTemplet;
