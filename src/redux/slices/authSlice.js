import axiosInstance from "../../utils/axios/axiosInstance";

/**
 * Handles errors from API requests and formats a standard response object.
 * @param {Object} error - The error object from the API call.
 * @returns {Object} - An object containing the status code and error message.
 */
const handleError = (error) => {
    if (error.response) {
        return {
            status: error.response.status,
            message: error.response.data.message || 'Something went wrong. Please try again.',
        };
    }
    return {
        status: 500,
        message: error.message || 'Unexpected error occurred. Please try again.',
    };
};

/**
 * Sends a forgot password request to the server.
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Object} - The API response data or an error object.
 */
export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/forgot-password', { email });

        if (response.status === 200) {
            return response.data;
        }

        if (response.status === 404) {
            addToast('error', 'User not found. Please check the email address.', 3000);
            return null;
        }

        addToast('error', response.data.message || 'Something went wrong. Please try again.', 3000);
        return null;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
};

/**
 * Sends a forgot password request to the server.
 * @param {string} otp - The email address of the user requesting a password reset.
 * @returns {Object} - The API response data or an error object.
 */
export const checkOTPPassword = async (otp) => {
    try {
        localStorage.setItem('otp', otp);
        const userId = localStorage.getItem('userId');
        const response = await axiosInstance.post('/api/v1/auth/check-otp-validity', { userId, OTP: otp })
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const resetPassword = async (password) => {
    const userId = localStorage.getItem('userId');
    const OTP = localStorage.getItem('otp');
    const response = await axiosInstance.put("/api/v1/auth/reset-password", {
        OTP, userId, password
    })
    return response.data
}
