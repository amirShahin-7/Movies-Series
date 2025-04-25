import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleType } from "../redux/slices/searchToggleSlice";
import { useState, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { type } = useSelector((state) => state.forToggle);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const ifMovies = type === "movies";

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <header className="relative z-50 bg-[#EDE8F5] text-[#3D52A0] p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md rounded-b-xl font-['Poppins']">
      {/* Logo & Menu Toggle */}
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

      {/* Mobile Sidebar */}
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
              <h2 className="text-xl font-semibold mb-6">Menu</h2>
              <ul className="flex flex-col gap-5">
                {["/", "/movies", "/series", "/contactUs"].map((path) => (
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
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 text-sm font-medium tracking-wide">
        {["/", "/movies", "/series", "/contactUs"].map((path) => (
          <Link
            key={path}
            to={path}
            className="px-4 py-2 rounded-md hover:bg-[#EDE8F5] hover:text-[#7091E6] transition"
          >
            {path === "/" ? "Home" : path.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Search & Type Toggle */}
      <div className="w-full lg:max-w-md">
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <button
            onClick={() => dispatch(toggleType())}
            className="px-4 py-2 rounded-full font-semibold text-sm bg-[#7091E6] text-white hover:bg-[#3D52A0] transition"
          >
            {ifMovies ? "Search Movies" : "Search Series"}
          </button>

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${ifMovies ? "Movies" : "Series"}...`}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#8697C4] bg-[#EDE8F5] text-[#3D52A0] placeholder-[#8697C4] focus:outline-none focus:border-[#7091E6] shadow-inner"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8697C4]" />
          </div>

          <button
            disabled={!query.trim()}
            className="px-5 py-3 rounded-full font-semibold text-sm flex items-center gap-2 bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white hover:brightness-110 transition-shadow duration-300 shadow-xl"
          >
            <FiSearch />
            Go
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
