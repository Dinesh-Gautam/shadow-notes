import { useMemo } from "react";
import { useData } from "../../context/DatabaseContext";
import { input } from "../MainInput/inputs/inputOptions";
import styles from "styles/components/filters/OutputFilter.module.scss";
import ColorFilter from "./components/ColorFilter";
import FilterButton from "./components/FilterButton";
import SearchFilter from "./components/SearchFilter";

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
