import axiosInstance from "../../utils/axios/axiosInstance"
import { handleError } from "./authSlice"

export const adminCreateImage = async (data) => {
    try {
        const response = axiosInstance.post("/api/v1/gallery/new", {
            imageURL: data.image,
            caption: data.caption
        })
        return response
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}

export const viewGalleryImages = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/gallery/view")
        return response
    } catch (error) {
        const handledError = handleError(error)
        return handledError
    }
}

export const deleteGalleryImage = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/gallery/delete/${id}`);
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError
    }
}