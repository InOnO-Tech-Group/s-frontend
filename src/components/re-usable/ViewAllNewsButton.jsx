// components/CallToActionButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const ViewAllNewsButton = ({ to, text, className }) => {
  return (
    <div className="text-center mt-6">
      <Link to={to}>
        <button
          className={`bg-primary text-white px-6 py-2 rounded-lg hover:bg-dashboard-sidebar flex items-center font-bold ${className}`}
        >
          <span>{text}</span>
          <div className="ml-2">
            <IoIosArrowForward className="text-lg text-white" />
          </div>
        </button>
      </Link>
    </div>
  );
};

export default ViewAllNewsButton;
