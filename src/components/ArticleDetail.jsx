import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ArticlesContext from "../context/ArticlesContext";

const ArticleDetail = () => {
  const { id } = useParams();
  const { articles } = useContext(ArticlesContext);
  const [loading, setLoading] = useState(true);
  const article = articles?.find((a) => a.id === parseInt(id));
  const imageUrl = article?.media?.[0]?.["media-metadata"]?.find(
    (img) => img.format === "mediumThreeByTwo440"
  )?.url;
  const publishedDate = new Date(article?.published_date).toLocaleDateString();

  useEffect(() => {
    if (article) {
      setLoading(false);
    }
  }, [article]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans bg-gray-100 rounded-lg shadow-md mt-10">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3498db" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {imageUrl && (
            <div className="mb-4 sm:mb-6">
              <img
                src={imageUrl}
                alt={article?.title}
                className="w-full h-auto rounded-lg object-contain"
              />
              <p className="text-sm text-gray-600 mt-2">
                {article?.media?.[0]?.caption}
              </p>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            {article?.title}
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-4">
            {article?.abstract}
          </p>
          <div className="text-gray-600 text-xs sm:text-sm mb-6">
            <p>
              <strong>By:</strong> {article?.byline}
            </p>
            <p>
              <strong>Published on:</strong> {publishedDate}
            </p>
            <p>
              <strong>Section:</strong> {article?.section}
            </p>
            {article?.geo_facet && article.geo_facet.length > 0 && (
              <p>
                <strong>Geographical Locations:</strong>{" "}
                {article.geo_facet.join(", ")}
              </p>
            )}
          </div>
          <p>
            <a
              href={article?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold text-base sm:text-lg hover:underline"
            >
              Read more
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
