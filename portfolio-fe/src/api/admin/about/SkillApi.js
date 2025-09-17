import BaseApi from "api/global/baseApi";

class SkillApi extends BaseApi {
  constructor() {
    super("skills");
  }

  // Get skills by category
  async getByCategory(categoryId) {
    return this.axiosClient.get(`${this.uri}/category/${categoryId}`);
  }

  // Get active skills
  async getActive() {
    return this.axiosClient.get(`${this.uri}/active`);
  }

  // Update sort order
  async updateSortOrder(skillId, sortOrder) {
    return this.axiosClient.patch(`${this.uri}/${skillId}/sort-order`, { sortOrder });
  }

  // Toggle active status
  async toggleActive(skillId, isActive) {
    return this.axiosClient.patch(`${this.uri}/${skillId}/toggle-active`, { isActive });
  }

  // Bulk update skills for category
  async bulkUpdateForCategory(categoryId, skills) {
    return this.axiosClient.put(`${this.uri}/category/${categoryId}/bulk`, { skills });
  }
}

const skillApi = new SkillApi();
export default skillApi;
