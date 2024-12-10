import axiosInstance from "../../utils/axios/axiosInstance";
import { handleError } from "./authSlice"

export const userViewProfile = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/user/view");
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError
    }
}

export const userUpdateProfile = async (data) => {
    try {
        const response = await axiosInstance.put("/api/v1/user/update", {
            firstName: data.firstname,
            email: data.email,
            lastName: data.lastname
        });
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError
    }
}