"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchStore } from "@/store";

const SearchComponent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery } = useSearchStore();

  const searchRef = useRef(null);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="items-center" ref={searchRef}>
      {searchOpen ? (
        <div className="flex rounded-xl overflow-hidden">
          <input
            className="lg:px-4 py-2 text-highlight"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      ) : (
        <button onClick={toggleSearch}>
          <IoSearchOutline className="h-5 w-5 text-2xl" />
        </button>
      )}
    </div>
  );
};

export default SearchComponent;
