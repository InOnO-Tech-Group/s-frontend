import axiosInstance from "../../utils/axios/axiosInstance"
import { handleError } from "./authSlice"

export const adminDeleteMessage = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/message/delete/${id}`);
        return response.data
    } catch (error) {
        const handledError = handleError(error)
        return handledError;
    }
}
export const adminGetMessages = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/message/view");
        return response.data
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}
export const adminMarkMessagesAsRead = async (id) => {
    try {
        const response = await axiosInstance.put(`/api/v1/message/mark/${id}`)
        return response.data
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}