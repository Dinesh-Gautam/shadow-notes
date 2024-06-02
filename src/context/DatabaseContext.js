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
import { input, listTypes } from "../components/MainInput/inputs/inputOptions";
import useOutputFilters from "../components/OutputFilters/filterContext";

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
  const filterData = useOutputFilters();
  const [undoTrigger, setUndoTrigger] = useState({ trigger: false, notes: [] });

  const [loading, setLoading] = useState(true);

  const userID = currentUser?.uid || null;

  const userDoc = doc(users, userID);
  const userDocCollection = collection(userDoc, "userData");

  useEffect(() => {
    clearInterval(undoInterval);
    if (undoTrigger.trigger) {
      undoInterval = setTimeout(() => {
        undoTrigger.notes.forEach(({ id }) => {
          deleteData_fireStore(id);
        });
        setUndoTrigger({ trigger: false, notes: [] });
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
      window.alert("New version available!\nDo you want to migrate your data?");

      migrateV2DataToV3();
    } else {
      setLoading(false);
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
          setLoading(false);
          return;
        }
      }

      const v2Docs = query(userDocCollection);
      // get all docs

      getDocs(v2Docs).then((snapshot) => {
        const allDocs = snapshot.docs;
        // const json = allDocs.map((e) => e.data());
        // console.log(JSON.stringify(json));
        // return;
        let newData = allDocs.map((doc) => {
          const newDocData = doc.data().data.map((data) => {
            let { additionalValue, id, inner, name, value, inputValue } = data;
            if (name === "Pragraph_input_value") {
              name = "Paragraph_input_value";
            }

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
                  state: { value: inputValue, checked },
                  id: uuidv4(),
                  parentId: id,
                };
              });
              return [
                {
                  name,
                  value,
                  id,
                  isFocusable: false,
                  type: listTypes.checked,
                },
                ...innerList,
              ];
            }
            return {
              name,
              value,
              id,
              nonMoveable: name === input.heading || name === input.color,
              isRequired: name === input.heading,
              state: {
                value: inputValue,
                labelValue: additionalValue?.labelValue || null,
              },
            };
          });

          const data = doc.data();
          return { ...data, data: newDocData.flat() };
        });

        console.log("newData");
        console.log(newData);

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
          localStorage.removeItem("inputs");
          updateDoc(userDoc, {
            version: 3,
          });
          setLoading(false);
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
        users: [],
        groups: false,
        favourits: false,
        tags: false,
        version: 3,
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

  async function updateDocField(docId, data) {
    const toBeUpdatedDoc = doc(userDocCollection, docId);
    await updateDoc(toBeUpdatedDoc, data);
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

    deleteData_fireStore,
    undoTrigger,
    setundoTrigger: setUndoTrigger,
    updateDocField,

    ...filterData,
  };
  return (
    <data_context.Provider value={value}>
      {!loading && children}
    </data_context.Provider>
  );
}
