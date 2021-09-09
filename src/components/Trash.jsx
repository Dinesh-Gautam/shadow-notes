import React from "react";
import { useData } from "../context/DatabaseContext";
import DropDown from "./elements/DropDown";
import Loading from "./elements/Loading";
import Separator from "./elements/Separator";
import UseSvg from "./elements/UseSvg";
import Button from "./MainInput/inputs/elements/Button";
import OutputTemplet from "./MainOutput/OutputTemplet";

function Trash({ trashData, displayState, setdisplayState }) {
  const { updateData_firestore, setundoTrigger } = useData();

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

      <div className="trash_content_container">
        <div className="trash_content">
          {!trashData ? (
            Array(10)
              .fill("")
              .map((e, i) => <Loading key={i} type="simple-card" />)
          ) : trashData.length > 0 ? (
            trashData.map(({ data, id, deletedOn }) => {
              const headingText = data.find(
                (data) => data.name === "heading_input_value"
              );
              const DropdownBackgroundColor = data.find(
                (data) => data.name === "color_input_value"
              );
              return (
                <DropDown
                  key={id}
                  id={id}
                  extraButtons={
                    <div className="dropdown_extraButtons">
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
                      <Separator type="vertical-medium" />
                      <button
                        onClick={() => {
                          setundoTrigger((prev) => {
                            return { trigger: true, id: [...prev.id, id] };
                          });

                          document.getElementById(id).style.display = "none";
                        }}
                      >
                        {<UseSvg type="trash" />}
                      </button>
                    </div>
                  }
                  DropdownBackgroundColor={
                    DropdownBackgroundColor &&
                    DropdownBackgroundColor.inputValue
                  }
                  mainText={headingText.inputValue}
                >
                  <OutputTemplet
                    deletedOn={deletedOn}
                    isInTrash={true}
                    userData={data}
                  />
                </DropDown>
              );
            })
          ) : (
            <span>Nothing in the Trash</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trash;
