// import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import useOutputFilters from "../components/OutputFilters/filterContext";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const dataContext = React.createContext();

const users = collection(db, "users");

export function useData() {
  return useContext(dataContext);
}

let undoInterval = null;

export function DatabaseContext({ children }) {
  const { currentUser } = useAuth();
  const [data, setData] = useState();
  const [userData, setUserData] = useState(null);
  const [trashData, setTrashData] = useState(null);
  const filterData = useOutputFilters();
  const [undoTrigger, setUndoTrigger] = useState({ trigger: false, notes: [] });

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

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserData(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  function setData_fireStore(data) {
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
    setData,
    setData_fireStore,
    updateData_fireStore,
    userData,
    setUserData,
    trashData,
    setTrashData,
    userID,
    filterData: filterData,
    deleteData_fireStore,
    undoTrigger,
    setUndoTrigger,
    updateDocField,
    ...filterData,
  };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}
