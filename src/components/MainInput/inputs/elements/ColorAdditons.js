import React from "react";
import Button from "./Button";
import { useData } from "../../../../context/DatabaseContext";

function ColorAdditons({ inputValueDispatch, parentId }) {
  const { userData } = useData();
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
              onClick: () => {
                inputValueDispatch({
                  type: "normalValue",
                  payload: { id: parentId, value: colorValue },
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
                return colorValue.inputValue;
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
                      inputValueDispatch({
                        type: "normalValue",
                        payload: { id: parentId, value: value },
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

export default ColorAdditons;
