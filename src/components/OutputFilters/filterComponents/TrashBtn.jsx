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

const users = collection(db, "users");

function TrashBtn({ data, setData }) {
  const trashData = data,
    settrashData = setData;

  const [initialRequest, setinitialRequest] = useState(false);
  const [displayState, setdisplayState] = useState("none");

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
              setdisplayState("block");
              !initialRequest && setinitialRequest(true);
            },
          }}
          text={<UseSvg type="trash" />}
        />
      </div>

      <Trash
        trashData={trashData}
        settrashData={settrashData}
        setdisplayState={setdisplayState}
        displayState={displayState}
      />
    </>
  );
}

export default TrashBtn;
