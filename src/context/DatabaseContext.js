// import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
const data_context = React.createContext();

const users = db.collection("users");

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
  // get data form firestore only when userID changes

  const userID = currentUser?.uid || null;

  useEffect(() => {
    clearInterval(undoInterval);
    if (undoTrigger.trigger) {
      undoInterval = setTimeout(() => {
        console.log("intervale ended");
        undoTrigger.id.forEach((eachId) => {
          console.log("deleted Item" + eachId);
          deleteData_firestore(eachId);
        });
        setundoTrigger({ trigger: false, id: [] });
      }, 5000);
    } else {
      undoInterval && clearInterval(undoInterval);
    }
  }, [undoTrigger]);

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
    undoTrigger,
    setundoTrigger,
  };
  return (
    <data_context.Provider value={value}>{children}</data_context.Provider>
  );
}
