import React from "react";
import { useData } from "../../context/DatabaseContext";
import DropDown from "../elements/DropDown";
import OutputTemplet from "./OutputTemplet";
import AdditionalButtons from "./smallComponents/AdditionalButtons";

function MainOutput() {
  const { userData } = useData();

  return (
    <div className="mainoutput_container">
      <div className="mainoutput_wraper">
        {userData &&
          userData.map(({ data, id }) => {
            const headingText = data.find(
              (data) => data.name === "heading_input_value"
            );
            const DropdownBackgroundColor = data.find(
              (data) => data.name === "color_input_value"
            );
            return (
              <DropDown
                key={id}
                extraButtons={<AdditionalButtons docId={id} />}
                DropdownBackgroundColor={
                  DropdownBackgroundColor && DropdownBackgroundColor.inputValue
                }
                mainText={headingText.inputValue}
              >
                <OutputTemplet userData={data} />
              </DropDown>
            );
          })}
      </div>
    </div>
  );
}

export default MainOutput;
