import axiosInstance from "../../utils/axios/axiosInstance";
import { handleError } from "./authSlice";

export const adminViewAnnouncements = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/announcement/view");
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const adminCreateAnnouncement = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/announcement/new", data);
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}
export const adminDeleteAnnouncement = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/announcement/delete/${id}`);
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError; x
    }
}