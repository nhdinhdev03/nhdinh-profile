import BaseApi from "api/global/baseApi";

class ExperienceApi extends BaseApi {
  constructor() {
    super("experiences");
  }

  // Get experiences by profile
  async getByProfile(profileId) {
    return this.axiosClient.get(`${this.uri}/profile/${profileId}`);
  }

  // Get current experiences
  async getCurrent() {
    return this.axiosClient.get(`${this.uri}/current`);
  }

  // Update sort order
  async updateSortOrder(expId, sortOrder) {
    return this.axiosClient.patch(`${this.uri}/${expId}/sort-order`, { sortOrder });
  }

  // Mark as current
  async markAsCurrent(expId) {
    return this.axiosClient.patch(`${this.uri}/${expId}/mark-current`);
  }

  // Mark as ended
  async markAsEnded(expId, endYear) {
    return this.axiosClient.patch(`${this.uri}/${expId}/mark-ended`, { endYear });
  }

  // Bulk update experiences for profile
  async bulkUpdateForProfile(profileId, experiences) {
    return this.axiosClient.put(`${this.uri}/profile/${profileId}/bulk`, { experiences });
  }
}

const experienceApi = new ExperienceApi();
export default experienceApi;
