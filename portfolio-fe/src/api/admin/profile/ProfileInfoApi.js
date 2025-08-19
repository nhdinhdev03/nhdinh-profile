import BaseApi from "api/global/baseApi";

class ProfileInfoApi extends BaseApi {
  constructor() {
    super("profile-info");
  }

  // Get main profile (usually there's only one)
  async getMainProfile() {
    return this.axiosClient.get(`${this.uri}/main`);
  }

  // Update profile with tags and experiences
  async updateWithDetails(id, profileData, tags, experiences) {
    return this.axiosClient.put(`${this.uri}/${id}/with-details`, {
      ...profileData,
      tags,
      experiences
    });
  }

  // Get profile with all related data
  async getWithDetails(id) {
    return this.axiosClient.get(`${this.uri}/${id}/with-details`);
  }
}

const profileInfoApi = new ProfileInfoApi();
export default profileInfoApi;
