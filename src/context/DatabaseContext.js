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
  const [trashData, settrashData] = useState(null);
  const [filtererdUserData, setfiltererdUserData] = useState({});

  // get data form firestore only when userID changes

  const userID = currentUser?.uid || null;

  useEffect(() => {
    console.log("userID is changed " + userID);
    let unsubscribe = db
      .collection("users")
      .doc(userID)
      .collection("userData")
      .where("delete", "==", false)
      // .orderBy("publishDate", "desc")
      // .limit(2)
      .onSnapshot(
        (snapshot) => {
          console.log("On snapshot");
          setuserData(
            snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
          );
        },
        (error) => {
          console.log(error.message);
        }
      );

    return () => {
      console.log("unsubscribing");
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

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

  function updateData_firestore(docId, data) {
    users
      .doc(currentUser.uid)
      .collection("userData")
      .doc(docId)
      .set(data, { merge: true });
  }

  function deleteData_firestore(docId) {
    users.doc(currentUser.uid).collection("userData").doc(docId).delete();
  }

  const value = {
    data,
    setdata,
    setData_firestore,
    updateData_firestore,
    userData,
    setuserData,
    trashData,
    settrashData,
    userID,
    filtererdUserData,
    setfiltererdUserData,
    deleteData_firestore,
  };
  return (
    <data_context.Provider value={value}>{children}</data_context.Provider>
  );
}
