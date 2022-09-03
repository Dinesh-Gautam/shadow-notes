import React from "react";
import { useData } from "../../context/DatabaseContext";
import DropDown from "../elements/DropDown";
import Loading from "../elements/Loading";
import Button from "../MainInput/inputs/elements/Button";
import OutputTemplet from "./OutputTemplet";
import AdditionalButtons from "./smallComponents/AdditionalButtons";

function MainOutput() {
  const { filtererdUserData, userData: originalData } = useData();
  console.log(originalData);
  const outputFilterString = "Results For";
  const userData =
    Object.keys(filtererdUserData).length > 0
      ? originalData &&
        originalData.filter(({ data }) => {
          return Object.keys(filtererdUserData).every((filter) => {
            if (filter === "colorFIlter") {
              return data.some(
                (dataFields) =>
                  dataFields.name === "color_input_value" &&
                  dataFields.inputValue === filtererdUserData.colorFIlter
              );
            } else if (filter === "searchFilter") {
              return data.some((dataFields) => {
                if (dataFields.name === "list_input_value") {
                  return dataFields.inner.some((listValue) => {
                    return RegExp(filtererdUserData[filter].toLowerCase()).test(
                      listValue.toLowerCase()
                    );
                  });
                } else {
                  return RegExp(filtererdUserData[filter].toLowerCase()).test(
                    dataFields.inputValue.toLowerCase()
                  );
                }
              });
            }

            return false;
          });
        })
      : originalData;

  return (
    <div className="mainoutput_container">
      {Object.keys(filtererdUserData).length > 0 ? (
        <span className="output_filter_label">
          {filtererdUserData.colorFIlter && (
            <div className="color_filter_container output">
              {outputFilterString}
              <Button
                attr={{
                  value: filtererdUserData.colorFIlter,
                  name: "color_input_value",
                  style: { backgroundColor: filtererdUserData.colorFIlter },
                  className: "random-color-btn colro-btn",
                }}
              />
            </div>
          )}

          {filtererdUserData.searchFilter &&
            `${
              Object.keys(filtererdUserData).length < 2
                ? outputFilterString
                : " and"
            } "${filtererdUserData.searchFilter}"`}
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
              (data) => data.name === "heading_input_value"
            );
            const DropdownBackgroundColor = data.find(
              (data) => data.name === "color_input_value"
            );
            return (
              <DropDown
                key={id}
                extraButtons={<AdditionalButtons userData={data} docId={id} />}
                DropdownBackgroundColor={
                  DropdownBackgroundColor && DropdownBackgroundColor.inputValue
                }
                mainText={headingText.inputValue}
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
