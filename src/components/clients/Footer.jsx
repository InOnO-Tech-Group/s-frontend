import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Logo and Description */}
        <div className="flex flex-col items-center">
          <img
            src="../../../public/es gishoma logo.svg" // Replace with the actual logo URL
            alt="ES Gishoma Logo"
            className="h-16 w-auto mb-4"
          />
          <p className="text-sm text-justify">
            At ES Gishoma, we are dedicated to shaping the minds and character
            of Rwanda's future leaders. Situated in a supportive and inclusive
            environment, our school emphasizes academic excellence, moral
            integrity, and a commitment to lifelong learning.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg mb-4">Quick links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:underline">
                News & Updates
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-lg mb-4 ">Contact us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="flex items-center">
                📍 Gishoma, Rusizi Rwanda
              </span>
            </li>
            <li>
              <a
                href="mailto:info@esgishoma.rw"
                className="hover:underline flex items-center"
              >
                ✉️ info@esgishoma.rw
              </a>
            </li>
            <li>
              <a
                href="tel:+250781234567"
                className="hover:underline flex items-center"
              >
                📞 +250781234567
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm border-t pt-2">
        &copy; 2024 ES Gishoma - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
