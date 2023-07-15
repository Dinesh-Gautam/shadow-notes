import { FilterList, Share, Star } from "@mui/icons-material";
import React from "react";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu/Menu";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { useData } from "../../../context/DatabaseContext";
import { Box } from "@mui/system";

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
        <FormControl sx={{ p: 2 }} component="fieldset">
          <FormControlLabel
            sx={{
              gap: 4,
            }}
            value="Shared Notes"
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
            label={
              <Label icon={<Share fontSize="small" />} text="Shared Notes" />
            }
            labelPlacement="start"
          />

          <FormControlLabel
            sx={{
              gap: 4,
            }}
            value="Stared"
            control={
              <Switch
                onChange={(e) => {
                  const checked = e.target.checked;

                  if (!checked) {
                    setfilterData((prev) => {
                      delete prev.staredFilter;
                      return { ...prev };
                    });
                  } else {
                    setfilterData((prev) => ({
                      ...prev,
                      staredFilter: checked,
                    }));
                  }
                }}
                checked={filterData?.staredFilter ?? false}
                color="primary"
              />
            }
            label={
              <Label icon={<Star fontSize="small" />} text="Stared notes" />
            }
            labelPlacement="start"
          />
        </FormControl>
      </Menu>
    </MenuProvider>
  );
}

function Label({ icon, text }) {
  return (
    <Box gap={2} display={"flex"} alignItems={"center"}>
      {icon}
      {text}
    </Box>
  );
}

export default FilterButton;
