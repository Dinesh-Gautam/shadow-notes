import { FilterList, Share, Star } from "@mui/icons-material";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { useData } from "../../../context/DatabaseContext";
import { AnchorWrapper, Menu, MenuProvider } from "../../elements/Menu";
import { filters } from "../filterContext";

function FilterButton() {
  const { filterData, updateFilterValue } = useData();
  return (
    <MenuProvider>
      <AnchorWrapper>
        <button title="filter">
          <FilterList />
        </button>
      </AnchorWrapper>
      <Menu>
        <FormControl sx={{ px: 2 }} component="fieldset">
          <FormControlLabel
            sx={{
              gap: 4,
            }}
            value="Shared Notes"
            control={
              <Switch
                onChange={(e) => {
                  const checked = e.target.checked;
                  updateFilterValue(checked, filters.sharedFilter.name);
                }}
                checked={filterData?.[filters.sharedFilter.name] ?? false}
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
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
            }}
            value="Stared"
            control={
              <Switch
                onChange={(e) => {
                  const checked = e.target.checked;

                  updateFilterValue(checked, filters.staredFilter.name);
                }}
                checked={filterData?.[filters.staredFilter.name] ?? false}
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
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "auto 1fr",
        justifyItems: "start",
        gap: 2,
      }}
    >
      {icon}

      <span>{text}</span>
    </Box>
  );
}

export default FilterButton;
