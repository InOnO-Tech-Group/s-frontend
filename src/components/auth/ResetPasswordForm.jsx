import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../re-usable/Button';
import InputText from '../re-usable/InputText';

import leftImage from '/forgot-password-bg.png';
import { checkOTPPassword, forgotPassword, resetPassword } from '../../redux/slices/authSlice';
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
    const navigate = useNavigate()

    const handleCheckClick = async () => {
        setIsChecking(true);
        setError("")
        try {
            if (!otp) {
                setError("OTP is required");
                setIsChecking(false);
                return
            }
            if (otp.length < 6) {
                setError("OTP must be at least 6 characters");
                setIsChecking(false);
                return
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
            }
            else {
                addToast("error", "Unkonwn error occured, try again later.", 4000)
            }
        } catch (error) {
            addToast('error', error.message || 'An unexpected error occurred.', 3000);
            console.error(error);
        } finally {
            setIsChecking(false);
        }
    }
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
                addToast('success', 'Password has been reset successfully.', 3000);
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
        <div className="flex bg-white p-8 rounded-xl shadow-lg w-full mx-auto mt-10 max-w-4xl h-[500px]">
            <div className="flex-1 hidden md:block">
                <img
                    src={leftImage}
                    alt="Background"
                    className="w-full h-full object-cover rounded-l-xl"
                />
            </div>

            <div className="flex-1 flex flex-col justify-center w-full px-6 md:px-10">
                <h1 className="text-3xl font-extrabold text-[#00B5E2] mb-6">
                    Reset Password
                </h1>
                {isOTPValid ? (
                    <div>
                        <p className="text-gray-600 mb-8 text-sm">
                            Enter the new password and then click on reset password button.
                        </p>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    New password
                                </label>
                                <InputText
                                    type="password"
                                    id="newpassword"
                                    value={np}
                                    onChange={setNp}
                                    placeholder="type..."
                                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    aria-label="Enter OTP"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Retype password
                                </label>
                                <InputText
                                    type="password"
                                    id="retypePassword"
                                    value={rtp}
                                    onChange={setRtp}
                                    placeholder="type..."
                                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                    aria-label="Enter OTP"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}

                            <div>
                                <Button
                                    title={
                                        submitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            'Reset password'
                                        )
                                    }
                                    disabled={submitting}
                                    className={`w-full py-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                />
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600 mb-8 text-sm">
                            Enter the 6-characters password sent to your email
                        </p>
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    OTP
                                </label>
                                <div className="flex items-center space-x-3">
                                    <InputText
                                        type="text"
                                        id="otp"
                                        value={otp}
                                        onChange={setotp}
                                        placeholder="******"
                                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                                        aria-label="Enter OTP"
                                    />

                                    <button
                                        type="button"
                                        className="flex items-center bg-green-500 text-white rounded px-4 py-2 font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        onClick={handleCheckClick}
                                    >
                                        {isChecking ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    ></path>
                                                </svg>
                                                Checking...
                                            </span>
                                        ) : (
                                            <>
                                                <FaCheckCircle className="mr-2" />
                                                <span className="mr-2">Check</span>
                                            </>
                                        )}

                                    </button>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ResetPasswordForm;