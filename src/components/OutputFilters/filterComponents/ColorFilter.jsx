import React, { useEffect, useState } from "react";
import Separator from "../../elements/Separator";
import Button from "../../MainInput/inputs/elements/Button";

function ColorFilter({ setData, appliedColors }) {
  useEffect(() => {
    appliedColors &&
      setuniqueAppliedColors(
        appliedColors.filter((e, index, arr) => arr.indexOf(e) === index)
      );
  }, [appliedColors]);

  const [uniqueAppliedColors, setuniqueAppliedColors] = useState([]);

  const handleColorFilterClick = (e) => {
    const value = e.target.value;
    setData((prev) => {
      return [{ colorFIlter: value }];
    });
  };
  return (
    <div>
      <Button
        attr={{
          onClick: () => {
            setData([]);
          },
        }}
        text="All"
      />
      <Separator type="vertical-medium ml0" />
      <div className="color_filter_container">
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
    </div>
  );
}

export default ColorFilter;
