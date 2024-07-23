import PropType from "prop-types";
import { useState } from "react";
const Header = ({ onSearch }) => {
  const [textSearch, setTextSearch] = useState("");
  return (
    <div
      className="p-4 bg-black 
    flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <h1
          className="text-[30px] 
      text-red-600 font-bold uppercase"
        >
          Cinema
        </h1>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="p-3 text-black"
          placeholder="Search"
          onChange={(e) => setTextSearch(e.target.value)}
          value={textSearch}
        />
        <button
          className="text-white bg-red-600 p-2"
          onClick={() => onSearch(textSearch)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
Header.propTypes = {
  onSearch: PropType.func,
};
export default Header;
