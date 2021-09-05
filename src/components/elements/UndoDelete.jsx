import React, { useEffect, useState } from "react";
import { useData } from "../../context/DatabaseContext";

// function useUndoDelete(id) {
//   const { deleteData_firestore } = useData();

//   useEffect(() => {
//     let undoTimeout = null;
//     undoTimeout = setTimeout(() => {
//       //   deleteData_firestore(id);
//       console.log("Item Deleted");
//       setundoDisplay(false);
//     }, 1000);
//   }, []);

//   const [undoDisplay, setundoDisplay] = useState(false);

//   const UndoDom = (
//     <div>
//       <button>Undo</button>
//       <button>Cancel</button>
//     </div>
//   );

//   return { undoDisplay, UndoDom };
// }

// export { useUndoDelete };

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
