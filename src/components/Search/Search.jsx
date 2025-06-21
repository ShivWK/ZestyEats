import SearchContainer from "../SearchContainer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  
  const crossHandler = () => {
    setSearchTerm('');
  }

  return (
    <SearchContainer
      placeholder={"Search for restaurants and food"}
      searchTerm={searchTerm}
      handleSearch={handleSearch}
      crossHandler={crossHandler}
      Child={Outlet}
    />
  );
};

export default Search;

