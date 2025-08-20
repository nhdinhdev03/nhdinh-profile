import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class HeroApi extends BaseApi {
  constructor() {
    super("heroes");
  }

  // Get active hero (single hero)
  async getActiveHero() {
    return axiosClient.get(`${this.uri}/active`);
  }

  // Restore deleted hero
  async restore(heroId) {
    return axiosClient.post(`${this.uri}/${heroId}/restore`);
  }

  // Get all active heroes (not deleted)
  async getAllActive() {
    return axiosClient.get(`${this.uri}/all`);
  }

  // Get all deleted heroes
  async getAllDeleted() {
    return axiosClient.get(`${this.uri}/deleted`);
  }

  // Get all heroes including deleted ones
  async getAllIncludeDeleted() {
    return axiosClient.get(`${this.uri}/all-include-deleted`);
  }

  // Get hero statistics
  async getStats() {
    return axiosClient.get(`${this.uri}/stats`);
  }

  // Override create to match backend request format (no locale)
  async create(data) {
    const payload = {
      preHeading: data.preHeading || '',
      heading: data.heading || '',
      introHtml: data.introHtml || ''
    };
    return axiosClient.post(this.uri, payload);
  }

  // Override update to match backend request format (no locale)
  async update(id, data) {
    const payload = {
      preHeading: data.preHeading || '',
      heading: data.heading || '',
      introHtml: data.introHtml || ''
    };
    return axiosClient.put(`${this.uri}/${id}`, payload);
  }
}

const heroApi = new HeroApi();
export default heroApi;
