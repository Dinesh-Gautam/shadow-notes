import React from "react";
import Button from "./Button";

function ColorAdditons({ valueUpdater }) {
  return (
    <>
      <label> Random Colors </label>
      <div className="random_color">
        {Array.from({ length: 20 }, () => {
          const HexColor = () =>
            "#" + Math.floor(Math.random() * 16777215).toString(16);
          const color = HexColor();
          return color.length <= 6 ? "#000000" : color;
        }).map((colorValue, index) => (
          <Button
            key={index}
            attr={{
              value: colorValue,
              onClick: valueUpdater,
              name: "color_input_value",
              style: { backgroundColor: colorValue },
              className: "random-color-btn colro-btn",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default ColorAdditons;
