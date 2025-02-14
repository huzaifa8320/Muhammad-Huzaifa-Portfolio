import axios from "axios";
import { AppRoutes } from "../../constant/Constant";

export const myInfo = async (values) => {
    try {
        const response = await axios.post(AppRoutes.myInfo, values);
        return response;
    } catch (err) {
        throw (err);
    }
};