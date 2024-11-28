import React, { useState } from 'react';
import Button from '../re-usable/Button';
import InputText from '../re-usable/InputText';

import leftImage from '/forgot-password-bg.png';
import { forgotPassword } from '../../redux/slices/authSlice';
import { useToast } from '../toasts/ToastManager';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitting, setIsSubmitting] = useState(false); // State for loading spinner
    const { addToast } = useToast();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true); // Start spinner

        try {
            if (!email) {
                setError('Email is required');
                setIsSubmitting(false); // Stop spinner
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                setError('Please enter a valid email address');
                setIsSubmitting(false); // Stop spinner
                return;
            }

            const response = await forgotPassword(email);

            if (response.status === 200) {
                addToast('success', 'Check your email inbox for OTP password', 3000);
                navigate("/reset-password");
            } else if (response.status === 404) {
                addToast('error', 'User not found. Please check the email address.', 3000);
            } else {
                addToast('error', response.message || 'Something went wrong. Please try again.', 3000);
            }
        } catch (error) {
            addToast('error', error.message || 'An unexpected error occurred.', 3000);
            console.error(error);
        } finally {
            setIsSubmitting(false); // Stop spinner
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
                    Forgot Password
                </h1>
                <p className="text-gray-600 mb-8 text-sm">
                    Enter your email address, and we'll send you instructions to reset your password.
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <InputText
                            type="text"
                            id="email"
                            value={email}
                            onChange={setEmail}
                            placeholder="e.g., john@gishoma.rw"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2">{error}</p>
                        )}
                    </div>

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
                                    'Submit'
                                )
                            }
                            disabled={submitting}
                            className={`w-full py-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;