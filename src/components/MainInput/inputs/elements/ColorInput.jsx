import { useMemo } from "react";
import styles from "styles/components/input/ColorAdditions.module.scss";
import { useData } from "../../../../context/DatabaseContext";
import useInputActions from "../../useInputActions";
import Button from "./Button";
import { input } from "../inputOptions";

function getRandomColors() {
  return Array.from({ length: 20 }, () => {
    const HexColor = () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    const color = HexColor();
    return color.length <= 6 ? "#000000" : color;
  });
}

function getAppliedColors(data) {
  if (!Array.isArray(data)) return [];

  const colorValues = new Set();

  for (const { data: colorData } of data) {
    const colorValue = colorData.find(({ name }) => name === input.color)?.state
      .value;
    if (colorValue) {
      colorValues.add(colorValue);
    }
  }

  return Array.from(colorValues);
}

function ColorAdditions({ input }) {
  const { userData } = useData();

  const randomColors = useMemo(() => getRandomColors(), []);
  const appliedColors = useMemo(() => getAppliedColors(userData), [userData]);

  return (
    <div>
      <ColorButtons
        colors={randomColors}
        input={input}
        headerText="Random Colors"
      />
      {userData && (
        <ColorButtons
          colors={appliedColors}
          input={input}
          headerText="Applied Colors"
        />
      )}
    </div>
  );
}

function ColorButtons({ colors, input, headerText }) {
  const { changeInputValue } = useInputActions();

  return (
    <>
      <label> {headerText} </label>
      <div className={styles.randomColor}>
        {colors &&
          colors.map((value, index) => {
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
    </>
  );
}

export default ColorAdditions;
