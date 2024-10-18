import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  return (
    <div className="container mx-auto px-5 py-5">
      <h1 className="text-3xl font-bold">Search Results</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id} className="my-2">
              <h2 className="text-xl font-semibold">{result.title}</h2>
              <p>{result.caption}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
