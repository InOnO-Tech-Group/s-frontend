import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#03404F] text-white py-4 px-6 fixed bottom-0 left-0 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm sm:text-base">
                    &copy; {currentYear}{" "}
                    <Link to="/" className="hover:underline">
                        ES Gishoma
                    </Link>
                </div>

                <div className="text-sm sm:text-base mt-2 md:mt-0">
                    Developed by{" "}
                    <a
                        href="https://github.com/InOnO-Tech-Group"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline"
                    >
                        Inono Tech Group
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;
