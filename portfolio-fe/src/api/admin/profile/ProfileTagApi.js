import BaseApi from "api/global/baseApi";

class ProfileTagApi extends BaseApi {
  constructor() {
    super("profile-tags");
  }

  // Get tags by profile
  async getByProfile(profileId) {
    return this.axiosClient.get(`${this.uri}/profile/${profileId}`);
  }

  // Update sort order
  async updateSortOrder(tagId, sortOrder) {
    return this.axiosClient.patch(`${this.uri}/${tagId}/sort-order`, { sortOrder });
  }

  // Bulk update tags for profile
  async bulkUpdateForProfile(profileId, tags) {
    return this.axiosClient.put(`${this.uri}/profile/${profileId}/bulk`, { tags });
  }
}

const profileTagApi = new ProfileTagApi();
export default profileTagApi;
