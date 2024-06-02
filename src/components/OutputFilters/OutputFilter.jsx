import React, { useMemo } from "react";
import ColorFilter from "./filterComponents/ColorFilter";
import SearchFilter from "./filterComponents/SearchFilter";
import { useData } from "../../context/DatabaseContext";
import { input } from "../MainInput/inputs/inputOptions";
import styles from "./OutputFilter.module.scss";
import FilterButton from "./filterComponents/FilterButton";

function OutputFilter() {
  const { userData } = useData();

  const colorNoteAvailable = useMemo(
    () =>
      userData?.filter((e) => e.data.some((i) => i.name === input.color))
        .length > 0,

    [userData]
  );

  const appliedColors = useMemo(
    () =>
      userData
        ?.map(({ data }) => {
          const colorValue = data.find(
            (dataValue) => dataValue.name === input.color
          );

          return colorValue && colorValue.state.value;
        })
        .filter((e) => e),

    [userData]
  );

  return (
    <>
      <div className={styles.filters}>
        {colorNoteAvailable && (
          <ColorFilter appliedColors={appliedColors} data={userData} />
        )}
        <SearchFilter />
        <FilterButton />
      </div>
    </>
  );
}

export default OutputFilter;
