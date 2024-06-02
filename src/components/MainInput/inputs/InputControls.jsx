import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import ListIcon from "@mui/icons-material/List";
import PaletteIcon from "@mui/icons-material/Palette";
import TitleIcon from "@mui/icons-material/Title";
import styles from "styles/components/input/InputControls.module.scss";
import { v4 as uuidv4 } from "uuid";
import useInputActions from "../useInputActions";
import { input, inputOptions } from "./inputOptions";

function getInputIcon(inputName) {
  const commonProps = {
    fontSize: "small",
  };
  switch (inputName) {
    case input.title:
      return <TitleIcon {...commonProps} />;
    case input.list:
      return <ListIcon {...commonProps} />;
    case input.image:
      return <ImageIcon {...commonProps} />;
    case input.link:
      return <LinkIcon {...commonProps} />;
    case input.color:
      return <PaletteIcon {...commonProps} />;
    default:
      return inputName[0].toUpperCase();
  }
}

const nonMoveableInputs = inputOptions.filter((e) => !e.nonMoveable);

function InputControls({ index }) {
  const { addInputElement } = useInputActions();

  const inputAdderHandler = ({ inputSelect }) => {
    const uid = uuidv4();

    const selectedInput = inputSelect;

    addInputElement({
      id: uid,
      selectedInput,
      index,
      isFocusable: !(selectedInput.name === input.list),
    });

    if (selectedInput.name === input.list) {
      addInputElement({
        id: uuidv4(),
        parentId: uid,
        selectedInput,
        index,
        isFocusable: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {nonMoveableInputs.map((input) => (
        <button
          key={input.name}
          type={"button"}
          onClick={() => inputAdderHandler({ inputSelect: input })}
        >
          <div>{getInputIcon(input.name)}</div>
          <div>
            <span>{input.value}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default InputControls;
