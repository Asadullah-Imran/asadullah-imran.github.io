import { motion } from "framer-motion";
import React from "react";
import { FaCompass, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-[#E1F5F6] to-white flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[#089BAB]/15 text-9xl absolute -inset-8 flex items-center justify-center pointer-events-none"
            >
              <FaCompass />
            </motion.div>
            <h1 className="text-8xl md:text-9xl font-extrabold text-[#002B48] relative select-none">
              404
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#002B48] mb-4">
            Lost in Space?
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable. Let's get you back on track!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link
            to="/"
            className="bg-[#089BAB] hover:bg-[#002B48] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            <FaHome /> Go to Home
          </Link>
          <Link
            to="/projects"
            className="border-2 border-[#002B48] text-[#002B48] hover:bg-[#002B48] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2"
          >
            View Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
