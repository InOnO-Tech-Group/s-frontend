import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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

    return (
        <div
            className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg transition-transform duration-300 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                } ${type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm">{message}</p>
                <button
                    onClick={handleClose}
                    className="ml-4 text-lg font-bold opacity-80 hover:opacity-100"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

Toast.propTypes = {
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    duration: PropTypes.number,
};

export default Toast;
