import React, { useEffect, useState } from "react";
import { useData } from "../../../context/DatabaseContext";
import { db } from "../../../firebase";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";
import Trash from "../../Trash";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

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
    where("delete", "==", true)
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
      // console.log("Trash useEffect Changed " + userID);
      // unsubscribe = db
      //   .collection("users")
      //   .doc(userID)
      //   .collection("userData")
      //   .where("delete", "==", true)
      //   .onSnapshot(
      //     (snapshot) => {
      //       console.log("On trash snapshot");
      //       settrashData(
      //         snapshot.docs.map((doc) => {
      //           return { id: doc.id, ...doc.data() };
      //         })
      //       );
      //     },
      //     (error) => {
      //       console.log(error.message);
      //     }
      //   );
    }
    // !initialRequest && setinitialRequest(true);
    return () => {
      console.log("trash UnSubscribing");
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
