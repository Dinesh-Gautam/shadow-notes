import React, { useEffect, useState } from "react";
import { useData } from "../../../context/DatabaseContext";
import { db } from "../../../firebase";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";
import Trash from "../../Trash";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { createPortal } from "react-dom";
import Modal, { useModal } from "../../elements/Modal/Modal";

const users = collection(db, "users");

function TrashBtn({ text }) {
  const { trashData, settrashData } = useData();
  const { setModalOpen } = useModal();
  const [initialRequest, setinitialRequest] = useState(false);

  const { userID } = useData();

  const userDoc = doc(users, userID);
  const userDocCollection = query(
    collection(userDoc, "userData"),
    where("delete", "==", true),
    orderBy("deletedOn", "desc")
  );

  useEffect(() => {
    let unsubscribe;
    if (trashData === null && initialRequest) {
      unsubscribe = onSnapshot(userDocCollection, (snapshot) => {
        settrashData(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      });
    }

    return () => {
      unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRequest]);

  return (
    <>
      <div>
        <Button
          attr={{
            onClick: () => {
              setModalOpen(true);
              !initialRequest && setinitialRequest(true);
            },
          }}
          text={
            <>
              <UseSvg type="trash" />
              {text}
            </>
          }
        />
      </div>

      <Modal>
        <Trash trashData={trashData} settrashData={settrashData} />
      </Modal>
    </>
  );
}

export default TrashBtn;
