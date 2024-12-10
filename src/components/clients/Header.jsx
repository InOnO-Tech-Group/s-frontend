import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const route = useLocation().pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="block bg-white py-1 sticky top-0 z-50">
      <div className=" bg-white p-2 flex justify-between items-center">
        <div className="flex items-center lg:px-20">
          <img
            src="../../../public/es gishoma logo.svg"
            alt="Logo"
            className="h-15 w-12 object-cover"
          />
        </div>

        <nav className="hidden md:flex lg:flex items-center space-x-6 text-black font-semibold px-10">
          <Link
            to="/"
            className={route === "/" ? "border-b-2 border-primary text-primary" : ""}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={route === "/about" ? "border-b-2 border-primary text-primary" : ""}
          >
            About us
          </Link>
          <Link
            to="/news"
            className={route === "/news" ? "border-b-2 border-primary text-primary" : ""}
          >
            News & Updates
          </Link>
          <Link
            to="/contact"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Contact us
          </Link>
        </nav>

        {/* Hamburger Button for Mobile */}
        <h2 className=" md:hidden lg:hidden">Science,Technology & Culture</h2>
        <button
          className="lg:hidden text-black"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 28 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Centered Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <ul className="bg-white p-6 space-y-6 rounded-lg shadow-lg text-center">
            <li>
              <Link
                to="/"
                className={route === "/" ? "border-b-2 border-primary text-primary" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={route === "/about" ? "border-b-2 border-primary text-primary" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={route === "/news" ? "border-b-2 border-primary text-primary" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News & Updates
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Announcement Bar */}
      <div className="bg-primary w-full text-center text-white font-semibold p-3">
        Office of Director is announcing that the student go home is planned at
        20/12/2024 | Office of Director is announcing that the student go home
        is planned at 20/12/2024
      </div>
    </div>
  );
};

export default Header;
