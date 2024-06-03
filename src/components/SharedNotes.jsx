import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Loading from "./elements/Loading";
import DropDown from "./elements/DropDown";
import { input } from "./MainInput/inputs/inputOptions";
import { Link } from "react-router-dom";

import styles from "styles/components/Shared.module.scss";
import OutputTemplate from "./MainOutput/OutputTemplate";

function SharedNotes() {
  const [userData, setUserData] = useState(null);

  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const users = collection(db, "users");
  const userDoc = doc(users, userId);

  const getDocuments = async (documentReferences) => {
    const documentSnapshots = await Promise.all(
      documentReferences
        .filter((ref) => ref.path.split("/")[1] !== userId)
        .map((ref) => getDoc(ref).catch((e) => console.error(e)))
    );
    const documents = documentSnapshots
      .map((snapshot) => {
        if (snapshot && snapshot.exists()) {
          return snapshot.data();
        } else {
          console.log("Document does not exist");
          return null;
        }
      })
      .filter((e) => e);

    return documents;
  };

  useEffect(() => {
    if (!userId) {
      console.error("user not logged in!");
    }
    getDoc(userDoc).then(async (doc) => {
      const { shared } = doc.data();
      if (!shared) {
        setUserData([]);
        return;
      }
      const docs = await getDocuments(shared);

      setUserData(docs);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        paddingTop: "0",
        overflow: "auto",
        height: "100%",
      }}
      className="mainoutput_container"
    >
      <div className={styles.topContainer}>
        <Link to={"/"}>
          <button>Go to home</button>
        </Link>
      </div>
      <div style={{}} className="mainoutput_wraper">
        {!userData ? (
          Array(10)
            .fill("")
            .map((e, i) => <Loading key={i} type="simple-card" />)
        ) : userData.length < 1 ? (
          <span> Nothing Here. </span>
        ) : (
          userData.map(({ data, id, publishDate, linkSharing, star }) => {
            const headingText = data.find(
              (data) => data.name === input.heading
            );
            const DropdownBackgroundColor = data.find(
              (data) => data.name === input.color
            );
            return (
              <DropDown
                key={id}
                // extraButtons={
                //   <AdditionalButtons
                //     userData={data}
                //     docId={id}
                //     data={{ linkSharing, star }}
                //   />
                // }
                DropdownBackgroundColor={
                  DropdownBackgroundColor && DropdownBackgroundColor.state.value
                }
                mainText={
                  headingText.state.value
                  //   <HighlightTextOnSearchMatch text={headingText.state.value} />
                }
              >
                <OutputTemplate
                  simple={true}
                  publishDate={publishDate}
                  userData={data}
                  completeData={userData}
                  docId={id}
                />
              </DropDown>
            );
          })
        )}
      </div>
    </div>
  );
}

export default SharedNotes;
