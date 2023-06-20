import React from "react";
import { useData } from "../context/DatabaseContext";
import DropDown from "./elements/DropDown/DropDown";
import Loading from "./elements/Loading";
import Separator from "./elements/Separator";
import UseSvg from "./elements/UseSvg";
import Button from "./MainInput/inputs/elements/Button";
import OutputTemplate from "./MainOutput/OutputTemplate";

function Trash({ trashData }) {
  const { updateData_fireStore, setundoTrigger } = useData();

  return (
    <div id="trash">
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
                          updateData_fireStore(id, data);
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
                    DropdownBackgroundColor.state.value
                  }
                  mainText={headingText.state.value}
                >
                  <OutputTemplate
                    deletedOn={deletedOn}
                    isInTrash={true}
                    userData={data}
                    docId={id}
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
