import React from "react";
import { useData } from "../../../context/DatabaseContext";
import UseSvg from "../../elements/UseSvg";

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
        <UseSvg type="close" />
      </button>
    </div>
  );
}

export default AdditionalButtons;
