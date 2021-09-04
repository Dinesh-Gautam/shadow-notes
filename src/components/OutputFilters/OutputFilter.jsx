import React, { useState } from "react";
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
        {userData && userData.length > 0 && (
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
            userDisplay ? (
              <UseSvg type="close" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            )
          }
        />
      </div>
    </>
  );
}

export default OutputFilter;
