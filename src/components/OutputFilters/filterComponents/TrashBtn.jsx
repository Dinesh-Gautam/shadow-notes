import React, { useEffect, useState } from "react";
import { useData } from "../../../context/DatabaseContext";
import { db } from "../../../firebase";
import UseSvg from "../../elements/UseSvg";
import Button from "../../MainInput/inputs/elements/Button";
import Trash from "../../Trash";

function TrashBtn({ data, setData }) {
  const trashData = data,
    settrashData = setData;

  const [initialRequest, setinitialRequest] = useState(false);
  const [displayState, setdisplayState] = useState("none");

  const { userID } = useData();

  useEffect(() => {
    let unsubscribe;
    if (trashData === null && initialRequest) {
      console.log("Trash useEffect Changed " + userID);
      unsubscribe = db
        .collection("users")
        .doc(userID)
        .collection("userData")
        .where("delete", "==", true)
        .onSnapshot(
          (snapshot) => {
            console.log("On trash snapshot");
            settrashData(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
            );
          },

          (error) => {
            console.log(error.message);
          }
        );
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
