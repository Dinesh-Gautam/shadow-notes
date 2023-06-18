import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "./elements/Button";
import UseSvg from "../../elements/UseSvg";
import { inputOptions, input } from "./inputOptions";
import useInputActions from "../useInputActions";

import styles from "./InputControls.module.scss";

import TitleIcon from "@mui/icons-material/Title";
import ListIcon from "@mui/icons-material/List";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import PaletteIcon from "@mui/icons-material/Palette";

// function InputControls() {
//   const [inputSelect, setInputSelect] = useState("title");
//   const { addInputElement } = useInputActions();
//   const inputAdderHandler = () => {
//     const uid = uuidv4();

//     const selectedInput = inputOptions.find(
//       (input) => input.value.toLowerCase() === inputSelect.toLowerCase()
//     );
//     console.log(selectedInput.name);
//     console.log(input.list);
//     addInputElement({
//       id: uid,
//       selectedInput,
//       isFocusable: !(selectedInput.name === input.list),
//     });
//   };
//   return (
//     <>
//       <div className="input_selection">
//         <div className="selection_input_btn">
//           <select
//             name="inputs_options"
//             value={inputSelect}
//             onChange={(e) => setInputSelect(e.target.value)}
//           >
//             {inputOptions.map((inputType) => {
//               return (
//                 <option key={inputType.name} value={inputType.value}>
//                   {inputType.value}
//                 </option>
//               );
//             })}
//           </select>
//           <Button
//             attr={{ onClick: inputAdderHandler }}
//             text={<UseSvg type="add" />}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

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

function InputControls() {
  const { addInputElement } = useInputActions();

  const inputAdderHandler = ({ inputSelect }) => {
    const uid = uuidv4();

    const selectedInput = inputSelect;
    console.log(selectedInput.name);
    console.log(input.list);
    addInputElement({
      id: uid,
      selectedInput,
      isFocusable: !(selectedInput.name === input.list),
    });
  };
  return (
    <div className={styles.container}>
      {inputOptions.map((input) => (
        <button
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
