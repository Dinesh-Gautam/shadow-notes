import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";
import { useData } from "../../../context/DatabaseContext";
import useOutputFilters, { filters } from "../filterContext";
import styles from "styles/components/filters/SearchFilter.module.scss";

function SearchFilter() {
  const { updateFilterValue } = useData();
  const { filterData } = useOutputFilters();

  const handleSearchFilter = (e) => {
    const value = e.target.value;
    updateFilterValue(value, filters.searchFilter.name);
  };

  const handleSearchClear = () => {
    updateFilterValue(null, filters.searchFilter.name);
  };

  return (
    <div className={styles.filterBySearch}>
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
