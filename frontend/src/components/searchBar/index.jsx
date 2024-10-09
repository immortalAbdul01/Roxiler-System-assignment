import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "./style.css";

function SearchBar({ setSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearch(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value === "") {
      setSearch(""); // Show the full table when input is empty
    }
  };

  return (
    <div className="search-box-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <IoSearch
        className="search-icon"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
