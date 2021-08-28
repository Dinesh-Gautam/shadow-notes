import React from "react";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";

function SearchFilter() {
  return (
    <div>
      <select name="search-select">
        <option value="all">all</option>
      </select>
      <input type="text" placeholder="Search" />
      <Button text={<UseSvg type="search" />} />
    </div>
  );
}

export default SearchFilter;
