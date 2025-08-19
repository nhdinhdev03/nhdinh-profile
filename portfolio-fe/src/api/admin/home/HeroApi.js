import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class HeroApi extends BaseApi {
  constructor() {
    super("heroes");
  }

  // Get hero by locale
  async getByLocale(locale) {
    return axiosClient.get(`${this.uri}/locale/${locale}`);
  }

  // Check if locale exists
  async checkLocaleExists(locale) {
    try {
      const response = await this.getByLocale(locale);
      return response.data ? true : false;
    } catch (error) {
      // If 404, locale doesn't exist
      if (error.response?.status === 404) {
        return false;
      }
      // For other errors, assume it exists to be safe
      return true;
    }
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

  // Override create to match backend request format
  async create(data) {
    const payload = {
      locale: data.locale || 'vi',
      preHeading: data.preHeading || '',
      heading: data.heading || '',
      introHtml: data.introHtml || ''
    };
    return axiosClient.post(this.uri, payload);
  }

  // Override update to match backend request format
  async update(id, data) {
    const payload = {
      locale: data.locale || 'vi',
      preHeading: data.preHeading || '',
      heading: data.heading || '',
      introHtml: data.introHtml || ''
    };
    return axiosClient.put(`${this.uri}/${id}`, payload);
  }
}

const heroApi = new HeroApi();
export default heroApi;
