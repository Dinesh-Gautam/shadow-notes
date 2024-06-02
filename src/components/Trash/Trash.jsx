import { DeleteForever, RestoreFromTrash } from "@mui/icons-material";
import { AnimatePresence } from "framer-motion";
import { useData } from "../../context/DatabaseContext";
import { input } from "../MainInput/inputs/inputOptions";
import OutputTemplate from "../MainOutput/OutputTemplate";
import DropDown from "../elements/DropDown";
import Loading from "../elements/Loading";
import { useMenu } from "../elements/Menu";
import Separator from "../elements/Separator";

import styles from "styles/components/trash.module.scss";

function TrashAdditionalButtons({ id }) {
  const { updateData_fireStore, setundoTrigger, trashData, settrashData } =
    useData();
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
          const note = trashData.find((note) => note.id === id);
          setundoTrigger((prev) => {
            return { trigger: true, notes: [...prev.notes, note] };
          });
          settrashData(trashData.filter((note) => note.id !== id));
          setMenuOpen(false);
        }}
      >
        <DeleteForever />
        <span>Delete Forever</span>
      </button>
    </>
  );
}

function Trash({ trashData }) {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {!trashData ? (
            Array(10)
              .fill("")
              .map((e, i) => <Loading key={i} type="simple-card" />)
          ) : trashData.length > 0 ? (
            <AnimatePresence>
              {trashData.map(({ data, id, deletedOn }) => {
                const headingText = data.find(
                  (data) => data.name === input.heading
                );
                const DropdownBackgroundColor = data.find(
                  (data) => data.name === input.color
                );
                return (
                  <DropDown
                    key={id}
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
                );
              })}
            </AnimatePresence>
          ) : (
            <span>Nothing in the Trash</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trash;
