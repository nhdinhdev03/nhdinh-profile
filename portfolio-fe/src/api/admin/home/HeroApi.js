import BaseApi from "api/global/baseApi";

class HeroApi extends BaseApi {
  constructor() {
    super("heroes");
  }
}

const heroApi = new HeroApi();
export default heroApi;
