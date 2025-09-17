import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class ProjectCategoryApi extends BaseApi {
  constructor() {
    super("project-categories");
  }

  // Get all categories
  async getAll() {
    return axiosClient.get(`${this.uri}/all`);
  }

  // Get active categories
  async getActive() {
    return axiosClient.get(`${this.uri}/active`);
  }

  // Create new category
  async create(data) {
    return axiosClient.post(this.uri, data);
  }

  // Update category
  async update(id, data) {
    return axiosClient.put(`${this.uri}/${id}`, data);
  }

  // Delete category
  async delete(id) {
    return axiosClient.delete(`${this.uri}/${id}`);
  }

  // Get category by ID
  async getById(id) {
    return axiosClient.get(`${this.uri}/${id}`);
  }

  // Search categories
  async search(query) {
    return axiosClient.get(`${this.uri}/search`, {
      params: { q: query }
    });
  }
}

const projectCategoryApi = new ProjectCategoryApi();
export default projectCategoryApi;
