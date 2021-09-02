import React, { useRef } from "react";
import Separator from "../../elements/Separator";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";

function SearchFilter({ setData }) {
  const input = useRef(null);

  const handleSearchFilter = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      setData((prev) => {
        delete prev.searchFilter;
        return { ...prev };
      });
    } else {
      setData((prev) => {
        return { ...prev, searchFilter: value };
      });
    }
  };
  const handleSearchClear = () => {
    input.current.value = "";
    handleSearchFilter({ target: { value: "" } });
  };
  return (
    <div>
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
          className: "search_clear_button",
          style: {
            display: input.current.value.length > 0 ? "flex" : "none",
          },
        }}
        text={<UseSvg type="close" />}
      />
      <Button text={<UseSvg type="search" />} />
    </div>
  );
}

export default SearchFilter;
