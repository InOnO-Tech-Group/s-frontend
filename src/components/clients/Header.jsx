import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/public/es gishoma logo.svg';
import { clientsAnnouncements } from '../../redux/slices/announcementsSlice';
import { useToast } from '../../components/toasts/ToastManager';
import Button from '../re-usable/Button';
import MenuDropDown from './MenuDropDown';

const Header = () => {
  const { addToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [publishedAnnoncement, setPublishedAnnouncement] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const route = useLocation().pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const getActiveAnnoncement = async () => {
    try {
      const response = await clientsAnnouncements();
      if (response.status === 200) {
        console.log(response);
        setPublishedAnnouncement(response.data);
      } else {
        console.log(
          'error',
          response.message || 'Error in getting announcement'
        );
      }
    } catch (error) {
      console.log('error', error.toString() || 'Unknown error occurred');
    }
  };
  useEffect(() => {
    getActiveAnnoncement();
  }, []);
  useEffect(() => {
    if (publishedAnnoncement.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === publishedAnnoncement.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [publishedAnnoncement]);

  return (
    <div className="block bg-white py-1 sticky top-0 z-[1000]">
      <div className=" bg-white p-2 flex justify-between items-center">
        <div className="flex items-center lg:px-20">
          <img src={logo} alt="Logo" className="h-15 w-12 object-cover" />
        </div>

        <nav className="hidden md:flex lg:flex items-center space-x-6 text-black font-semibold px-10">
          <Link
            to="/"
            className={
              route === '/' && !isModalVisible
                ? 'border-b-2 border-primary text-primary'
                : ''
            }
          >
            Home
          </Link>
          <Link
            to="/about"
            className={
              route === '/about' && !isModalVisible
                ? 'border-b-2 border-primary text-primary'
                : ''
            }
          >
            About us
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsModalVisible(true)}
            onMouseLeave={() => setIsModalVisible(false)}
          >
            <button
              className={`${
                isModalVisible && 'border-b-2 border-primary text-primary'
              }`}
            >
              Services
            </button>
            {isModalVisible && (
              <div
                className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 z-50"
                style={{ width: '200px', maxHeight: '300px', overflow: 'auto' }}
              >
                <MenuDropDown />
              </div>
            )}
          </div>
          <Link
            to="/contact"
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Contact us
          </Link>
        </nav>

        <h2 className="block md:hidden lg:hidden">
          Science,Technology & Culture
        </h2>
        <button
          className="md:hidden lg:hidden text-black"
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

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black w-full bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <ul className="bg-white p-6 space-y-6 rounded-lg shadow-lg text-center">
            <li>
              <Link
                to="/"
                className={
                  route === '/' ? 'border-b-2 border-primary text-primary' : ''
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  route === '/about'
                    ? 'border-b-2 border-primary text-primary'
                    : ''
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={
                  route === '/news'
                    ? 'border-b-2 border-primary text-primary'
                    : ''
                }
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

      {publishedAnnoncement.length > 0 && (
        <div className="bg-primary w-full text-center text-white font-semibold p-3 overflow-hidden">
          <div
            className="whitespace-nowrap transition-transform duration-1000 ease-linear"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {publishedAnnoncement.map((data, index) => (
              <div
                key={index}
                className="inline-block w-full text-center font-bold"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
