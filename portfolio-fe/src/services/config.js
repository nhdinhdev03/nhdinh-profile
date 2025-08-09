// API configuration
const API_BASE_URL = 'http://localhost:8080/api/v1';

// API endpoints
const API_ENDPOINTS = {
    personalInfo: `${API_BASE_URL}/personal-info`,
    projects: `${API_BASE_URL}/projects`,
    experiences: `${API_BASE_URL}/experiences`,
    skills: `${API_BASE_URL}/skills`,
};

export { API_BASE_URL, API_ENDPOINTS };
