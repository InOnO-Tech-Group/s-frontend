import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ type, message, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const toastStyles = {
    success: 'bg-green-500 text-white border-green-600',
    error: 'bg-red-500 text-white border-red-600',
    info: 'bg-blue-500 text-white border-blue-600',
  };

  return (
    <div
      className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg transition-all duration-500 z-[1002]
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
                ${toastStyles[type]} border-l-4`}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-black">
          {type === 'success' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 text-green-500"
            >
              <path
                fill="none"
                d="M1 12l5 5L22 5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ) : type === 'error' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 text-red-500"
            >
              <path
                fill="none"
                d="M12 9v2m0 4h.01m-6.928 4.928l1.415-1.415M3 12l18 0m-1.415 6.928l-1.415-1.415"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 text-blue-500"
            >
              <path
                fill="none"
                d="M12 3v12m0 0l4-4m-4 4l-4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>

        <p className="flex-1 text-sm">{message}</p>

        <button
          onClick={handleClose}
          className="ml-4 text-lg font-bold opacity-80 hover:opacity-100 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
