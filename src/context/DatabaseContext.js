import React, { useContext, useState } from "react";
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

  const value = {
    data,
    setdata,
    setData_firestore,
  };
  return (
    <data_context.Provider value={value}>{children}</data_context.Provider>
  );
}
