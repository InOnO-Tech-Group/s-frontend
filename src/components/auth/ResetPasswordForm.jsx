import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../re-usable/Button';
import InputText from '../re-usable/InputText';

import leftImage from '/forgot-password-bg.png';
import { checkOTPPassword, resetPassword } from '../../redux/slices/authSlice';
import { useToast } from '../toasts/ToastManager';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
    const [otp, setotp] = useState('');
    const [np, setNp] = useState('');
    const [rtp, setRtp] = useState('');
    const [error, setError] = useState('');
    const [submitting, setIsSubmitting] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isOTPValid, setIsOTPValid] = useState(false);
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleCheckClick = async () => {
        setIsChecking(true);
        setError("");
        try {
            if (!otp) {
                setError("OTP is required");
                setIsChecking(false);
                return;
            }
            if (otp.length < 6) {
                setError("OTP must be at least 6 characters");
                setIsChecking(false);
                return;
            }

            const response = await checkOTPPassword(otp);
            if (response.status === 200) {
                addToast("success", "OTP is valid, now enter the new password", 4000);
                setIsOTPValid(true);
                return;
            }
            if (response.status === 400) {
                addToast("error", "Invalid OTP, try again latter!", 4000);
                return;
            } else {
                addToast("error", "Unknown error occurred, try again later.", 4000);
            }
        } catch (error) {
            addToast('error', error.message || 'An unexpected error occurred.', 3000);
            console.error(error);
        } finally {
            setIsChecking(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            if (!np || !rtp) {
                setError('Both password fields are required.');
                setIsSubmitting(false);
                return;
            }

            if (np !== rtp) {
                setError('Passwords do not match.');
                setIsSubmitting(false);
                return;
            }
            if (np.length < 8 || rtp.length < 8) {
                setError('Passwords must be at least 8 characters long.');
                setIsSubmitting(false);
                return;
            }

            const response = await resetPassword(np);
            if (response.status === 200) {
                addToast('success', 'Password has been reseted successfully, Login to continue.', 3000);
                navigate('/login');
            } else {
                setError('Failed to reset password. Please try again.');
            }
        } catch (error) {
            addToast('error', error.message || 'An unexpected error occurred.', 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-1 bg-white items-center justify-center rounded-3xl shadow-lg w-full mx-auto mt-10 max-w-4xl h-[500px]">
            <div className="flex-1 hidden md:block">
                <img
                    src={leftImage}
                    alt="Background"
                    className="w-full h-full object-cover rounded-l-xl"
                />
            </div>

            <div className="flex-1 flex flex-col justify-center w-full px-4 sm:px-6 md:px-10 p-10">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-primary mb-4 md:mb-6">
                    Reset Password
                </h1>

                {isOTPValid ? (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            Enter the new password and then click on reset password button.
                        </p>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <InputText
                                type="password"
                                id="newpassword"
                                value={np}
                                onChange={setNp}
                                placeholder="Type..."
                                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="retypePassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Retype Password
                            </label>
                            <InputText
                                type="password"
                                id="retypePassword"
                                value={rtp}
                                onChange={setRtp}
                                placeholder="Type..."
                                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        <div>
                            <Button
                                title={submitting ? 'Submitting...' : 'Reset Password'}
                                disabled={submitting}
                                className={`w-full py-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            />
                        </div>
                    </form>
                ) : (
                    <form className="space-y-6">
                        {/* Instruction Text */}
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            Enter the 6-character OTP sent to your email.
                        </p>

                        {/* OTP Input and Button */}
                        <div>
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                OTP
                            </label>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                                {/* Input Field */}
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setotp(e.target.value)}
                                    placeholder="******"
                                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                />

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    className="flex items-center justify-center bg-green-500 text-white rounded px-4 py-2 font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                                    onClick={handleCheckClick}
                                >
                                    {isChecking ? (
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>
                                    ) : (
                                        <FaCheckCircle className="mr-2" />
                                    )}
                                    Check
                                </button>
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordForm;