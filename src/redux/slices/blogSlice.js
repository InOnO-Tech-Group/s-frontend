import axiosInstance from "../../utils/axios/axiosInstance";
import { handleError } from "./authSlice"

export const adminCreateBlog = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/blog/new", data);
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}