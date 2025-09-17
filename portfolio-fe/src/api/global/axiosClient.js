import axios from 'axios';
import httpStatus from './httpStatus';

const baseUrl = process.env.REACT_APP_Profile_PRODUCTION_REST_API;

console.log('Axios baseURL configured as:', baseUrl);

const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/json',
    },
});

// Request interceptor để thêm token vào header
axiosClient.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token && token !== 'undefined' && token !== 'null') {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Thiết lập header xác thực không thành công:', error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor để xử lý lỗi
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response;
        }
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case httpStatus.UNAUTHORIZED:
                    // Token hết hạn hoặc không hợp lệ
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    // Redirect to login if needed
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    break;
                case httpStatus.INTERNAL_SERVER_ERROR:
                    console.error('Server error:', error);
                    break;
                case httpStatus.CONFLICT:
                    // Xử lý conflict errors
                    break;
                default:
                    console.log('API Error:', error);
                    break;
            }
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
