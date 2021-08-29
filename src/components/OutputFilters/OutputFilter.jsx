import React from "react";
import TrashBtn from "./filterComponents/TrashBtn";
import ColorFilter from "./filterComponents/ColorFilter";
import SearchFilter from "./filterComponents/SearchFilter";
import { useData } from "../../context/DatabaseContext";

function OutputFilter() {
  const { trashData, settrashData, userData, setfiltererdUserData } = useData();

  return (
    <div className="search_filters">
      <TrashBtn data={trashData} setData={settrashData} />
      <ColorFilter
        appliedColors={
          userData &&
          userData
            .map(({ data }) => {
              const colorValue = data.find(
                (dataValue) => dataValue.name === "color_input_value"
              );
              if (colorValue) {
                return colorValue.inputValue;
              } else {
                return false;
              }
            })
            .filter((e) => e)
        }
        data={userData}
        setData={setfiltererdUserData}
      />
      <SearchFilter />
    </div>
  );
}

export default OutputFilter;
