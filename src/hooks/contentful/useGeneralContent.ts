import { GeneralContent } from "@app/types";
import { useState, useEffect } from "react";
/* import { Hero } from "../types/contentful"; */

const useGeneralContent = () => {
  const [generalContent, setGeneralContent] = useState<GeneralContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/api/generalContent");
        const data = await response.json();
        setGeneralContent(data);
      } catch (error) {
        console.error("Error fetching hero section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { generalContent, loading };
};

export default useGeneralContent;
