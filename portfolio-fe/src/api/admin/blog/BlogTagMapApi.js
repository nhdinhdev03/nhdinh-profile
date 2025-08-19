import BaseApi from "api/global/baseApi";

class BlogTagMapApi extends BaseApi {
  constructor() {
    super("blog-tag-maps");
  }

  // Add tag to blog
  async addTagToBlog(blogId, tagId) {
    return this.axiosClient.post(this.uri, {
      blogId,
      tagId
    });
  }

  // Remove tag from blog
  async removeTagFromBlog(blogId, tagId) {
    return this.axiosClient.delete(`${this.uri}/${blogId}/${tagId}`);
  }

  // Get tags for blog
  async getBlogTags(blogId) {
    return this.axiosClient.get(`${this.uri}/blog/${blogId}`);
  }

  // Update blog tags (replace all)
  async updateBlogTags(blogId, tagIds) {
    return this.axiosClient.put(`${this.uri}/blog/${blogId}`, { tagIds });
  }
}

const blogTagMapApi = new BlogTagMapApi();
export default blogTagMapApi;
