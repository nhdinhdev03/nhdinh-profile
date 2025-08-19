import BaseApi from "api/global/baseApi";

class BlogTagApi extends BaseApi {
  constructor() {
    super("blog-tags");
  }

  // Get tags by blog
  async getByBlog(blogId) {
    return this.axiosClient.get(`${this.uri}/blog/${blogId}`);
  }

  // Search tags by name
  async searchByName(name) {
    return this.axiosClient.get(`${this.uri}/search`, { params: { name } });
  }

  // Get popular tags
  async getPopular(limit = 10) {
    return this.axiosClient.get(`${this.uri}/popular`, { params: { limit } });
  }
}

const blogTagApi = new BlogTagApi();
export default blogTagApi;
