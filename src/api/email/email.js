import axios from "axios";
import { AppRoutes } from "../../constant/Constant";

export const sendEmail = async (values) => {
    try {
        const response = await axios.post(AppRoutes.sendEmail, values);
        return response.data; // Return API response
    }
    catch (error) {
        console.error("Add Project Error:", error.response?.data || error.message);
        throw (error.response?.data);
    }
};