import axiosInstance from "../../utils/axios/axiosInstance";

const handleResponse = (response) => ({
    status: response.status,
    message: response.data.message || 'Success',
});

const handleError = (error) => {
    if (error.response) {
        return {
            status: error.response.status,
            message: error.response.data.message || 'Something went wrong',
        };
    }
    return {
        status: 500,
        message: error.message || 'Unexpected error occurred. Please try again.',
    };
};

export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/api/v1/auth/forgot-password', { email });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};
