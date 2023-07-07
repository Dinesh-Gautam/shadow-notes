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
  orderBy,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import { uuidv4 } from "@firebase/util";
import { listTypes } from "../components/MainInput/inputs/inputOptions";

const data_context = React.createContext();

const users = collection(db, "users");

export function useData() {
  return useContext(data_context);
}

let undoInterval = null;

export function DatabaseContext({ children }) {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [userData, setUserData] = useState(null);
  const [trashData, setTrashData] = useState(null);
  const [filterData, setFilterData] = useState({});
  const [undoTrigger, setUndoTrigger] = useState({ trigger: false, id: [] });

  const userID = currentUser?.uid || null;

  const userDoc = doc(users, userID);
  const userDocCollection = collection(userDoc, "userData");

  useEffect(() => {
    clearInterval(undoInterval);
    if (undoTrigger.trigger) {
      undoInterval = setTimeout(() => {
        undoTrigger.id.forEach((eachId) => {
          deleteData_fireStore(eachId);
        });
        setUndoTrigger({ trigger: false, id: [] });
      }, 10000);
    } else {
      undoInterval && clearInterval(undoInterval);
    }
    // eslint-disable-next-line
  }, [undoTrigger]);

  useEffect(() => {
    const q = query(
      userDocCollection,
      where("delete", "==", false),
      orderBy("publishDate", "desc")
    );
    let unsubscribe = onSnapshot(q, (snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });

    const isMigrated = JSON.parse(localStorage.getItem("isMigratedToV3"));

    if (!isMigrated) {
      const migrationConfirmation = window.confirm(
        "Do you want to migrate your data?"
      );

      if (migrationConfirmation) {
        migrateV2DataToV3();
      }
    }

    async function migrateV2DataToV3() {
      console.log(userDocCollection);
      // get all the documents from the v2 collection
      const docSnap = await getDoc(userDoc);
      //check if the data is migrated
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.version === 3) {
          console.warn("Data already migrated!");
          localStorage.setItem("isMigratedToV3", true);
          return;
        }
      }

      const v2Docs = query(userDocCollection);
      // get all docs
      getDocs(v2Docs).then((snapshot) => {
        const allDocs = snapshot.docs;

        let newData = allDocs.map((doc) => {
          const newDocData = doc.data().data.map((data) => {
            const { additionalValue, id, inner, name, value, inputValue } =
              data;

            if (inner) {
              // it is a list
              const innerList = inner.map((innerItem) => {
                let inputValue = innerItem;
                let checked = innerItem?.done || false;
                if (innerItem.value) {
                  inputValue = innerItem.value;
                }
                return {
                  name,
                  value,
                  state: { inputValue, checked },
                  id: uuidv4(),
                  parentId: id,
                  type: listTypes.checked,
                };
              });
              return [
                {
                  name,
                  value,
                  id,
                  isFocusable: false,
                },
                ...innerList,
              ];
            }
            return {
              name,
              value,
              id,
              state: {
                value: inputValue,
                labelValue: additionalValue?.labelValue,
              },
            };
          });

          const data = doc.data();
          return { ...data, data: newDocData.flat() };
        });

        // delete all docs from userDocCollection
        const deleteDocs = allDocs.map((doc) => {
          return deleteDoc(doc.ref);
        });

        // add newData to userDocCollection
        Promise.all(deleteDocs).then(() => {
          newData.forEach((eachData) => {
            setData_fireStore(eachData);
          });

          window.alert("migrated");
          localStorage.setItem("isMigratedToV3", true);
          updateDoc(userDoc, {
            version: 3,
          });
        });

        console.log(newData);
      });
    }

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  function setData_fireStore(data) {
    console.log(data);
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

  function updateData_fireStore(docId, data) {
    console.log("updated");
    const toBeUpdatedDoc = doc(userDocCollection, docId);
    setDoc(toBeUpdatedDoc, data, { merge: true });
  }

  function deleteData_fireStore(docId) {
    const toBeDeletedDoc = doc(userDocCollection, docId);
    deleteDoc(toBeDeletedDoc);
  }

  const value = {
    data,
    setdata: setData,
    setData_fireStore,
    updateData_fireStore,
    userData,
    setuserData: setUserData,
    trashData,
    settrashData: setTrashData,
    userID,
    filterData: filterData,
    setfilterData: setFilterData,
    deleteData_fireStore,
    undoTrigger,
    setundoTrigger: setUndoTrigger,
  };
  return (
    <data_context.Provider value={value}>{children}</data_context.Provider>
  );
}
