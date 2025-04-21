import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleType } from "../redux/slices/searchToggleSlice";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const { type } = useSelector((state) => state.forToggle);
  const dispatch = useDispatch();
  const [change, setchange] = useState("");

  const ifMovies = type == "movies";

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-700 shadow-md p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl  dark:text-white text-gray-900 ">Movie Show</h1>
        <div className="hidden lg:flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/movies" className="hover:underline">
            Movies
          </Link>
          <Link to="/series" className="hover:underline">
            Series
          </Link>
          <Link to="/contactUs" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full max-w-md">
        <button
          onClick={() => dispatch(toggleType())}
          className={`px-4 py-2 rounded font-semibold text-sm
            ${
              ifMovies
                ? "bg-blue-gray-900 text-blue-500 hover:bg-blue-700 hover:text-white"
                : " bg-blue-gray-900 text-purple-500 hover:bg-purple-700 hover:text-white "
            }`}
        >
          {ifMovies ? "Search Movies" : "Search Series"}
        </button>

        <input
          type="text"
          value={change}
          onChange={(e) => setchange(e.target.value)}
          placeholder={`Search with ${ifMovies ? "Movies" : "Series"}`}
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        />

        <button
          disabled={!change.trim()}
          className="bg-green-600 disabled:opacity-50 px-4 py-2 rounded text-white text-sm flex items-center gap-1"
        >
          <FiSearch />
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
