import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class BlogPostApi extends BaseApi {
  constructor() {
    super("blog-posts");
  }

  // Get published blogs
  async getPublished() {
    return axiosClient.get(`${this.uri}/published`);
  }

  // Get blog by slug
  async getBySlug(slug) {
    return axiosClient.get(`${this.uri}/slug/${slug}`);
  }

  // Get blogs with tags
  async getWithTags() {
    return axiosClient.get(`${this.uri}/with-tags`);
  }

  // Update blog with tags
  async updateWithTags(id, blogData, tagIds) {
    return axiosClient.put(`${this.uri}/${id}/with-tags`, {
      ...blogData,
      tagIds
    });
  }

  // Create blog with tags
  async createWithTags(blogData, tagIds) {
    return axiosClient.post(`${this.uri}/with-tags`, {
      ...blogData,
      tagIds
    });
  }

  // Soft delete blog
  async softDelete(id) {
    return axiosClient.patch(`${this.uri}/${id}/soft-delete`);
  }

  // Restore deleted blog
  async restore(id) {
    return axiosClient.patch(`${this.uri}/${id}/restore`);
  }
}

const blogPostApi = new BlogPostApi();
export default blogPostApi;
