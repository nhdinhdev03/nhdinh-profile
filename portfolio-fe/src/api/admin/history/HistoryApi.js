import BaseApi from "api/global/baseApi";

class HistoryApi extends BaseApi {
  constructor() {
    super("history");
  }

  // Get activity logs
  async getActivityLogs(page = 1, limit = 20, filters = {}) {
    return this.axiosClient.get(`${this.uri}/activity`, {
      params: { page, limit, ...filters }
    });
  }

  // Get user activity
  async getUserActivity(userId, period = '30d') {
    return this.axiosClient.get(`${this.uri}/user/${userId}`, {
      params: { period }
    });
  }

  // Get system logs
  async getSystemLogs(level = 'all', page = 1, limit = 20) {
    return this.axiosClient.get(`${this.uri}/system`, {
      params: { level, page, limit }
    });
  }

  // Get data changes
  async getDataChanges(entity = 'all', page = 1, limit = 20) {
    return this.axiosClient.get(`${this.uri}/changes`, {
      params: { entity, page, limit }
    });
  }

  // Export history
  async exportHistory(startDate, endDate, format = 'csv') {
    return this.axiosClient.get(`${this.uri}/export`, {
      params: { startDate, endDate, format },
      responseType: 'blob'
    });
  }
}

const historyApi = new HistoryApi();
export default historyApi;
