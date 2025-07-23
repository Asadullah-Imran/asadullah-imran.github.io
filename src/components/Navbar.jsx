import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#002B48]">
          Asadullah Imran
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/projects", label: "Projects" },
            { path: "/blog", label: "Blog" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-colors ${
                isActive(item.path)
                  ? "text-[#089BAB] border-b-2 border-[#089BAB]"
                  : "text-[#002B48] hover:text-[#089BAB]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#002B48] mb-1 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#002B48] mb-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#002B48] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Mobile Nav */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white bg-opacity-95 z-40 transition-transform duration-300 transform ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4 pt-24 flex flex-col items-center space-y-8">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/projects", label: "Projects" },
              { path: "/blog", label: "Blog" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-2xl font-semibold transition-colors ${
                  isActive(item.path)
                    ? "text-[#089BAB] border-b-2 border-[#089BAB]"
                    : "text-[#002B48] hover:text-[#089BAB]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
