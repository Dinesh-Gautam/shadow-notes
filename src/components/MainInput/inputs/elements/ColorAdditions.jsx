import { useMemo } from "react";
import { useData } from "../../../../context/DatabaseContext";
import useInputActions from "../../useInputActions";
import Button from "./Button";

import styles from "styles/components/input/ColorAdditions.module.scss";

function ColorAdditions({ input }) {
  const { userData } = useData();
  const { changeInputValue } = useInputActions();
  const randomColors = useMemo(
    () =>
      Array.from({ length: 20 }, () => {
        const HexColor = () =>
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        const color = HexColor();
        return color.length <= 6 ? "#000000" : color;
      }),
    []
  );
  return (
    <div>
      <label> Random Colors </label>
      <div className={styles.randomColor}>
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
              className: "random-color-btn colro-btn color-filter",
            }}
          />
        ))}
      </div>
      <label> Applied Colors </label>
      <div className={styles.randomColor}>
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
                    className: "random-color-btn colro-btn color-filter",
                  }}
                />
              );
            })}
      </div>
    </div>
  );
}

export default ColorAdditions;
