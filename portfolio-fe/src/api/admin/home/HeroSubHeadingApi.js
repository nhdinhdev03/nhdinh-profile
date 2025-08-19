import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class HeroSubHeadingApi extends BaseApi {
  constructor() {
    super("hero-sub-headings");
  }

  // Get sub-headings by hero ID
  async getByHeroId(heroId) {
    return axiosClient.get(`${this.uri}/hero/${heroId}`);
  }

  // Update sort order
  async updateSortOrder(subId, sortOrder) {
    return axiosClient.patch(`${this.uri}/${subId}/sort-order`, { sortOrder });
  }
}

const heroSubHeadingApi = new HeroSubHeadingApi();
export default heroSubHeadingApi;
