import { useCallback, useEffect, useState } from "react";

import styles from "./LinkPreview.module.scss";
import Loading from "../Loading";

function useCachedPreviewData(destinationUrl) {
  const [cached, setCached] = useState(null);
  const [previewData, setPreviewData] = useState({
    title: null,
    description: null,
    image: null,
    "og:image": null,
    "og:title": null,
    "og:description": null,
  });

  useEffect(() => {
    const key = convertToBase64(destinationUrl);
    let cachedData = localStorage.getItem("linkPreviewData");
    if (!cachedData) {
      setCached(false);
      return;
    }
    cachedData = JSON.parse(cachedData);
    console.log(cachedData);
    if (cachedData && cachedData[key]) {
      setPreviewData({ ...cachedData[key] });
      setCached(true);
    } else {
      setCached(false);
    }
  }, [destinationUrl]);

  function setCachedPreviewData(data) {
    const key = convertToBase64(destinationUrl);
    const cachedData = localStorage.getItem("linkPreviewData");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      parsedData[key] = data;
      localStorage.setItem("linkPreviewData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("linkPreviewData", JSON.stringify({ [key]: data }));
    }
    setPreviewData(data);
  }

  return [previewData, setCachedPreviewData, cached];
}

function convertToBase64(str) {
  const base64 = btoa(str);
  return base64;
}

export function LinkPreview({ url }) {
  const [previewData, setPreviewData, cached] = useCachedPreviewData(url);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const data = await fetch(
      process.env.REACT_APP_PROXY_URL + `?destination=${url}`
    ).then((res) => res.text());

    if (!data) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    const temp = {};
    for (const key in previewData) {
      const element =
        doc.querySelector(`meta[name="${key}"]`) ||
        doc.querySelector(`meta[property="${key}"]`);
      if (element) {
        temp[key] = element?.getAttribute("content");
      }
    }

    if (Object.keys(temp).length === 0) {
      setPreviewData(null);
    } else {
      setPreviewData(temp);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (cached !== null) {
      if (cached) {
        setLoading(false);
      } else {
        fetchData();
      }
    }
  }, [cached]);

  useEffect(() => {
    console.log(previewData);
  }, [previewData]);

  return loading ? (
    <div style={{ height: 100, width: "100%" }}>
      <Loading />
    </div>
  ) : (
    previewData !== null && (
      <div className={styles.container}>
        <>
          {(previewData["og:image"] || previewData["image"]) && (
            <img src={previewData["og:image"] || previewData["image"]} alt="" />
          )}
          <div>
            {(previewData["og:title"] || previewData["title"]) && (
              <h6>{previewData["og:title"] || previewData["title"]}</h6>
            )}
            {previewData["og:description"] && (
              <span>{previewData["og:description"]}</span>
            )}
            <div style={{ width: "100%" }}>
              {previewData["description"] && (
                <p>{previewData["description"]}</p>
              )}
            </div>
          </div>
        </>
      </div>
    )
  );
}
