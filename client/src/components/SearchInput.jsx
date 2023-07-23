import React, { useRef, useState } from "react";

function SearchInput({ onSearch, placeholder }) {
  const search = useRef();
  if (search === "") {
    window.location.reload(true);
  }
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search.current.value);
  };
  return (
    <div>
      <form className="flex items-center" onSubmit={handleSearch}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="w-full">
          <input
            ref={search}
            type="text"
            id="simple-search"
            className="px-4 py-2 rounded-md border border-gray-300 w-full focus:outline-none text-sm"
            placeholder={placeholder}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-gray-100 bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
