import React from "react";
import { useData } from "../../context/DatabaseContext";

function HighlightTextOnSearchMatch({ text }) {
  const { filtererdUserData } = useData();
  if (filtererdUserData.searchFilter) {
    const regex = new RegExp(`${filtererdUserData.searchFilter}`, "gi");
    const search = text.search(regex);
    const startIndex = search;
    if (startIndex < 0) return text;
    const textLength = filtererdUserData.searchFilter.length;
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

function OutputTemplet({ docId, isInTrash, userData, publishDate, deletedOn }) {
  const { updateData_firestore } = useData();
  return (
    <div className="outputTemplet_wraper">
      {userData
        .filter((data) => !data.parentId)
        .map((data) => {
          const { name, value, state, id } = data;
          const inputValue = state?.value;
          const additionalValue = state?.labelValue;

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
              {name === "Pragraph_input_value" && (
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
              {name === "list_input_value" && (
                <ul className="list_input_ul">
                  {userData
                    .filter((e) => e.parentId === id)
                    .map((data) => {
                      return (
                        <li>
                          <HighlightTextOnSearchMatch text={data.state.value} />
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

export default OutputTemplet;
