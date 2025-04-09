import axios from 'axios';
const deployedURL = import.meta.env.VITE_API_URL;
export const analysisImg = async (formData: FormData, config = {}) => {
    try {
        const response = await axios.post(`${deployedURL}/predict`, formData, {
            ...config,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return {
            "success": true,
            "data": response.data.data,
        };

    } catch (error) {
        console.error(error);
        return {
            "success": false,
            "message": error
        }
    }
}