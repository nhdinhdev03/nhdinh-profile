import BaseApi from "api/global/baseApi";

class AdminUserApi extends BaseApi {
  constructor() {
    super("admin-users");
  }

  // Login
  async login(phoneNumber, password) {
    return this.axiosClient.post(`${this.uri}/login`, {
      phoneNumber,
      password
    });
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    return this.axiosClient.patch(`${this.uri}/${userId}/change-password`, {
      currentPassword,
      newPassword
    });
  }

  // Get current user info
  async getCurrentUser() {
    return this.axiosClient.get(`${this.uri}/me`);
  }

  // Update profile
  async updateProfile(userId, profileData) {
    return this.axiosClient.patch(`${this.uri}/${userId}/profile`, profileData);
  }

  // Activate/Deactivate user
  async toggleActive(userId, isActive) {
    return this.axiosClient.patch(`${this.uri}/${userId}/toggle-active`, { isActive });
  }

  // Check if phone number exists
  async checkPhoneExists(phoneNumber) {
    return this.axiosClient.get(`${this.uri}/check-phone`, {
      params: { phoneNumber }
    });
  }

  // Check if username exists
  async checkUsernameExists(username) {
    return this.axiosClient.get(`${this.uri}/check-username`, {
      params: { username }
    });
  }
}

const adminUserApi = new AdminUserApi();
export default adminUserApi;
