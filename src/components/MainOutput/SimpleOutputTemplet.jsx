import React from "react";
import { input, listTypes } from "../MainInput/inputs/inputOptions";
import inputStyles from "../MainInput/inputs/inputField.module.scss";
export function HighlightTextOnSearchMatch({ text }) {
  return text;
}

function SimpleOutputTemplate({
  docId,
  isInTrash,
  userData,
  publishDate,
  deletedOn,
}) {
  return (
    <div className="OutputTemplate_wraper">
      {userData
        .filter((data) => !data.parentId)
        .map((data) => {
          const { name, value, state, id, type } = data;
          const inputValue = state?.value;
          const additionalValue = state;

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
              {name === "heading_input_value" ||
                name === "color_input_value" || (
                  <div className="label_container">
                    <label>
                      {additionalValue?.labelValue === undefined ||
                      additionalValue?.labelValue === null
                        ? value
                        : additionalValue?.labelValue}
                    </label>
                  </div>
                )}
              {name === "title_input_value" && (
                <h2>{<HighlightTextOnSearchMatch text={inputValue} />}</h2>
              )}
              {name === "description_input_value" && (
                <h5>{<HighlightTextOnSearchMatch text={inputValue} />}</h5>
              )}
              {name === input.paragraph && (
                <p>{<HighlightTextOnSearchMatch text={inputValue} />}</p>
              )}
              {name === "link_input_value" && (
                <a rel="noreferrer" target="_blank" href={url.href}>
                  {<HighlightTextOnSearchMatch text={url.hostname} />}
                </a>
              )}
              {name === "image_input_value" && (
                <img loading="lazy" src={inputValue} alt={inputValue} />
              )}

              {}
              {name === input.list && (
                <ul
                  style={{
                    listStyle: type === listTypes.checked ? "none" : "initial",
                  }}
                  className="list_input_ul"
                >
                  {userData
                    .filter((e) => e.parentId === id)
                    .map((data) => {
                      return (
                        <li
                          style={{
                            position: "relative",
                          }}
                          key={data.id}
                        >
                          {type === listTypes.checked && (
                            <input
                              readOnly={true}
                              className={inputStyles.listCheckbox}
                              type="checkbox"
                              checked={data.state.checked ?? false}
                            />
                          )}

                          <HighlightTextOnSearchMatch
                            text={data?.state?.value}
                          />
                        </li>
                      );
                    })}
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

export default SimpleOutputTemplate;
