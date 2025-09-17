import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

/**
 * User-facing Hero API service
 * This is separate from admin API to handle user-specific needs
 */
class UserHeroApi extends BaseApi {
  constructor() {
    super("heroes");
  }

  // Get active hero (no locale needed)
  async getActiveHero() {
    try {
      const response = await axiosClient.get(`${this.uri}/active`);
      return response;
    } catch (error) {
      // If 404, return null data instead of throwing
      if (error.response?.status === 404) {
        return { data: null };
      }
      throw error;
    }
  }

  // Get active hero sub-headings
  async getActiveSubHeadings(heroId) {
    try {
      const response = await axiosClient.get(`hero-subheadings/hero/${heroId}`);
      return response;
    } catch (error) {
      // If 404, return empty array instead of throwing
      if (error.response?.status === 404) {
        return { data: [] };
      }
      throw error;
    }
  }
}

const userHeroApi = new UserHeroApi();
export default userHeroApi;
