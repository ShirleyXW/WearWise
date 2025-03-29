import axios from 'axios';

export const analysisImg = async (formData: FormData, config = {}) => {
    try {
        const response = await axios.post("http://localhost:8000/predict", formData, {
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