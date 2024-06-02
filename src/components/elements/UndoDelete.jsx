import React from "react";
import styles from "styles/components/elements/Undo.module.scss";
import { useData } from "../../context/DatabaseContext";

function UndoDelete() {
  const { undoTrigger, setUndoTrigger, setTrashData } = useData();
  return (
    <div
      style={{ display: undoTrigger.trigger ? "flex" : "none" }}
      className={styles.undoContainer}
    >
      <span>
        {undoTrigger.notes.length > 1
          ? undoTrigger.notes.length + " Items deleted"
          : undoTrigger.notes.length + " Item deleted"}
      </span>
      <button
        onClick={() => {
          const deletedNotes = undoTrigger.notes;
          setTrashData((prev) => [...prev, ...deletedNotes]);
          setUndoTrigger({ trigger: false, notes: [] });
        }}
      >
        Undo
      </button>
    </div>
  );
}

export default UndoDelete;
