import { Typography, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaHome, FaFilm, FaTv, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#EDE8F5] text-[#3D52A0] py-4 px-6">
      <div className="container mx-auto flex flex-col items-center gap-4">
        <Tooltip
          content="Back to Top"
          className="bg-[#3D52A0] text-white text-xs rounded p-1"
        >
          <div
            onClick={handleScrollTop}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity duration-300"
          >
            <Typography
              variant="h5"
              className="font-bold tracking-wide text-lg"
            >
              🎬 MovieShow
            </Typography>
          </div>
        </Tooltip>
        <ul className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-[#7091E6]"
            >
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="flex items-center gap-2 hover:text-[#7091E6]"
            >
              <FaFilm /> Movies
            </Link>
          </li>
          <li>
            <Link
              to="/series"
              className="flex items-center gap-2 hover:text-[#7091E6]"
            >
              <FaTv /> Series
            </Link>
          </li>
          <li>
            <Link
              to="/contactUs"
              className="flex items-center gap-2 hover:text-[#7091E6]"
            >
              <FaEnvelope /> Contact Us
            </Link>
          </li>
        </ul>
        <Typography variant="small" className="text-center text-xs opacity-70">
          © 2025 Created by Amir Shahin & Basel Ashraf
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
