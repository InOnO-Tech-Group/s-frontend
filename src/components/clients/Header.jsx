import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/public/es gishoma logo.svg";
import { clientsAnnouncements } from "../../redux/slices/announcementsSlice";
import MenuDropDown from "./MenuDropDown";
import { BiStar } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import { FaChevronRight } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [publishedAnnoncement, setPublishedAnnouncement] = useState([]);
  const [isServicesModalVisible, setIsServicesModalVisible] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const route = useLocation().pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const getActiveAnnoncement = async () => {
    try {
      const response = await clientsAnnouncements();
      if (response.status === 200) {
        setPublishedAnnouncement(response.data);
      }
    } catch (error) {
      console.error("error", error.toString() || "Unknown error occurred");
    }
  };

  useEffect(() => {
    getActiveAnnoncement();
  }, []);

  const toggleServicesModal = () => {
    setIsServicesModalVisible((prev) => !prev);
  };
  const toggleAnnouncementModal = () => {
    setIsAnnouncementModalOpen((prev) => !prev);
  };
  return (
    <div className="block bg-white py-1 sticky top-0 z-[1000]">
      <div className="bg-white p-2 flex justify-between items-center">
        <div className="flex items-center lg:px-20">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-15 w-12 object-cover" />
          </Link>
        </div>

        <nav className="hidden md:flex lg:flex items-center space-x-6 text-black font-semibold px-10">
          <Link
            to="/"
            className={
              route === "/" && !isServicesModalVisible
                ? "border-b-2 border-primary text-primary"
                : ""
            }
          >
            Home
          </Link>
          <Link
            to="/about"
            className={
              route === "/about" && !isServicesModalVisible
                ? "border-b-2 border-primary text-primary"
                : ""
            }
          >
            About us
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setIsServicesModalVisible(true)}
            onMouseLeave={() => setIsServicesModalVisible(false)}
          >
            <button
              className={
                route.includes("/news") && !isServicesModalVisible
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }
            >
              Services
            </button>
            {isServicesModalVisible && (
              <div
                className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 z-50"
                style={{ width: "200px", maxHeight: "300px", overflow: "auto" }}
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
          Science, Technology & Culture
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
        <div className="fixed inset-0 bg-black w-full bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-red-500 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <ul className="space-y-6 text-center">
              <li>
                <Link
                  to="/"
                  className={
                    route === "/" && !isServicesModalVisible
                      ? "border-b-2 border-primary text-primary"
                      : ""
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
                    route === "/about" && !isServicesModalVisible
                      ? "border-b-2 border-primary text-primary"
                      : ""
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About us
                </Link>
              </li>

              <li>
                <div className="relative">
                  <button
                    onClick={toggleServicesModal}
                    className={`w-50 ${
                      isServicesModalVisible
                        ? "border-b-2 border-primary text-primary "
                        : ""
                    }`}
                  >
                    Services
                  </button>

                  {isServicesModalVisible && (
                    <div
                      className="bg-gray-100 rounded-lg p-4 mt-4 max-h-[300px] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MenuDropDown />
                    </div>
                  )}
                </div>
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
        </div>
      )}

{isAnnouncementModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
    <div
      className="bg-white p-8 rounded-lg shadow-lg w-4/5 max-w-4xl relative animate-slide-down"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={toggleAnnouncementModal}
        className="absolute top-4 right-4 text-red-500  transition-transform transform hover:scale-150"
      >
       <AiOutlineClose className="w-6 h-6 border p-1" />
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Announcements</h2>

      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        {publishedAnnoncement.map((data, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg "
          >
            <p className="text-sm text-gray-500 mb-2">
              {new Date(data.createdAt).toLocaleDateString()}
            </p>
            <div
              className="text-lg font-medium text-gray-800"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)}


      {publishedAnnoncement.length > 0 && (
        <div className="bg-primary w-full text-center text-white font-semibold p-3 overflow-hidden flex">
          <Marquee>
            <div className="flex whitespace-nowrap transition-transform duration-1000 ease-linear">
              {publishedAnnoncement.map((data, index) => (
                <div key={index} className="flex">
                  <p dangerouslySetInnerHTML={{ __html: data.content }} />
                  {index < publishedAnnoncement.length - 1 && (
                    <BiStar className="m-1 ml-5 mr-5" />
                  )}
                </div>
              ))}
            </div>
          </Marquee>
          <button
            className="w-auto px-3 py-2 text-lg flex items-center bg-white rounded-sm text-primary shadow-lg "
            onClick={toggleAnnouncementModal}
          >
            All
            <FaChevronRight
              className="text-black"
              title="Click to view all announcement together ."
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
