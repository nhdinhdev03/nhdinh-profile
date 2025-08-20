import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class ProjectTagMapApi extends BaseApi {
  constructor() {
    super("project-tag-maps");
  }

  // Add tag to project
  async addTagToProject(projectId, tagId, sortOrder = 1) {
    return axiosClient.post(this.uri, {
      projectId,
      tagId,
      sortOrder
    });
  }

  // Remove tag from project
  async removeTagFromProject(projectId, tagId) {
    return axiosClient.delete(`${this.uri}/${projectId}/${tagId}`);
  }

  // Update sort order for project tags
  async updateSortOrder(projectId, tagMappings) {
    return axiosClient.put(`${this.uri}/sort-order`, {
      projectId,
      tagMappings
    });
  }

  // Get tags for project with sort order
  async getProjectTags(projectId) {
    return axiosClient.get(`${this.uri}/project/${projectId}`);
  }
}

const projectTagMapApi = new ProjectTagMapApi();
export default projectTagMapApi;
