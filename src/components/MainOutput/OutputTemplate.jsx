import React from "react";
import inputStyles from "styles/components/input/inputField.module.scss";
import { useData } from "../../context/DatabaseContext";
import { input, listTypes } from "../MainInput/inputs/inputOptions";
import { LinkPreview } from "../elements/LinkPreview/LinkPreview";

export function HighlightTextOnSearchMatch({ text }) {
  const { filterData } = useData();
  if (filterData.searchFilter) {
    const regex = new RegExp(`${filterData.searchFilter}`, "gi");
    const search = text.search(regex);
    const startIndex = search;
    if (startIndex < 0) return text;
    const textLength = filterData.searchFilter.length;
    const firstSlice = text.slice(0, startIndex);
    const secondSlice = text.slice(startIndex, startIndex + textLength);
    const thirdSlice = text.slice(startIndex + textLength, text.length);
    return (
      <>
        {firstSlice}
        <span
          style={{
            fontSize: "inherit",
            fontWeight: "inherit",
            backgroundColor: "yellow",
          }}
        >
          {secondSlice}
        </span>
        {thirdSlice}
      </>
    );
  } else {
    return text;
  }
}

function OutputTemplate({
  docId,
  isInTrash,
  userData,
  publishDate,
  deletedOn,
}) {
  const { updateData_fireStore } = useData();
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
                  <div>
                    {state?.valueName ? (
                      <HighlightTextOnSearchMatch text={state?.valueName} />
                    ) : (
                      <HighlightTextOnSearchMatch text={url.hostname} />
                    )}
                    <LinkPreview url={url.href} />
                  </div>
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
                              onChange={(event) => {
                                const updatedData = userData.map((e) =>
                                  e.id === data.id
                                    ? {
                                        ...e,
                                        state: {
                                          ...e.state,
                                          checked: event.target.checked,
                                        },
                                      }
                                    : e
                                );

                                updateData_fireStore(docId, {
                                  data: updatedData,
                                });
                              }}
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

export default OutputTemplate;
