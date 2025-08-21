import axiosClient from "api/global/axiosClient";

/**
 * Contact Message API - Tối ưu hóa với error handling chuyên nghiệp
 */
class UserContactMessageApi {
  constructor() {
    this.uri = "contact-messages";
  }

  /**
   * Submit new contact message với error handling tốt hơn
   */
  async submit(contactData) {
    try {
      // Validate data trước khi gửi
      this.validateContactData(contactData);
      
      const response = await axiosClient.post(`${this.uri}/submit`, {
        name: contactData.name?.trim(),
        email: contactData.email?.trim().toLowerCase(),
        subject: contactData.subject?.trim() || null,
        message: contactData.message?.trim()
      });
      
      return response.data;
    } catch (error) {
      // Enhanced error handling với thông báo tiếng Việt chi tiết
      this.handleApiError(error, 'submit');
      throw error;
    }
  }

  /**
   * Validate contact data trước khi gửi
   */
  validateContactData(data) {
    const errors = [];

    if (!data.name?.trim()) {
      errors.push("Họ tên là bắt buộc");
    } else if (data.name.trim().length < 2) {
      errors.push("Họ tên phải có ít nhất 2 ký tự");
    } else if (data.name.trim().length > 100) {
      errors.push("Họ tên không được quá 100 ký tự");
    }

    if (!data.email?.trim()) {
      errors.push("Email là bắt buộc");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.push("Email không hợp lệ");
    } else if (data.email.length > 256) {
      errors.push("Email không được quá 256 ký tự");
    }

    if (data.subject && data.subject.length > 200) {
      errors.push("Tiêu đề không được quá 200 ký tự");
    }

    if (!data.message?.trim()) {
      errors.push("Nội dung tin nhắn là bắt buộc");
    } else if (data.message.trim().length < 10) {
      errors.push("Tin nhắn phải có ít nhất 10 ký tự");
    } else if (data.message.trim().length > 2000) {
      errors.push("Tin nhắn không được quá 2000 ký tự");
    }

    if (errors.length > 0) {
      const error = new Error(errors.join(", "));
      error.isValidationError = true;
      throw error;
    }
  }

  /**
   * Enhanced error handling
   */
  handleApiError(error, operation) {
    if (error.isValidationError) {
      console.warn(`Validation error in ${operation}:`, error.message);
      return;
    }

    if (error.response) {
      const { status, data } = error.response;
      const serverMessage = data?.message || data?.error;

      console.error(`API Error [${status}] in ${operation}:`, {
        status,
        message: serverMessage,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase()
      });

      // Log specific error types for monitoring
      switch (status) {
        case 429:
          console.warn(`Rate limit hit for ${operation} - User sending too frequently`);
          break;
        case 400:
          if (serverMessage?.includes("15 phút") || serverMessage?.includes("phút nữa")) {
            console.warn(`Rate limit error: ${serverMessage}`);
          } else if (serverMessage?.includes("trùng lặp")) {
            console.warn(`Duplicate content detected: ${serverMessage}`);
          } else {
            console.error(`Bad request in ${operation}: ${serverMessage}`);
          }
          break;
        case 500:
          console.error(`Server error in ${operation}:`, serverMessage);
          break;
        default:
          console.error(`Unexpected error in ${operation}:`, serverMessage);
      }
    } else if (error.request) {
      console.error(`Network error in ${operation}:`, {
        message: "Không thể kết nối đến máy chủ",
        status: "NETWORK_ERROR",
        timeout: error.code === 'ECONNABORTED'
      });
    } else {
      console.error(`Unexpected error in ${operation}:`, error.message);
    }
  }

  /**
   * Get contact statistics (if needed for admin)
   */
  async getStatistics() {
    try {
      const response = await axiosClient.get(`${this.uri}/stats`);
      return response.data;
    } catch (error) {
      this.handleApiError(error, 'getStatistics');
      throw error;
    }
  }
}

const userContactMessageApi = new UserContactMessageApi();
export default userContactMessageApi;
