import React, { useEffect, useRef, useState } from "react";
import Separator from "../../elements/Separator";
import Button from "../../MainInput/inputs/elements/Button";
import UseSvg from "../../elements/UseSvg";

function ColorFilter({ setData, appliedColors }) {
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
    setData((prev) => {
      return { ...prev, colorFIlter: value };
    });
  };
  return (
    <div className="color_filter">
      <Button
        attr={{
          onClick: () => {
            setData((prev) => {
              delete prev.colorFIlter;
              return { ...prev };
            });
          },
        }}
        text="All"
      />
      <Separator
        type={ScrollDisplay.all ? "vertical-medium m0" : "vertical-medium ml0"}
      />
      <div className="color_container">
        {ScrollDisplay.all && (
          <Button
            attr={{
              onClick: colorFIlterScrollHandlerLeft,
              className: "color-filter-scrollBtn color-filter-arrowLeft",
            }}
            text={<UseSvg type="expand" />}
          />
        )}
        <div
          ref={colorFilterBtnRef}
          className={
            ScrollDisplay.all
              ? "color_filter_container"
              : "color_filter_container mr"
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
                  className: "random-color-btn colro-btn",
                }}
              />
            );
          })}
        </div>
        {ScrollDisplay.all && (
          <Button
            attr={{
              onClick: colorFIlterScrollHandlerRight,
              className: "color-filter-scrollBtn color-filter-arrowRight",
            }}
            text={<UseSvg type="expand" />}
          />
        )}
      </div>
    </div>
  );
}

export default ColorFilter;
