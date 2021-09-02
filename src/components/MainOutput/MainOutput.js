import React from "react";
import { useData } from "../../context/DatabaseContext";
import DropDown from "../elements/DropDown";
import OutputTemplet from "./OutputTemplet";
import AdditionalButtons from "./smallComponents/AdditionalButtons";

function MainOutput() {
  const { filtererdUserData, userData: originalData } = useData();

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
          });
        })
      : originalData;

  return (
    <div className="mainoutput_container">
      <div className="mainoutput_wraper">
        {userData &&
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
                  docId={id}
                />
              </DropDown>
            );
          })}
      </div>
    </div>
  );
}

export default MainOutput;
