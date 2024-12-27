import React from 'react';
import { IoCall, IoLocationSharp, IoMail } from 'react-icons/io5'; // Import icons
import { Link } from 'react-router-dom';
import logo from '/es gishoma logo.svg';
import FooterBackground from '/footer_bg1.jpg';
import { FaCopyright } from 'react-icons/fa6';
const Footer = () => {
  return (
    <footer
      className="bg-primary text-white"
      style={{ backgroundImage: `url(${FooterBackground})` }}
    >
      <div className="bg-primary opacity-70 py-4">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img loading="lazy"
              src={logo}
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

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">
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
                  News
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
                  <IoLocationSharp className="text-lg mx-2" /> Gishoma, Rusizi
                  Rwanda
                </span>
              </li>
              <li>
                <a
                  href="mailto:mwitabaanaclet@gmail.com"
                  className="hover:underline flex items-center"
                >
                  <IoMail className="text-lg mx-2" />anacletmwitaba@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+250788458307"
                  className="hover:underline flex items-center"
                >
                  <IoCall className="text-lg mx-2" /> +250788458307
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm border-t pt-2 font-bold pt-4 justify-center flex align-center">
          <FaCopyright className='m-1 mr-2' /> 2024 ES Gishoma - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
