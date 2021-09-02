import React from "react";
import { useData } from "../../context/DatabaseContext";
import DropDown from "../elements/DropDown";
import OutputTemplet from "./OutputTemplet";
import AdditionalButtons from "./smallComponents/AdditionalButtons";

function MainOutput() {
  const { filtererdUserData, userData: originalData } = useData();
  const userData =
    filtererdUserData.length > 0
      ? originalData.filter(({ data }) => {
          return data.find(
            (foundedValue) =>
              foundedValue.inputValue === filtererdUserData[0].colorFIlter
          );
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
