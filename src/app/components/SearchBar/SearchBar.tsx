"use client";
import { useState } from "react";
import { CharactersI } from "../../interfaces/Characters";
import "./SearchBar.scss";
import { IoSearchSharp } from "react-icons/io5";
import { useMainContext } from "@/app/context/MainContext";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { setSearchTerm, characters } = useMainContext();

  const results: CharactersI[] = characters?.data?.results || [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <nav className="search-bar">
      <div className="search-bar__container">
        <form
          className="search-bar__container__form"
          onSubmit={handleFormSubmit}
        >
          <button type="submit">
            <IoSearchSharp className="icon" />
          </button>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="SEARCH A CHARACTER ..."
            value={searchInput}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className="search-bar__results">
        <p>
          <span>{results.length} </span>
          <span>RESULT{results.length > 1 && "S"}</span>
        </p>
      </div>
    </nav>
  );
}

export default SearchBar;
