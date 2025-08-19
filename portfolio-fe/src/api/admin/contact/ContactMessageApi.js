import BaseApi from "api/global/baseApi";

class ContactMessageApi extends BaseApi {
  constructor() {
    super("contact-messages");
  }

  // Get unreplied messages
  async getUnreplied() {
    return this.axiosClient.get(`${this.uri}/unreplied`);
  }

  // Get replied messages
  async getReplied() {
    return this.axiosClient.get(`${this.uri}/replied`);
  }

  // Mark message as replied
  async markAsReplied(id) {
    return this.axiosClient.patch(`${this.uri}/${id}/mark-replied`);
  }

  // Mark message as unreplied
  async markAsUnreplied(id) {
    return this.axiosClient.patch(`${this.uri}/${id}/mark-unreplied`);
  }

  // Get messages by date range
  async getByDateRange(startDate, endDate) {
    return this.axiosClient.get(`${this.uri}/date-range`, {
      params: { startDate, endDate }
    });
  }
}

const contactMessageApi = new ContactMessageApi();
export default contactMessageApi;
