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

export const adminViewBlogs = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/blog/view-all-blogs");
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const adminUpdateBlog = async (id, data) => {
    try {
        const response = await axiosInstance.put(`/api/v1/blog/update/${id}`, data);
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const adminDeleteBlog = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/blog/delete/${id}`)
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const adminGetBlogsStatistics = async (year) => {
    try {
        const response = await axiosInstance.get(`/api/v1/blog/view-statistics/${year}`)
        return response.data;
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}

export const clientViewBlogs = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/blog/view-published-blogs");
        return response.data
    } catch (error) {
        const handledError = handleError(error);
        return handledError;
    }
}