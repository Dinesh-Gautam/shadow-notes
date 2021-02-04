import React from "react";
import { useData } from "../../context/DatabaseContext";
import DropDown from "../elements/DropDown";
import OutputTemplet from "./OutputTemplet";

function MainOutput() {
  const { userData } = useData();
  return (
    <div className="mainoutput_container">
      {userData &&
        userData.map(({ data, id }) => {
          const { inputValue } = data.find(
            (data) => data.name === "heading_input_value"
          );
          return (
            <DropDown key={id} mainText={inputValue}>
              <OutputTemplet userData={data} />
            </DropDown>
          );
        })}
    </div>
  );
}

export default MainOutput;
