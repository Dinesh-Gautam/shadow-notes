import React from "react";
import { useData } from "../../context/DatabaseContext";
import DropDown from "../elements/DropDown/DropDown";
import Loading from "../elements/Loading";
import Button from "../MainInput/inputs/elements/Button";
import OutputTemplet, { HighlightTextOnSearchMatch } from "./OutputTemplet";
import AdditionalButtons from "./smallComponents/AdditionalButtons";
import { input } from "../MainInput/inputs/inputOptions";

function MainOutput() {
  const { filtererdUserData: filteredUserData, userData: originalData } =
    useData();
  console.log(originalData);
  console.log(filteredUserData);
  const outputFilterString = "Results For";
  const userData =
    Object.keys(filteredUserData).length > 0
      ? originalData &&
        originalData.filter(({ data }) => {
          return Object.keys(filteredUserData).every((filter) => {
            if (filter === "colorFIlter") {
              return data.some(
                (dataFields) =>
                  dataFields.name === input.color &&
                  dataFields.state.value === filteredUserData.colorFIlter
              );
            } else if (filter === "searchFilter") {
              return data.some((dataFields) => {
                return RegExp(filteredUserData[filter].toLowerCase()).test(
                  dataFields.state?.value.toLowerCase()
                );
              });
            }

            return false;
          });
        })
      : originalData;

  return (
    <div className="mainoutput_container">
      {Object.keys(filteredUserData).length > 0 ? (
        <span className="output_filter_label">
          {filteredUserData.colorFIlter && (
            <div className="color_filter_container output">
              {outputFilterString}
              <Button
                attr={{
                  value: filteredUserData.colorFIlter,
                  name: "color_input_value",
                  style: { backgroundColor: filteredUserData.colorFIlter },
                  className: "random-color-btn colro-btn",
                }}
              />
            </div>
          )}

          {filteredUserData.searchFilter &&
            `${
              Object.keys(filteredUserData).length < 2
                ? outputFilterString
                : " and"
            } "${filteredUserData.searchFilter}"`}
        </span>
      ) : null}
      <div className="mainoutput_wraper">
        {!userData ? (
          Array(10)
            .fill("")
            .map((e, i) => <Loading key={i} type="simple-card" />)
        ) : userData.length < 1 ? (
          <span> Nothing Here. </span>
        ) : (
          userData.map(({ data, id, publishDate }) => {
            const headingText = data.find(
              (data) => data.name === input.heading
            );
            const DropdownBackgroundColor = data.find(
              (data) => data.name === input.color
            );
            return (
              <DropDown
                key={id}
                extraButtons={<AdditionalButtons userData={data} docId={id} />}
                DropdownBackgroundColor={
                  DropdownBackgroundColor && DropdownBackgroundColor.state.value
                }
                mainText={
                  <HighlightTextOnSearchMatch text={headingText.state.value} />
                }
              >
                <OutputTemplet
                  publishDate={publishDate}
                  userData={data}
                  completeData={userData}
                  docId={id}
                />
              </DropDown>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MainOutput;
