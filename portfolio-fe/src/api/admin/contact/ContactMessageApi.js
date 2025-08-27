import BaseApi from "api/global/baseApi";

class ContactMessageApi extends BaseApi {
  constructor() {
    super("contact-messages"); // Thay đổi để phù hợp với backend endpoint
  }

  // Override getAll method to use /all endpoint
  async getAll() {
    return this.axiosClient.get(`${this.uri}/all`);
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
  async markAsReplied(messageId) {
    return this.axiosClient.put(`${this.uri}/${messageId}/mark-replied`);
  }

  // Mark message as unreplied
  async markAsUnreplied(messageId) {
    return this.axiosClient.put(`${this.uri}/${messageId}/mark-unreplied`);
  }

  // Get messages by date range
  async getByDateRange(startDate, endDate) {
    return this.axiosClient.get(`${this.uri}/date-range`, {
      params: { startDate, endDate }
    });
  }

  // Reply to contact message
  async replyToContact(messageId, replyMessage) {
    return this.axiosClient.post(`${this.uri}/${messageId}/reply`, { message: replyMessage });
  }

  // Override delete method to use correct messageId
  async delete(messageId) {
    return this.axiosClient.delete(`${this.uri}/${messageId}`);
  }
}

const contactMessageApi = new ContactMessageApi();
export default contactMessageApi;
