import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class ProjectCategoryApi extends BaseApi {
  constructor() {
    super("project-categories");
  }

  // Get active categories
  async getActive() {
    return axiosClient.get(`${this.uri}/active`);
  }
}

const projectCategoryApi = new ProjectCategoryApi();
export default projectCategoryApi;
