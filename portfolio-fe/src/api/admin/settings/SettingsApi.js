import BaseApi from "api/global/baseApi";

class SettingsApi extends BaseApi {
  constructor() {
    super("settings");
  }

  // Get all settings
  async getAllSettings() {
    return this.axiosClient.get(`${this.uri}/all`);
  }

  // Get setting by key
  async getByKey(key) {
    return this.axiosClient.get(`${this.uri}/key/${key}`);
  }

  // Update setting
  async updateSetting(key, value) {
    return this.axiosClient.put(`${this.uri}/key/${key}`, { value });
  }

  // Bulk update settings
  async bulkUpdate(settings) {
    return this.axiosClient.put(`${this.uri}/bulk`, { settings });
  }

  // Get theme settings
  async getThemeSettings() {
    return this.axiosClient.get(`${this.uri}/theme`);
  }

  // Update theme settings
  async updateThemeSettings(themeData) {
    return this.axiosClient.put(`${this.uri}/theme`, themeData);
  }

  // Get SEO settings
  async getSeoSettings() {
    return this.axiosClient.get(`${this.uri}/seo`);
  }

  // Update SEO settings
  async updateSeoSettings(seoData) {
    return this.axiosClient.put(`${this.uri}/seo`, seoData);
  }

  // Get social media settings
  async getSocialSettings() {
    return this.axiosClient.get(`${this.uri}/social`);
  }

  // Update social media settings
  async updateSocialSettings(socialData) {
    return this.axiosClient.put(`${this.uri}/social`, socialData);
  }

  // Reset settings to default
  async resetToDefault(category = 'all') {
    return this.axiosClient.post(`${this.uri}/reset`, { category });
  }

  // Backup settings
  async backupSettings() {
    return this.axiosClient.get(`${this.uri}/backup`, {
      responseType: 'blob'
    });
  }

  // Restore settings
  async restoreSettings(backupFile) {
    const formData = new FormData();
    formData.append('backup', backupFile);

    return this.axiosClient.post(`${this.uri}/restore`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

const settingsApi = new SettingsApi();
export default settingsApi;
