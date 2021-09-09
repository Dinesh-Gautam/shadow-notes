// import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
const data_context = React.createContext();

const users = collection(db, "users");

export function useData() {
  return useContext(data_context);
}
let undoInterval = null;
export function DatabaseContext({ children }) {
  const { currentUser } = useAuth();
  const [data, setdata] = useState();
  const [userData, setuserData] = useState(null);
  const [trashData, settrashData] = useState(null);
  const [filtererdUserData, setfiltererdUserData] = useState({});
  const [undoTrigger, setundoTrigger] = useState({ trigger: false, id: [] });

  const userID = currentUser?.uid || null;

  const userDoc = doc(users, userID);
  const userDocCollection = collection(userDoc, "userData");

  useEffect(() => {
    clearInterval(undoInterval);
    if (undoTrigger.trigger) {
      undoInterval = setTimeout(() => {
        undoTrigger.id.forEach((eachId) => {
          deleteData_firestore(eachId);
        });
        setundoTrigger({ trigger: false, id: [] });
      }, 5000);
    } else {
      undoInterval && clearInterval(undoInterval);
    }
    // eslint-disable-next-line
  }, [undoTrigger]);

  useEffect(() => {
    const q = query(userDocCollection, where("delete", "==", false));
    let unsubscribe = onSnapshot(q, (snapshot) => {
      setuserData(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });

    // const finalArr = [];

    // db.collection("list")
    //   .doc(userID)
    //   .collection("listItem")
    //   .get()
    //   .then((e) => {
    //     console.log(e.docs[0].data());
    //     e.docs.map((doc) => {
    //       const {
    //         title,
    //         timestamp,
    //         deletedTimestamp,
    //         backgroundColor,
    //         deleted,
    //         List,
    //         paragraph,
    //         link,
    //         description,
    //         heading,
    //       } = doc.data();

    //       const data = [
    //         {
    //           name: "heading_input_value",
    //           inputValue: heading || "no Value",
    //           id: uuidv4(),
    //           value: "Heading",
    //         },
    //         {
    //           name: "title_input_value",
    //           inputValue: title || "no Value",
    //           id: uuidv4(),
    //           value: "Title",
    //         },
    //         {
    //           name: "description_input_value",
    //           inputValue: description || "no Value",
    //           id: uuidv4(),
    //           value: "Description",
    //         },
    //         {
    //           name: "Pragraph_input_value",
    //           inputValue: paragraph || "no Value",
    //           id: uuidv4(),
    //           value: "Paragraph",
    //         },
    //         {
    //           name: "list_input_value",
    //           inner:
    //             List.map((list) => list.value || "no Value").filter(
    //               (e) => e !== "no Value"
    //             ) || "no Value",
    //           id: uuidv4(),
    //           value: "List",
    //         },
    //         {
    //           name: "color_input_value",
    //           inputValue: backgroundColor || "no Value",
    //           id: uuidv4(),
    //           value: "Color",
    //         },
    //         {
    //           name: "link_input_value",
    //           inputValue: link || "no Value",
    //           id: uuidv4(),
    //           value: "Link",
    //         },
    //       ].filter((e) => {
    //         if (e.name === "list_input_value") {
    //           return e.inner.length > 0;
    //         }

    //         return e.inputValue !== "no Value";
    //       });

    //       const finalData = {
    //         delete: deleted,
    //         publishDate: timestamp,
    //         deletedOn: deletedTimestamp,
    //         data,
    //       };
    //       finalArr.push(finalData);
    //     });
    //     finalArr.map((data) => {
    //       setData_firestore(data);
    //     });
    //     console.log(finalArr);
    //   });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  function setData_firestore(data) {
    setDoc(
      userDoc,
      {
        user: {
          uid: currentUser.uid,
        },
        groups: false,
        favourits: false,
        tags: false,
      },
      { merge: true }
    ).then(() => {
      addDoc(userDocCollection, data);
    });
  }

  function updateData_firestore(docId, data) {
    const toBeUpdatedDoc = doc(userDocCollection, docId);
    setDoc(toBeUpdatedDoc, data, { merge: true });
  }

  function deleteData_firestore(docId) {
    const toBeDeletedDoc = doc(userDocCollection, docId);
    deleteDoc(toBeDeletedDoc);
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
    undoTrigger,
    setundoTrigger,
  };
  return (
    <data_context.Provider value={value}>{children}</data_context.Provider>
  );
}
