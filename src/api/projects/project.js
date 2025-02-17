import axios from "axios";
import { AppRoutes } from "../../constant/Constant";
import Cookies from "js-cookie";


export const addProject = async (projectData) => {
    try {
        const response = await axios.post(AppRoutes.addProject, projectData, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        }
        );
        return response.data; // Return API response
    }
    catch (error) {
        console.error("Add Project Error:", error.response?.data || error.message);
        throw (error.response?.data);
        // return error.response?.data;
    }
};


export const getProjects = async () => {
    try {
        const response = await axios.get(AppRoutes.getProject);
        return response.data; // Return API response
    }
    catch (error) {
        console.error("Get Projects Error:", error.response?.data || error.message);
        return null;
    }
}


export const deleteProject = async (_id) => {
    try {
        const response = await axios.delete(`${AppRoutes.deleteProject}/${_id}` , {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        return response.data; // Return API response
    }
    catch (error) {
        console.error("Delete Project Error:", error.response?.data || error.message);
        return null;
    }
};