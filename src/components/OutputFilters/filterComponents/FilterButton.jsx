import { FilterList } from "@mui/icons-material";
import React from "react";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu/Menu";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { useData } from "../../../context/DatabaseContext";

function FilterButton() {
  const { filterData, setfilterData } = useData();
  return (
    <MenuProvider>
      <AnchorWrapper>
        <button title="filter">
          <FilterList />
        </button>
      </AnchorWrapper>
      <Menu>
        <FormControl component="fieldset">
          <FormControlLabel
            sx={{
              gap: 4,
            }}
            value="Link Sharing"
            control={
              <Switch
                onChange={(e) => {
                  const checked = e.target.checked;

                  if (!checked) {
                    setfilterData((prev) => {
                      delete prev.shareFilter;
                      return { ...prev };
                    });
                  } else {
                    setfilterData((prev) => ({
                      ...prev,
                      shareFilter: checked,
                    }));
                  }
                }}
                checked={filterData?.shareFilter ?? false}
                color="primary"
              />
            }
            label="Enable Sharing"
            labelPlacement="start"
          />
        </FormControl>
      </Menu>
    </MenuProvider>
  );
}

export default FilterButton;
