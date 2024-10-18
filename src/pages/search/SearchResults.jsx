import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { images, stables } from "../../constants";

const SearchResults = () => {
  const location = useLocation();
  const initialResults = location.state?.searchResults || [];

  const [searchResults, setSearchResults] = useState(initialResults);

  useEffect(() => {
    if (!location.state) {
      setSearchResults([]);
    }

    return () => {
      setSearchResults([]);
    };
  }, [location]);

  return (
    <MainLayout>
      <div className="container mx-auto px-5 py-5">
        <h1 className="mb-4 text-3xl font-bold">Search Results</h1>
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((post) => (
              <div
                key={post.slug}
                className="article-card overflow-hidden rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
              >
                <Link to={`/blog/${post.slug}`}>
                  <img
                    src={
                      post.photo
                        ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                        : images.samplePostImage
                    }
                    alt="title"
                    className="h-auto w-full object-cover object-center md:h-52 lg:h-48 xl:h-60"
                  />
                </Link>
                <div className="p-5">
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-roboto text-xl font-bold text-dark-soft md:text-2xl lg:text-[28px]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-dark-light md:text-lg">
                      {post.caption}
                    </p>
                  </Link>
                  <div className="mt-6 flex flex-nowrap items-center justify-between">
                    <div className="flex items-center gap-x-2 md:gap-x-2.5">
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold italic text-dark-soft md:text-base">
                          {post.user.name}
                        </h4>
                      </div>
                    </div>
                    <span className="text-sm font-bold italic text-dark-light md:text-base">
                      {new Date(post.createdAt).getDate()}{" "}
                      {new Date(post.createdAt).toLocaleString("default", {
                        month: "long",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No search results found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchResults;
