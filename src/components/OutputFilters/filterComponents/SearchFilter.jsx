import React, { useRef } from "react";
// import Separator from "../../elements/Separator";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";

import styles from "./SearchFilter.module.scss";
import { useData } from "../../../context/DatabaseContext";
import { filters } from "../../../context/useOutputFilters";

function SearchFilter() {
  const input = useRef(null);
  const { updateFilterValue } = useData();
  const handleSearchFilter = (e) => {
    const value = e.target.value;
    updateFilterValue(value.trim(), filters.searchFilter.name);
  };
  const handleSearchClear = () => {
    input.current.value = "";
    handleSearchFilter({ target: { value: "" } });
  };
  return (
    <div className={styles.filterBySearch}>
      {/* !! DONT REMOVE BELOW CODE  !! */}

      {/* <select name="search-select">
        <option value="all">all</option>
      </select> */}
      {/* <Separator type="vertical-medium" /> */}

      <input
        ref={input}
        onChange={handleSearchFilter}
        type="text"
        placeholder="Search"
      />
      <Button
        attr={{
          onClick: handleSearchClear,
          className: styles.searchClearButton,
          style: {
            display: input.current?.value.length > 0 ? "flex" : "none",
          },
        }}
        text={<UseSvg type="close" />}
      />
      <Button text={<UseSvg type="search" />} />
    </div>
  );
}

export default SearchFilter;
