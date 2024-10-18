import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import ArticleCard from "../../components/ArticleCard";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  useEffect(() => {
    return () => {
      if (location.state && location.state.searchResults) {
        location.state.searchResults = [];
      }
    };
  }, [location]);

  return (
    <>
      <MainLayout>
        <div className="container mx-auto px-5 py-5">
          <h1 className="mb-4 text-3xl font-bold">Search Results</h1>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((post) => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  className="article-card"
                />
              ))}
            </div>
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default SearchResults;
