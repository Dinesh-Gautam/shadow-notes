import React, { createContext, useContext, useState } from "react";
import { input } from "../components/MainInput/inputs/inputOptions";
import Button from "../components/MainInput/inputs/elements/Button";
import { Box, Chip } from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const filterContext = createContext();

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
          dataFields.state?.value?.toLowerCase()
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
  const [filterData, setFilterData] = useContext(filterContext);

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

  return { filterData, setFilterData, updateFilterValue, GetOutputFilterTags };
}

export function GetOutputFilterTags() {
  const { filterData, updateFilterValue } = useOutputFilters();
  const [animationParent] = useAutoAnimate({ duration: 100 });

  const filtersKey = Object.keys(filterData);
  if (filtersKey.length < 1) {
    return null;
  }

  return (
    <Box
      ref={animationParent}
      sx={{ display: "flex", marginBottom: "1rem", gap: 2 }}
    >
      {filtersKey.map((key, index, arr) => {
        const label = filters[key].label(filterData[key]);
        return (
          <Chip
            key={key}
            sx={{
              background: "var(--vless-alpha-text-color)",
              color: "var(--default-text-color)",
              svg: {
                color: "var(--default-text-color) !important",
              },
            }}
            // icon={icon}
            label={label}
            onDelete={() => {
              updateFilterValue(null, key);
            }}
          />
        );
      })}
    </Box>
  );
}

export const FilterProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({});

  const value = [filterData, setFilterData];
  return (
    <filterContext.Provider value={value}>{children}</filterContext.Provider>
  );
};

export default useOutputFilters;
