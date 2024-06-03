import React, { createContext, useContext, useMemo, useState } from "react";
import inputStyles from "styles/components/input/inputField.module.scss";
import { useData } from "../../context/DatabaseContext";
import { input, listTypes } from "../MainInput/inputs/inputOptions";
import { LinkPreview } from "../elements/LinkPreview";

const highlightTextContext = createContext();

export function HighlightTextOnSearchMatch({ text }) {
  const { filterData } = useData() ?? {};

  const { disableHighLightingText } = useContext(highlightTextContext) ?? {};

  if (disableHighLightingText || text === undefined) return text;

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
            backgroundColor: "var(--text-selection-backgroundColor)",
            color: "var(--text-selection-color)",
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
  simple = false,
  docId,
  isInTrash,
  userData,
  publishDate,
  deletedOn,
}) {
  const { updateData_fireStore } = useData() ?? {};
  const [disableHighLightingText, setDisableHighLightingText] =
    useState(simple);

  const notParentFields = useMemo(
    () => userData.filter((data) => !data.parentId),
    [userData]
  );

  return (
    <div className="OutputTemplate_wraper">
      {notParentFields.map((data) => {
        const { name, value, state, id, type } = data;
        const inputValue = state?.value;
        const additionalValue = state;

        let url = null;
        if (name === input.link) {
          try {
            url = new URL(inputValue);
          } catch {
            url = { hostname: "Invalid Url", href: "" };
          }
        }

        return (
          <highlightTextContext.Provider
            key={id}
            value={{ disableHighLightingText, setDisableHighLightingText }}
          >
            {name === input.heading || name === input.color || (
              <div className="label_container">
                <label>
                  {additionalValue?.labelValue === undefined ||
                  additionalValue?.labelValue === null
                    ? value
                    : additionalValue?.labelValue}
                </label>
              </div>
            )}
            {name === input.title && (
              <h2>{<HighlightTextOnSearchMatch text={inputValue} />}</h2>
            )}
            {name === input.description && (
              <h5>{<HighlightTextOnSearchMatch text={inputValue} />}</h5>
            )}
            {name === input.paragraph && (
              <p>{<HighlightTextOnSearchMatch text={inputValue} />}</p>
            )}
            {name === input.link && (
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
            {name === input.image && (
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

                        <HighlightTextOnSearchMatch text={data?.state?.value} />
                      </li>
                    );
                  })}
              </ul>
            )}
          </highlightTextContext.Provider>
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
