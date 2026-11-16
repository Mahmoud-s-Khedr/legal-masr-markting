import { useEffect, useState } from "react";
import { recommendedDownloadForBrowser } from "../lib/recommend-download";

export default function useRecommendedDownload() {
  const [detected, setDetected] = useState(null);
  useEffect(() => {
    let active = true;
    recommendedDownloadForBrowser(navigator).then((result) => {
      if (active) setDetected(result);
    });
    return () => { active = false; };
  }, []);
  return detected;
}
