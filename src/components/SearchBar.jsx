import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { setQuery, clearResults } from "../redux/slices/searchSlice";

const SearchBar = ({
  ifSeries,
  onGoClick,
  isMobile = false,
  onCloseSidebar,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, results } = useSelector((state) => state.headerReducer);

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const defaultImage =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        dispatch(clearResults());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleNavigation = (item) => {
    navigate(`/${ifSeries ? "series" : "movie"}/${item.id}`);
    setTimeout(() => {
      dispatch(clearResults());
      setSelectedIndex(-1);
      if (isMobile && onCloseSidebar) onCloseSidebar();
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleNavigation(results[selectedIndex]);
      } else if (query.trim() && results.length > 0) {
        handleNavigation(results[0]);
      }
    }
  };

  return (
    <div className="container relative flex flex-row gap-3">
      {isMobile ? (
        <button
          onClick={onGoClick}
          disabled={!query.trim()}
          className="w-full mb-4 px-10 py-3 rounded-full font-semibold text-sm flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white hover:brightness-110 transition-shadow duration-300 shadow-xl"
        >
          <FiSearch />
          Go
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onGoClick}
            disabled={!query.trim()}
            className="flex flex-col px-10 py-2 rounded-full font-semibold text-sm bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white hover:brightness-110 transition-shadow duration-300 shadow-xl"
          >
            <FiSearch />
            Go
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        onKeyDown={handleKeyDown}
        placeholder={`Search ${ifSeries ? "Series" : "Movies"}...`}
        className="w-full px-2 rounded-full border-2 border-[#8697C4] bg-[#EDE8F5] text-[#3D52A0] placeholder-[#8697C4] focus:outline-none focus:border-[#7091E6] shadow-inner"
      />
      {results.length > 0 && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 mt-2 bg-[#EDE8F5] rounded-lg shadow-lg max-h-[260px] overflow-y-auto z-50"
        >
          {results.map((item, index) => (
            <Link
              key={item.id}
              to={`/${ifSeries ? "series" : "movie"}/${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(item);
              }}
            >
              <div
                className={`flex  items-center p-3 border-b border-[#ADBBDA] hover:bg-[#ADBBDA] transition ${
                  index === selectedIndex ? "bg-[#ADBBDA]" : ""
                }`}
              >
                <img
                  src={
                    item.backdrop_path || item.poster_path
                      ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                          item.backdrop_path || item.poster_path
                        }`
                      : defaultImage
                  }
                  alt={item.title || item.name}
                  className="w-10 h-10 rounded-full object-cover shadow-md"
                />
                <span className="ml-3 text-[#3D52A0] font-medium">
                  {item.title || item.name}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
