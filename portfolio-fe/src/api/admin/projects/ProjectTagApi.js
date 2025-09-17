import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class ProjectTagApi extends BaseApi {
  constructor() {
    super("project-tags");
  }

  // Get tags by project
  async getByProject(projectId) {
    return axiosClient.get(`${this.uri}/project/${projectId}`);
  }

  // Search tags by name
  async searchByName(name) {
    return axiosClient.get(`${this.uri}/search`, { params: { name } });
  }
}

const projectTagApi = new ProjectTagApi();
export default projectTagApi;
