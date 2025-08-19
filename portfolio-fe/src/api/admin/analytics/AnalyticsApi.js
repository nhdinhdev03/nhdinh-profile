import BaseApi from "api/global/baseApi";

class AnalyticsApi extends BaseApi {
  constructor() {
    super("analytics");
  }

  // Get dashboard stats
  async getDashboardStats() {
    return this.axiosClient.get(`${this.uri}/dashboard`);
  }

  // Get visitor stats
  async getVisitorStats(period = '7d') {
    return this.axiosClient.get(`${this.uri}/visitors`, { params: { period } });
  }

  // Get popular content
  async getPopularContent(type = 'all', limit = 10) {
    return this.axiosClient.get(`${this.uri}/popular`, { params: { type, limit } });
  }

  // Get contact form stats
  async getContactStats(period = '30d') {
    return this.axiosClient.get(`${this.uri}/contact`, { params: { period } });
  }

  // Get blog stats
  async getBlogStats(period = '30d') {
    return this.axiosClient.get(`${this.uri}/blog`, { params: { period } });
  }

  // Get project views
  async getProjectViews(period = '30d') {
    return this.axiosClient.get(`${this.uri}/projects`, { params: { period } });
  }
}

const analyticsApi = new AnalyticsApi();
export default analyticsApi;
