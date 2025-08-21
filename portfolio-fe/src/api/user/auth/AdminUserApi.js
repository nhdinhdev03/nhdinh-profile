import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class AdminUserApi extends BaseApi {
  constructor() {
    super("auth");
  }

  // Register
  async register(userData) {
    return axiosClient.post(`${this.uri}/register`, userData);
  }

  // Login - sử dụng identifier thay vì phoneNumber để hỗ trợ cả phone và username
  async login(identifier, password) {
    const url = `${this.uri}/login`;
    // console.log('AdminUserApi login URL:', url);
    // console.log('Full URL will be:', axiosClient.defaults.baseURL + url);
    
    const response = await axiosClient.post(url, {
      identifier,
      password
    });
    
    // console.log('Raw response from axios:', response);
    // console.log('Response data:', response.data);
    
    return response;
  }

  // Logout
  async logout() {
    return axiosClient.post(`${this.uri}/logout`);
  }

  // Get current user info
  async getCurrentUser() {
    return axiosClient.get(`${this.uri}/me`);
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    return axiosClient.patch(`admin-users/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  // Update profile
  async updateProfile(userId, profileData) {
    return axiosClient.patch(`admin-users/${userId}/profile`, profileData);
  }

  // Activate/Deactivate user
  async toggleActive(userId, isActive) {
    return axiosClient.patch(`admin-users/${userId}/toggle-active`, { isActive });
  }

  // Check if phone number exists
  async checkPhoneExists(phoneNumber) {
    return axiosClient.get(`admin-users/check-phone`, {
      params: { phoneNumber }
    });
  }

  // Check if username exists
  async checkUsernameExists(username) {
    return axiosClient.get(`admin-users/check-username`, {
      params: { username }
    });
  }

  // Token management
  setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
    delete axiosClient.defaults.headers.common['Authorization'];
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    return token && token !== 'undefined' && token !== 'null';
  }
}

const adminUserApi = new AdminUserApi();
export default adminUserApi;
