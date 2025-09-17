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

  // Search projects
  async search(keyword) {
    return axiosClient.get(`${this.uri}/search`, { params: { keyword } });
  }

  // Get projects by status
  async getByStatus(status) {
    return axiosClient.get(`${this.uri}/status/${status}`);
  }

  // Toggle featured status
  async toggleFeatured(id, isFeatured) {
    return axiosClient.patch(`${this.uri}/${id}/featured`, { isFeatured });
  }

  // Update project status
  async updateStatus(id, status) {
    return axiosClient.patch(`${this.uri}/${id}/status`, { status });
  }

  // Bulk operations
  async bulkUpdateStatus(projectIds, status) {
    return axiosClient.patch(`${this.uri}/bulk/status`, {
      projectIds,
      status
    });
  }

  async bulkDelete(projectIds) {
    return axiosClient.delete(`${this.uri}/bulk`, {
      data: { projectIds }
    });
  }

  // Get project statistics
  async getStatistics() {
    return axiosClient.get(`${this.uri}/statistics`);
  }
}

const projectApi = new ProjectApi();
export default projectApi;
