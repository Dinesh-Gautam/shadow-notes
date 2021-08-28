import React from "react";
import TrashBtn from "./filterComponents/TrashBtn";
import ColorFilter from "./filterComponents/ColorFilter";
import SearchFilter from "./filterComponents/SearchFilter";

function outputFilter() {
  return (
    <div className="search_filters">
      <TrashBtn />
      <ColorFilter />
      <SearchFilter />
    </div>
  );
}

export default outputFilter;
