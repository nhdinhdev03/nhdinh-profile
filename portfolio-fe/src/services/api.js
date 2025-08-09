import axios from 'axios';
import { API_ENDPOINTS } from './config';

const api = {
    getPersonalInfo: () => axios.get(API_ENDPOINTS.personalInfo),
    getProjects: () => axios.get(API_ENDPOINTS.projects),
    getFeaturedProjects: () => axios.get(`${API_ENDPOINTS.projects}/featured`),
    getExperiences: () => axios.get(API_ENDPOINTS.experiences),
    getSkills: () => axios.get(API_ENDPOINTS.skills),
    getSkillsByCategory: (category) => axios.get(`${API_ENDPOINTS.skills}/category/${category}`),
};

export default api;
