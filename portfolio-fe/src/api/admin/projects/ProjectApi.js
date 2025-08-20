import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class ProjectApi extends BaseApi {
  constructor() {
    super("projects");
  }

  // Get projects by category
  async getByCategory(categoryId) {
    return axiosClient.get(`${this.uri}/category/${categoryId}`);
  }

  // Get projects with tags
  async getWithTags() {
    return axiosClient.get(`${this.uri}/with-tags`);
  }

  // Update project with tags
  async updateWithTags(id, projectData, tagIds) {
    return axiosClient.put(`${this.uri}/${id}/with-tags`, {
      ...projectData,
      tagIds
    });
  }

  // Create project with tags
  async createWithTags(projectData, tagIds) {
    return axiosClient.post(`${this.uri}/with-tags`, {
      ...projectData,
      tagIds
    });
  }
}

const projectApi = new ProjectApi();
export default projectApi;
