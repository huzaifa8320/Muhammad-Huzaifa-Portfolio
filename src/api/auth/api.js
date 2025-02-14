// All Auth API Here 

import axios from "axios";
import { AppRoutes } from "../../constant/Constant";

export const loginUser = async (values) => {
    try {
        const response = await axios.post(AppRoutes.login, values);
        return response?.data?.data;
    } catch (err) {
        throw (err?.response?.data);
    }
};