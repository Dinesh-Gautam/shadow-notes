import React from "react";
import { useData } from "../context/DatabaseContext";
import DropDown from "./elements/DropDown/DropDown";
import Loading from "./elements/Loading";
import Separator from "./elements/Separator/Separator";
import OutputTemplate from "./MainOutput/OutputTemplate";
import styles from "./trash.module.scss";
import { input } from "./MainInput/inputs/inputOptions";
import { useMenu } from "./elements/Menu/Menu";
import { DeleteForever, RestoreFromTrash } from "@mui/icons-material";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function TrashAdditionalButtons({ id }) {
  const { updateData_fireStore, setundoTrigger } = useData();
  const { setMenuOpen } = useMenu();

  return (
    <>
      <button
        onClick={() => {
          const data = {
            delete: false,
          };
          updateData_fireStore(id, data);
          setMenuOpen(false);
        }}
      >
        <RestoreFromTrash />
        <span>Restore</span>
      </button>
      <Separator type="vertical-medium" />
      <button
        onClick={() => {
          setundoTrigger((prev) => {
            return { trigger: true, id: [...prev.id, id] };
          });
          setMenuOpen(false);
          document.getElementById(id).style.display = "none";
        }}
      >
        <DeleteForever />
        <span>Delete Forever</span>
      </button>
    </>
  );
}

function Trash({ trashData }) {
  const [animationParent] = useAutoAnimate();
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div ref={animationParent} className={styles.content}>
          {!trashData ? (
            Array(10)
              .fill("")
              .map((e, i) => <Loading key={i} type="simple-card" />)
          ) : trashData.length > 0 ? (
            trashData.map(({ data, id, deletedOn }) => {
              const headingText = data.find(
                (data) => data.name === input.heading
              );
              const DropdownBackgroundColor = data.find(
                (data) => data.name === input.color
              );
              return (
                <div key={id}>
                  <DropDown
                    id={id}
                    extraButtons={<TrashAdditionalButtons id={id} />}
                    DropdownBackgroundColor={
                      DropdownBackgroundColor &&
                      DropdownBackgroundColor.state.value
                    }
                    mainText={headingText.state.value}
                  >
                    <OutputTemplate
                      deletedOn={deletedOn}
                      isInTrash={true}
                      userData={data}
                      docId={id}
                    />
                  </DropDown>
                </div>
              );
            })
          ) : (
            <span>Nothing in the Trash</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trash;
