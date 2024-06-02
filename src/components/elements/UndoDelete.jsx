import React from "react";
import { useData } from "../../context/DatabaseContext";

import styles from "./Undo.module.scss";

function UndoDelete() {
  const { undoTrigger, setundoTrigger, settrashData } = useData();
  return (
    <div
      style={{ display: undoTrigger.trigger ? "flex" : "none" }}
      className={styles.undoContainer}
    >
      <span>
        {undoTrigger.notes.length > 1
          ? undoTrigger.notes.length + " Items has been deleted"
          : undoTrigger.notes.length + " Item has been deleted"}
      </span>
      <button
        onClick={() => {
          const deletedNotes = undoTrigger.notes;
          settrashData((prev) => [...prev, ...deletedNotes]);

          setundoTrigger({ trigger: false, notes: [] });
        }}
      >
        Undo
      </button>
    </div>
  );
}

export default UndoDelete;
