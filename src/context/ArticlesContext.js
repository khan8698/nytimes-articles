import React, { createContext, useState, useEffect } from "react";
import { fetchMostViewedArticles } from "../api/nytimes";

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [period, setPeriod] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMostViewedArticles(period);
        setArticles(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch articles. Please try again.");
        setArticles([]);
      }
    };

    fetchData();
  }, [period]);

  return (
    <ArticlesContext.Provider value={{ articles, setPeriod, error }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
