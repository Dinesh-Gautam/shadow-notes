import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";
import { db } from "../../firebase";
import DropDown from "../elements/DropDown";
import OutputTemplet from "./OutputTemplet";

function MainOutput() {
  const { currentUser } = useAuth();
  const { userData, setuserData } = useData();

  const userID = currentUser && currentUser.uid;

  useEffect(() => {
    let StopListening;
    let unsubscribe = false;
    console.log("running useEffect");
    console.log(userData);
    if (userData === null && !unsubscribe) {
      console.log("Adding onsnapshot");
      StopListening = db
        .collection("users")
        .doc(userID)
        .collection("userData")
        .onSnapshot(
          (snapshot) => {
            console.log("snapshot function");
            console.log();
            setuserData(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
            );
          },
          (error) => {
            console.log("Signed Out" + error.message);
          }
        );
    }

    return () => {
      unsubscribe = true;
      console.log("Main output deteched");
      setuserData(null);
      StopListening();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  return (
    <div className="mainoutput_container">
      {userData &&
        userData.map(({ data, id }) => {
          const { inputValue } = data.find(
            (data) => data.name === "heading_input_value"
          );
          return (
            <DropDown key={id} mainText={inputValue}>
              <OutputTemplet userData={data} />
            </DropDown>
          );
        })}
    </div>
  );
}

export default MainOutput;
