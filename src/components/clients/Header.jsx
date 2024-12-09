import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const route= useLocation().pathname
  return (
    <div className="block bg-white py-1">
      <div className="sticky top-0 bg-white p-2 flex justify-between items-center">
        <div className="flex items-center lg:px-20">
          <img
            src="../../../public/es gishoma logo.svg"
            alt="Logo"
            className="h-15 w-12 object-cover"
          />
        </div>
        <nav className="flex items-center space-x-6 text-black font-semibold px-10">
          <Link
            to="/"
            className={
              route=='/' ? "border-b-2 border-primary text-primary" :""
            }
          >
            Home
          </Link>
          <Link to="/about" className={
              route=='/about' ? "border-b-2 border-primary text-primary" :""
            }
          >
            About us
          </Link>
          <Link to="/news" className={
              route=='/news' ? "border-b-2 border-primary text-primary" :""
            }>
            News & Updates
          </Link>
          <Link
            to="/contact"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Contact us
          </Link>
        </nav>
      </div>
      <div className="bg-primary w-100 text-center text-white font-semibold p-3">
        Office of Director is announcing that the student go home is planned at
        20/12/2024 | Office of Director is announcing that the student go home
        is planned at 20/12/2024
      </div>
    </div>
  );
};

export default Header;
