import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleType,
  fetchMoviesSearch,
  fetchSeriesSearch,
} from "../redux/slices/searchSlice";
import SearchBar from "./SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, query, results } = useSelector((state) => state.headerReducer);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const ifSeries = type === "series";

  useEffect(() => {
    if (query.trim()) {
      const debounce = setTimeout(() => {
        if (ifSeries) {
          dispatch(fetchSeriesSearch(query));
        } else {
          dispatch(fetchMoviesSearch(query));
        }
      }, 100);
      return () => clearTimeout(debounce);
    }
  }, [query, ifSeries, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSidebarOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".toggle-button")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleGoClick = () => {
    if (query.trim() && results.length > 0) {
      navigate(`/${ifSeries ? "series" : "movie"}/${results[0].id}`);
    }
  };

  return (
    <header className="relative z-50 bg-[#EDE8F5] text-[#3D52A0] p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md rounded-b-xl font-['Poppins']">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <h1 className="text-3xl font-bold tracking-wide text-[#3D52A0]">
          🎬 MovieShow
        </h1>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="toggle-button lg:hidden text-[#3D52A0] focus:outline-none"
        >
          {isSidebarOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-40 flex"
          >
            <motion.nav
              className="sidebar w-72 bg-[#ADBBD4] h-full shadow-2xl p-6 flex flex-col text-[#3D52A0] rounded-r-xl border-r-4 border-[#7091E6]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Menu</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#3D52A0] focus:outline-none"
                >
                  <FiX size={24} />
                </button>
              </div>

              <ul className="flex flex-col gap-5 mb-6 ">
                {["/", "/movie", "/series", "/contactUs"].map((path) => (
                  <li key={path}>
                    <Link
                      to={path}
                      onClick={() => setSidebarOpen(false)}
                      className="block py-2 px-3 rounded-md hover:bg-[#EDE8F5] hover:text-[#7091E6] transition"
                    >
                      {path === "/" ? "Home" : path.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => dispatch(toggleType())}
                  className="px-4 py-2 rounded-full font-semibold text-sm bg-[#7091E6] text-white hover:bg-[#3D52A0] transition"
                >
                  {ifSeries ? "Search Series" : "Search Movies"}
                </button>
                <SearchBar
                  ifSeries={ifSeries}
                  onGoClick={handleGoClick}
                  isMobile={true}
                  onCloseSidebar={() => setSidebarOpen(false)}
                />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="hidden lg:flex gap-8 text-sm font-medium tracking-wide">
        {["/", "/movie", "/series", "/contactUs"].map((path) => (
          <Link
            key={path}
            to={path}
            className="px-4 py-2 rounded-md hover:bg-[#EDE8F5] hover:text-[#7091E6] transition"
          >
            {path === "/" ? "Home" : path.slice(1)}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleType())}
          className="px-4 py-1 rounded-full font-semibold text-sm bg-[#7091E6] text-white hover:bg-[#3D52A0] transition"
        >
          {ifSeries ? "Search Series" : "Search Movies"}
        </button>
        <SearchBar ifSeries={ifSeries} onGoClick={handleGoClick} />
      </div>
    </header>
  );
};

export default Header;
