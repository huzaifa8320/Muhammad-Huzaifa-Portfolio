import axios from "axios";
import { AppRoutes } from "../../constant/Constant";


export const addProject = async (projectData) => {
    try {
        const response = await axios.post(AppRoutes.addProject, projectData);
        return response.data; // Return API response
    }
    catch (error) {
        console.error("Add Project Error:", error.response?.data || error.message);
        return null;
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
        const response = await axios.delete(`${AppRoutes.deleteProject}/${_id}`);
        return response.data; // Return API response
    }
    catch (error) {
        console.error("Delete Project Error:", error.response?.data || error.message);
        return null;
    }
};