import React from "react";
import ColorFilter from "./filterComponents/ColorFilter";
import SearchFilter from "./filterComponents/SearchFilter";
import { useData } from "../../context/DatabaseContext";
import { input } from "../MainInput/inputs/inputOptions";
import styles from "./OutputFilter.module.scss";
import FilterButton from "./filterComponents/FilterButton";

function OutputFilter({ userDisplay, setuserDisplay }) {
  const { userData } = useData();
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
            />
          )}
        {userData && userData.length > 0 && <SearchFilter />}
        <FilterButton />
      </div>
    </>
  );
}

export default OutputFilter;
