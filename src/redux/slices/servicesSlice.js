import axiosInstance from "../../utils/axios/axiosInstance"
import { handleError } from "./authSlice"

export const adminCreateService = async (data) => {
    try {
        const response = await axiosInstance.post("/api/v1/service/new", data)
        return response.data;
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}

export const adminViewServices = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/service/view");
        return response.data;
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}

export const adminDeleteService = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/service/delete/${id}`);
        return response.data
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}

export const adminUpdateService = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/v1/service/update/${id}`, data)
        return response.data;
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}