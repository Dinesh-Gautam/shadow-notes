import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useState } from "react";
import DropDown from "./elements/DropDown/DropDown";

import { input } from "./MainInput/inputs/inputOptions";
import SimpleOutputTemplate from "./MainOutput/SimpleOutputTemplet";
import { useAuth } from "../context/AuthContext";

import styles from "./Shared.module.scss";
import { Error } from "@mui/icons-material";

function Shared() {
  let { userId, docId } = useParams();

  const { currentUser } = useAuth();

  const users = collection(db, "users");
  const userDoc = doc(users, userId);
  const userDocCollection = collection(userDoc, "userData");

  const [data, setData] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const q = doc(userDocCollection, docId);

    if (currentUser?.uid && userId !== currentUser?.uid) {
      const ref = doc(userDocCollection, docId);
      const sharedRef = doc(users, currentUser?.uid);
      updateDoc(sharedRef, {
        shared: arrayUnion(ref),
      });
    }

    let unsubscribe = onSnapshot(
      q,
      (doc) => {
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
        } else {
          const message = "Document does not exists";
          console.error(message);
          setError({ error: true, message });
        }
      },
      (e) => {
        if ((e.code = "permissions-denied")) {
          const message = "You don't have access to this document";
          console.error(message);
          setError({ error: true, message });
        } else {
          const message = "some error occurred!";
          console.error(message);
          setError({ error: true, message });
        }
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className={styles.topContainer}>
        <Link to={"/"}>
          <button>Go to home</button>
        </Link>
      </div>
      {error ? (
        <div className={styles.errorContainer}>
          <Error fontSize="large" color="error" />
          <h1>{error.message}</h1>
        </div>
      ) : data ? (
        <>
          <div>
            <DropDown
              key={data.id}
              open={true}
              DropdownBackgroundColor={
                data.data.find((data) => data.name === input.color)?.state
                  ?.value
              }
              mainText={
                data.data.find((data) => data.name === input.heading)?.state
                  ?.value
              }
            >
              <SimpleOutputTemplate
                publishDate={data.publishDate}
                userData={data.data}
                completeData={data}
                docId={data.id}
              />
            </DropDown>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Shared;
