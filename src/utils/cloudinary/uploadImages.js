import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
        throw new Error("Invalid file type. Please upload an image.");
    }

    let uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    let cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    const publicId = `article_${Date.now()}_${Date.now()}}`;
    formData.append("public_id", publicId);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
            formData
        );

        return {
            url: response.data.secure_url,
            public_id: response.data.public_id,
        };
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};
