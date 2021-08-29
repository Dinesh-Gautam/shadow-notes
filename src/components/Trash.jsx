import React from "react";
import { useData } from "../context/DatabaseContext";
import DropDown from "./elements/DropDown";
import UseSvg from "./elements/UseSvg";
import Button from "./MainInput/inputs/elements/Button";
import { inputOptions } from "./MainInput/inputs/inputOptions";
import OutputTemplet from "./MainOutput/OutputTemplet";

function Trash({ trashData, displayState, setdisplayState }) {
  const { updateData_firestore } = useData();
  return (
    <div id="trash" style={{ display: displayState }}>
      <div className="trash_header">
        <h1>Trash</h1>
        <Button
          attr={{
            onClick: (e) => {
              setdisplayState("none");
            },
          }}
          text={<UseSvg type="close" />}
        />
      </div>
      <div className="trash_content">
        {trashData && trashData.length > 0 ? (
          trashData.map(({ data, id }) => {
            const headingText = data.find(
              (data) => data.name === "heading_input_value"
            );
            const DropdownBackgroundColor = data.find(
              (data) => data.name === "color_input_value"
            );
            return (
              <DropDown
                key={id}
                extraButtons={
                  <button
                    onClick={() => {
                      const data = {
                        delete: false,
                      };
                      updateData_firestore(id, data);
                    }}
                  >
                    Restore
                  </button>
                }
                DropdownBackgroundColor={
                  DropdownBackgroundColor && DropdownBackgroundColor.inputValue
                }
                mainText={headingText.inputValue}
              >
                {data.some((e) => {
                  return inputOptions.some(
                    (option) =>
                      option.name === e.name && e.name !== "color_input_value"
                  );
                }) && <OutputTemplet userData={data} />}
              </DropDown>
            );
          })
        ) : (
          <span>Nothing in the Trash</span>
        )}
      </div>
    </div>
  );
}

export default Trash;
