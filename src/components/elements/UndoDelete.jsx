import React from "react";
import { useData } from "../../context/DatabaseContext";

function UndoDelete() {
  const { undoTrigger, setundoTrigger } = useData();
  return (
    <div
      style={{ display: undoTrigger.trigger ? "flex" : "none" }}
      className="undo-container"
    >
      <span>
        {undoTrigger.id.length > 1
          ? undoTrigger.id.length + " Items has been deleted"
          : undoTrigger.id.length + " Item has been deleted"}
      </span>
      <button
        onClick={() => {
          undoTrigger.id.forEach((eachId) => {
            document.getElementById(eachId).style.display = "block";
          });
          setundoTrigger({ trigger: false, id: [] });
        }}
      >
        Undo
      </button>
    </div>
  );
}

export default UndoDelete;
