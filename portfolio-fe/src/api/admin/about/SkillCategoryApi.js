import BaseApi from "api/global/baseApi";

class SkillCategoryApi extends BaseApi {
  constructor() {
    super("skill-categories");
  }

  // Get active categories
  async getActive() {
    return this.axiosClient.get(`${this.uri}/active`);
  }

  // Get categories with skills
  async getWithSkills() {
    return this.axiosClient.get(`${this.uri}/with-skills`);
  }

  // Update sort order
  async updateSortOrder(categoryId, sortOrder) {
    return this.axiosClient.patch(`${this.uri}/${categoryId}/sort-order`, { sortOrder });
  }

  // Toggle active status
  async toggleActive(categoryId, isActive) {
    return this.axiosClient.patch(`${this.uri}/${categoryId}/toggle-active`, { isActive });
  }
}

const skillCategoryApi = new SkillCategoryApi();
export default skillCategoryApi;
