import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#EDE8F5] text-[#3D52A0] font-['Poppins']"
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page Not Found</p>
      <p className="text-lg mb-12 text-center max-w-md">
        The page you're looking for doesn't exist or there was an error. Let's
        get you back on track!
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#7091E6] to-[#3D52A0] text-white hover:brightness-110 transition-shadow duration-300 shadow-xl"
      >
        Back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
