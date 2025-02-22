export const BASE_URL = process.env.VITE_PRODURL;

export const AppRoutes = {
    login: BASE_URL + 'login',
    signup: BASE_URL + 'signup',
    getMyInfo: BASE_URL + 'myInfo',
    sendEmail: BASE_URL + 'send-email',
    addProject: BASE_URL + 'addProject',
    getProject: BASE_URL + 'getProjects',
    deleteProject: BASE_URL + 'deleteProject'
};