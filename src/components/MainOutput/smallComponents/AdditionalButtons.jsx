import React from "react";
import { useData } from "../../../context/DatabaseContext";

function AdditionalButtons({ docId }) {
  const { updateData_firestore } = useData();
  return (
    <div>
      <button
        onClick={() => {
          const data = {
            delete: true,
          };

          updateData_firestore(docId, data);
        }}
      >
        delete
      </button>
    </div>
  );
}

export default AdditionalButtons;
