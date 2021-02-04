import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const data_context = React.createContext();

const users = db.collection("users");

export function useData() {
  return useContext(data_context);
}

export function DatabaseContext({ children }) {
  const { currentUser } = useAuth();
  const [data, setdata] = useState();
  const [userData, setuserData] = useState(null);

  function setData_firestore(data) {
    users
      .doc(currentUser.uid)
      .set(
        {
          user: {
            uid: currentUser.uid,
          },
          groups: false,
          favourits: false,
          tags: false,
        },
        { merge: true }
      )
      .then(() => {
        users.doc(currentUser.uid).collection("userData").add(data);
      });
  }

  useEffect(() => {
    let unsubscribe = true;
    if (unsubscribe && userData === null) {
      console.log("Adding onsnapshot");

      users
        .doc(currentUser.uid)
        .collection("userData")
        .onSnapshot(
          (snapshot) => {
            console.log("snapshot function");
            setuserData(
              snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
            );
          },
          (error) => alert(error.message)
        );
    }
    return () => {
      unsubscribe = false;
    };
  }, [currentUser.uid, userData]);

  const value = {
    data,
    setdata,
    setData_firestore,
    userData,
  };
  return (
    <data_context.Provider value={value}>{children}</data_context.Provider>
  );
}
