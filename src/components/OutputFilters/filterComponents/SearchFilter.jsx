import React from "react";
// import Separator from "../../elements/Separator";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";

import styles from "./SearchFilter.module.scss";
import { useData } from "../../../context/DatabaseContext";
import useOutputFilters, { filters } from "../../../context/useOutputFilters";

function SearchFilter() {
  const { updateFilterValue } = useData();
  const { filterData } = useOutputFilters();
  console.log(filterData);
  const handleSearchFilter = (e) => {
    const value = e.target.value;
    updateFilterValue(value, filters.searchFilter.name);
  };
  const handleSearchClear = () => {
    updateFilterValue(null, filters.searchFilter.name);
    // handleSearchFilter({ target: { value: "" } });
  };
  return (
    <div className={styles.filterBySearch}>
      {/* !! DONT REMOVE BELOW CODE  !! */}

      {/* <select name="search-select">
        <option value="all">all</option>
      </select> */}
      {/* <Separator type="vertical-medium" /> */}

      <input
        onChange={handleSearchFilter}
        value={filterData?.searchFilter || ""}
        type="text"
        placeholder="Search"
      />
      <Button
        attr={{
          onClick: handleSearchClear,
          className: styles.searchClearButton,
          style: {
            display: filterData?.searchFilter?.length > 0 ? "flex" : "none",
          },
        }}
        text={<UseSvg type="close" />}
      />
      <Button text={<UseSvg type="search" />} />
    </div>
  );
}

export default SearchFilter;
