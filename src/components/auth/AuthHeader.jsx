import React from 'react';
import logo from '/es gishoma logo.svg';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
    return (
        <header className="flex items-center justify-between bg-[#00B5E2] p-4 md:p-6 lg:p-8">
            <div className="flex items-center text-white font-bold text-lg sm:text-xl lg:text-2xl">
                <Link to="/login" className="flex items-center space-x-2">
                    <img
                        src={logo}
                        alt="ES Gishoma Logo"
                        className="w-8 sm:w-12 lg:w-16 h-auto"
                    />
                    <span>ES Gishoma</span>
                </Link>
            </div>

            <nav className="text-sm sm:text-base lg:text-lg">
                <Link
                    to="/"
                    className="text-white font-semibold hover:underline transition duration-300"
                >
                    Public Website
                </Link>
            </nav>
        </header>
    );
};

export default AuthHeader;
