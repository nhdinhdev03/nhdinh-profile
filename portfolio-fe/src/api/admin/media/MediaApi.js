import BaseApi from "api/global/baseApi";

class MediaApi extends BaseApi {
  constructor() {
    super("media");
  }

  // Upload single file
  async uploadFile(file, folder = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) {
      formData.append('folder', folder);
    }

    return this.axiosClient.post(`${this.uri}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Upload multiple files
  async uploadFiles(files, folder = '') {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    if (folder) {
      formData.append('folder', folder);
    }

    return this.axiosClient.post(`${this.uri}/upload-multiple`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Get media by folder
  async getByFolder(folder) {
    return this.axiosClient.get(`${this.uri}/folder/${folder}`);
  }

  // Delete file
  async deleteFile(fileName) {
    return this.axiosClient.delete(`${this.uri}/file/${fileName}`);
  }

  // Get file info
  async getFileInfo(fileName) {
    return this.axiosClient.get(`${this.uri}/info/${fileName}`);
  }
}

const mediaApi = new MediaApi();
export default mediaApi;
