import React, { memo } from "react";
import Button from "./Button";
import { useData } from "../../../../context/DatabaseContext";
import useInputActions from "../../useInputActions";
import { useMemo } from "react";

const randomColors = Array.from({ length: 20 }, () => {
  const HexColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);
  const color = HexColor();
  return color.length <= 6 ? "#000000" : color;
});

function ColorAdditions({ input }) {
  const { userData } = useData();
  const { changeInputValue } = useInputActions();

  return (
    <>
      <div>
        <input
          type="color"
          onChange={(e) =>
            changeInputValue({
              id: input.id,
              value: e.target.value,
            })
          }
          value={input?.state?.value}
          className="color_input"
        />
      </div>
      <label> Random Colors </label>
      <div className="random_color">
        {randomColors.map((colorValue, index) => (
          <Button
            key={index}
            attr={{
              value: colorValue,
              onClick: () => {
                changeInputValue({
                  id: input.id,
                  value: colorValue,
                });
              },
              name: "color_input_value",
              style: { backgroundColor: colorValue },
              className: "random-color-btn colro-btn",
            }}
          />
        ))}
      </div>
      <label> Applied Colors </label>
      <div className="random_color">
        {userData &&
          userData
            .map(({ data, index }) => {
              const colorValue = data.find(
                (dataValue) => dataValue.name === "color_input_value"
              );
              if (colorValue) {
                return colorValue.state.value;
              } else {
                return false;
              }
            })
            .filter((e, index, arr) => e && arr.indexOf(e) === index)
            .map((value, index) => {
              return (
                <Button
                  key={index}
                  attr={{
                    value: value,
                    onClick: () => {
                      changeInputValue({
                        id: input.id,
                        value,
                      });
                    },
                    name: "color_input_value",
                    style: { backgroundColor: value },
                    className: "random-color-btn colro-btn",
                  }}
                />
              );
            })}
      </div>
    </>
  );
}

export default memo(ColorAdditions);
