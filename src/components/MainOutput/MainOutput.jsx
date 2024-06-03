import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AnimatePresence } from "framer-motion";
import { useData } from "../../context/DatabaseContext";
import { input } from "../MainInput/inputs/inputOptions";
import { GetOutputFilterTags, filters } from "../OutputFilters/filterContext";
import DropDown from "../elements/DropDown";
import Loading from "../elements/Loading";
import AdditionalButtons from "./AdditionalButtons";
import OutputTemplate, { HighlightTextOnSearchMatch } from "./OutputTemplate";
import { useMemo } from "react";

function getNoteField(data, name) {
  return data.find((data) => data.name === name);
}

function MainOutput() {
  const { filterData: filteredUserData, userData: originalData } = useData();

  const isAnyFilterApplied = useMemo(
    () => Object.keys(filteredUserData).length > 0,
    [filteredUserData]
  );

  const getFilteredData = useMemo(() => {
    if (!originalData || !Object.keys(filteredUserData).length) return;

    return originalData.filter((data) =>
      Object.keys(filteredUserData).every((filterKey) =>
        filters[filterKey].filterFn(data, filteredUserData[filterKey])
      )
    );
  }, [filteredUserData, originalData]);

  const userData = isAnyFilterApplied ? getFilteredData : originalData;

  const [animationParent2] = useAutoAnimate({ duration: 100 });

  return (
    <div className="mainoutput_container">
      <div ref={animationParent2}>
        <GetOutputFilterTags />
      </div>
      <div className="mainoutput_wraper">
        {!userData ? (
          <LoadingCards />
        ) : userData.length < 1 ? (
          <span> Nothing Here. </span>
        ) : (
          <AnimatePresence>
            {userData.map(({ data, id, publishDate, linkSharing, star }) => {
              const headingText = getNoteField(data, input.heading);
              const DropdownBackgroundColor = getNoteField(data, input.color);
              return (
                <DropDown
                  key={id}
                  data={{ linkSharing, star }}
                  extraButtons={
                    <AdditionalButtons
                      userData={data}
                      docId={id}
                      data={{ linkSharing, star }}
                    />
                  }
                  DropdownBackgroundColor={
                    DropdownBackgroundColor &&
                    DropdownBackgroundColor.state.value
                  }
                  mainText={
                    <HighlightTextOnSearchMatch
                      text={headingText.state.value}
                    />
                  }
                >
                  <OutputTemplate
                    publishDate={publishDate}
                    userData={data}
                    completeData={userData}
                    docId={id}
                  />
                </DropDown>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function LoadingCards() {
  return Array(10)
    .fill("")
    .map((e, i) => <Loading key={i} type="simple-card" />);
}

export default MainOutput;
