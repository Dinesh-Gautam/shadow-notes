import React from "react";
import TrashBtn from "../TrashBtn";
import ColorFilter from "./filterComponents/ColorFilter";
import SearchFilter from "./filterComponents/SearchFilter";
import { useData } from "../../context/DatabaseContext";
import Button from "../MainInput/inputs/elements/Button";
import UseSvg from "../elements/UseSvg";
import { input } from "../MainInput/inputs/inputOptions";
import styles from "./OutputFilter.module.scss";

function OutputFilter({ userDisplay, setuserDisplay }) {
  const { userData, setfilterData } = useData();
  return (
    <>
      <div className={styles.filters}>
        {userData &&
          userData.filter((e) => e.data.some((i) => i.name === input.color))
            .length > 0 && (
            <ColorFilter
              appliedColors={
                userData &&
                userData
                  .map(({ data }) => {
                    const colorValue = data.find(
                      (dataValue) => dataValue.name === input.color
                    );
                    if (colorValue) {
                      return colorValue.state.value;
                    } else {
                      return false;
                    }
                  })
                  .filter((e) => e)
              }
              data={userData}
              setData={setfilterData}
            />
          )}
        {userData && userData.length > 0 && (
          <SearchFilter setData={setfilterData} />
        )}
      </div>
    </>
  );
}

export default OutputFilter;
