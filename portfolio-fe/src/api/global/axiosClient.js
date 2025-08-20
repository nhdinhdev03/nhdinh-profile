import axios from 'axios';
import httpStatus from './httpStatus';
// import authApi from 'api/Admin/Auth/auth';


const baseUrl = process.env.REACT_APP_Profile_PRODUCTION_REST_API;
// setup axios client

const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/json',
    },
    // withCredentials: true,
});

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
                case httpStatus.INTERNAL_SERVER_ERROR:
                    // TODO: Implement proper error handling for server errors
                    // console.error('Thiết lập header xác thực không thành công:', error);
                    break;
                // case 401:
                //     funcUtils.notify(error.response.data.message, 'error');
                //     break;
                // case httpStatus.CONFLICT:
                //     funcUtils.notify(error.response.data, 'error');
                //     break;
                default:
                    // TODO: Implement proper error logging system
                    // console.log(error);
                    break;
            }
        }
        return Promise.reject(error);
    },
);

// axiosClient.interceptors.request.use(
//     (config) => {
//         try {
//             const token = authApi.getToken();
//             if (token && token !== 'undefined') {
//                 config.headers['Authorization'] = token;
//             }
//         } catch (error) {
//             console.error('Thiết lập header xác thực không thành công:', error);
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
export default axiosClient;
