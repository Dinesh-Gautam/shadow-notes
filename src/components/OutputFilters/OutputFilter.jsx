import React from "react";
import TrashBtn from "./filterComponents/TrashBtn";
import ColorFilter from "./filterComponents/ColorFilter";
import SearchFilter from "./filterComponents/SearchFilter";
import { useData } from "../../context/DatabaseContext";
import Button from "../MainInput/inputs/elements/Button";
import UseSvg from "../elements/UseSvg";

function OutputFilter({ userDisplay, setuserDisplay }) {
  const { trashData, settrashData, userData, setfiltererdUserData } = useData();
  return (
    <>
      <div className="search_filters">
        <TrashBtn data={trashData} setData={settrashData} />
        {userData &&
          userData.filter((e) =>
            e.data.some((i) => i.name === "color_input_value")
          ).length > 0 && (
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
          )}
        {userData && userData.length > 0 && (
          <SearchFilter setData={setfiltererdUserData} />
        )}
        <Button
          attr={{
            className: "user-info-btn",
            onClick: () => {
              setuserDisplay((prev) => !prev);
            },
          }}
          text={
            userDisplay ? <UseSvg type="close" /> : <UseSvg type="moreInfo" />
          }
        />
      </div>
    </>
  );
}

export default OutputFilter;
