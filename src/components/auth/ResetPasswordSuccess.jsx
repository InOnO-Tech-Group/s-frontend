import React from 'react';
import { Link } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthFooter from '../../components/auth/AuthFooter';
import SEO from '../../components/re-usable/SEO';

const ResetPasswordSuccess = () => {
    return (
        <>
            <SEO title="Password reset succed - ES Gishoma" />
            <div className="bg-[#00B5E2] min-h-screen flex flex-col justify-between">
                <AuthHeader />

                <div className="flex-grow flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 max-w-md">
                        <div className="flex justify-center items-center bg-blue-500 w-16 h-16 rounded-full mx-auto mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h2 className="text-center text-xl text-gray-800 mb-4">
                            Password Changed Successfully
                        </h2>

                        <div className="mt-6 text-center text-xl font-semibold text-gray-800 mb-4">
                            <Link
                                to="/login"
                                className="w-full p-3 bg-blue-500 text-white text-center font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Continue to Login
                            </Link>
                        </div>
                    </div>
                </div>

                <AuthFooter />
            </div>
        </>
    );
};

export default ResetPasswordSuccess;