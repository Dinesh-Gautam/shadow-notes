import React, { useEffect, useRef, useState } from "react";
import Separator from "../../elements/Separator/Separator";
import Button from "../../MainInput/inputs/elements/Button";
import UseSvg from "../../elements/UseSvg";

import styles from "./ColorFilter.module.scss";
import { useData } from "../../../context/DatabaseContext";
import { filters } from "../../../context/useOutputFilters";

function ColorFilter({ appliedColors }) {
  const { updateFilterValue } = useData();

  const colorFilterBtnRef = useRef(null);

  const [ScrollDisplay, setScrollDisplay] = useState({
    all: false,
  });
  const [uniqueAppliedColors, setuniqueAppliedColors] = useState([]);
  useEffect(() => {
    appliedColors &&
      setuniqueAppliedColors(
        appliedColors.filter((e, index, arr) => arr.indexOf(e) === index)
      );
  }, [appliedColors]);

  useEffect(() => {
    setScrollDisplay((prev) => {
      return {
        ...prev,
        all:
          colorFilterBtnRef.current.clientWidth < 1
            ? false
            : colorFilterBtnRef.current.scrollWidth !==
              colorFilterBtnRef.current.clientWidth,
      };
    });
  }, [uniqueAppliedColors]);

  const colorFIlterScrollHandlerLeft = (e) => {
    e.preventDefault();
    const btnParent = colorFilterBtnRef.current;

    btnParent.scroll(
      Math.max(btnParent.scrollLeft - btnParent.clientWidth, 0),
      0
    );
  };

  const colorFIlterScrollHandlerRight = (e) => {
    e.preventDefault();
    const btnParent = colorFilterBtnRef.current;
    btnParent.scroll(
      Math.min(
        btnParent.scrollLeft + btnParent.clientWidth,
        btnParent.scrollWidth
      ),
      0
    );
  };

  const handleColorFilterClick = (e) => {
    const value = e.target.value;
    updateFilterValue(value, filters.colorFilter.name);
  };

  return (
    <div className={styles.colorFilter}>
      <Button
        attr={{
          onClick: () => {
            updateFilterValue(null, filters.colorFilter.name);
          },
        }}
        text="All"
      />
      <Separator
        type={ScrollDisplay.all ? "vertical-medium" : "vertical-medium"}
      />
      <div
        style={
          ScrollDisplay.all
            ? {
                marginLeft: 0,
              }
            : {}
        }
        className={styles.colorContainer}
      >
        {ScrollDisplay.all && (
          <Button
            attr={{
              onClick: colorFIlterScrollHandlerLeft,
              className: [
                styles.colorFilterScrollBtn,
                styles.colorFilterArrowLeft,
              ].join(" "),
            }}
            text={<UseSvg type="expand" />}
          />
        )}
        <div
          ref={colorFilterBtnRef}
          className={
            ScrollDisplay.all
              ? styles.colorFilterContainer
              : [styles.colorFilterContainer, styles.mr].join(" ")
          }
        >
          {uniqueAppliedColors.map((inputValue, index) => {
            return (
              <Button
                key={index}
                attr={{
                  value: inputValue,
                  onClick: handleColorFilterClick,
                  name: "color_input_value",
                  style: { backgroundColor: inputValue },
                }}
              />
            );
          })}
        </div>
        {ScrollDisplay.all && (
          <Button
            attr={{
              onClick: colorFIlterScrollHandlerRight,
              className: [
                styles.colorFilterScrollBtn,
                styles.colorFilterArrowRight,
              ].join(" "),
            }}
            text={<UseSvg type="expand" />}
          />
        )}
      </div>
    </div>
  );
}

export default ColorFilter;
