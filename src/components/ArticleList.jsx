import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ArticlesContext from "../context/ArticlesContext";

const ArticleList = () => {
  const { articles, setPeriod } = useContext(ArticlesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (articles.length > 0) {
      setLoading(false);
    }
  }, [articles]);

  const handlePeriodChange = (event) => {
    setLoading(true);
    setPeriod(parseInt(event.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto m-2 p-4 sm:p-6 font-sans bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-gray-800 text-3xl sm:text-4xl font-bold">
          NY Times Most Viewed Articles
        </h1>
        <select
          onChange={handlePeriodChange}
          className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring"
        >
          <option value={1}>Last 1 day</option>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3498db" loading={loading} size={50} />
        </div>
      ) : (
        <ul className="space-y-4 sm:space-y-6">
          {articles.map((article) => {
            const imageUrl = article.media?.[0]?.['media-metadata']?.find(img => img.format === 'mediumThreeByTwo440')?.url;
            const publishedDate = new Date(article.published_date).toLocaleDateString();

            return (
              <li
                key={article.id}
                className="flex flex-col sm:flex-row p-4 sm:p-6 bg-[#f7fafc] border border-gray-200 rounded-lg transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex-grow">
                  <Link
                    to={`/article/${article.id}`}
                    className="text-blue-600 font-semibold text-lg sm:text-xl hover:underline"
                  >
                    {article.title}
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-3">{article.abstract}</p>
                  <div className="text-gray-500 text-sm mt-4">
                    <p>Published on: {publishedDate}</p>
                    <p>Section: {article.section}</p>
                    <p>{article.byline}</p>
                  </div>
                </div>
                {imageUrl && (
                  <img src={imageUrl} alt={article.title} className="w-full sm:w-40 h-auto rounded-lg mt-4 sm:mt-0 sm:ml-4 object-contain" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ArticleList;
