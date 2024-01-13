"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchStore } from "@/lib/store";
import { Input } from "@/components/ui/input";

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
        <Input
          className="lg:px-4 py-2"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      ) : (
        <IoSearchOutline
          className="h-5 w-5 text-2xl cursor-pointer"
          onClick={toggleSearch}
        />
      )}
    </div>
  );
};

export default SearchComponent;
