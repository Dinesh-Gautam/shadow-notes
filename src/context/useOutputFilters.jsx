import React, { useState } from "react";
import { input } from "../components/MainInput/inputs/inputOptions";
import Button from "../components/MainInput/inputs/elements/Button";

export const filters = {
  colorFilter: {
    name: "colorFilter",
    label: (filterValue) => (
      <div className="color_filter_container random_color_small output">
        <Button
          attr={{
            value: filterValue,
            name: "color_input_value",
            style: { backgroundColor: filterValue },
          }}
        />
      </div>
    ),
    filterFn: (data, filterValue) => {
      return data.data.some(
        (dataFields) =>
          dataFields.name === input.color &&
          dataFields.state.value === filterValue
      );
    },
  },
  searchFilter: {
    name: "searchFilter",
    label: (value) => `'${value}'`,
    filterFn: (data, filterValue) => {
      return data.data.some((dataFields) => {
        return RegExp(filterValue.toLowerCase()).test(
          dataFields.state?.value.toLowerCase()
        );
      });
    },
  },

  sharedFilter: {
    name: "sharedFilter",
    label: (value) => "Shared notes",
    filterFn: (data) => {
      return data?.linkSharing ?? false;
    },
  },
  staredFilter: {
    name: "staredFilter",
    label: (value) => "Stared notes",
    filterFn: (data) => {
      return data?.star ?? false;
    },
  },
};

function useOutputFilters() {
  const [filterData, setFilterData] = useState({});

  function updateFilterValue(value, name) {
    if (!value) {
      setFilterData((prev) => {
        delete prev[name];
        return { ...prev };
      });
    } else {
      setFilterData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function getOutputFilterText() {
    const filtersKey = Object.keys(filterData);
    if (filtersKey.length < 1) {
      return null;
    }
    const preString = "Results for";
    const afterString = filtersKey.map((key, index, arr) => {
      const finalArr = [];
      if (arr.length > 1 && index === arr.length - 1) {
        finalArr.push(" and ");
      } else if (arr.length > 2) {
        finalArr.push(", ");
      } else {
        finalArr.push(" ");
      }
      finalArr.push(filters[key].label(filterData[key]));

      return finalArr;
    });

    return [preString, ...afterString].flat();
  }

  return { filterData, setFilterData, updateFilterValue, getOutputFilterText };
}

export default useOutputFilters;
