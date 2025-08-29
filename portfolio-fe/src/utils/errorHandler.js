export const getErrorMessage = (error) => {
  if (!error) return "⚠️ Có lỗi xảy ra. Vui lòng thử lại.";
  
  const errorStr = error.toString().toLowerCase();
  
  // Authentication errors
  if (errorStr.includes('401') || errorStr.includes('unauthorized') || errorStr.includes('invalid credentials')) {
    return "🔑 Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại tài khoản và mật khẩu.";
  }
  
  // Permission errors
  if (errorStr.includes('403') || errorStr.includes('forbidden')) {
    return "🚫 Tài khoản của bạn chưa được kích hoạt hoặc không có quyền truy cập.";
  }
  
  // Not found errors
  if (errorStr.includes('404') || errorStr.includes('not found')) {
    return "❓ Không tìm thấy tài nguyên yêu cầu. Vui lòng kiểm tra lại.";
  }
  
  // Account locked errors
  if (errorStr.includes('423') || errorStr.includes('locked')) {
    return "🔒 Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.";
  }
  
  // Server errors
  if (errorStr.includes('500') || errorStr.includes('internal server error')) {
    return "⚠️ Lỗi máy chủ. Vui lòng thử lại sau.";
  }
  
  // Service unavailable
  if (errorStr.includes('503') || errorStr.includes('service unavailable')) {
    return "🔧 Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.";
  }
  
  // Network errors
  if (errorStr.includes('network error') || errorStr.includes('timeout') || errorStr.includes('connection')) {
    return "🌐 Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet.";
  }
  
  // Validation errors
  if (errorStr.includes('validation') || errorStr.includes('invalid')) {
    return "📝 Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.";
  }
  
  // Rate limiting
  if (errorStr.includes('rate limit') || errorStr.includes('too many requests')) {
    return "⏰ Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng đợi một chút.";
  }
  
  // Generic error with emoji prefix if not already present
  return error.match(/^[🔑🚫❓🔒⚠️🔧🌐📝⏰❌]/) ? error : `⚠️ ${error}`;
};


export const getLoginErrorMessage = (error) => {
  const errorStr = error.toString().toLowerCase();
  
  if (errorStr.includes('invalid credentials') || errorStr.includes('wrong password') || errorStr.includes('incorrect')) {
    return "❌ Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.";
  }
  
  if (errorStr.includes('account not found') || errorStr.includes('user not found')) {
    return "👤 Tài khoản không tồn tại. Vui lòng kiểm tra lại.";
  }
  
  if (errorStr.includes('account disabled') || errorStr.includes('account suspended')) {
    return "🚫 Tài khoản đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên.";
  }
  
  if (errorStr.includes('email not verified') || errorStr.includes('account not activated')) {
    return "📧 Tài khoản chưa được xác thực. Vui lòng kiểm tra email.";
  }
  
  return getErrorMessage(error);
};


export const getNetworkErrorMessage = (error) => {
  if (!error) return "🌐 Lỗi kết nối mạng.";
  
  if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
    return "🌐 Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet.";
  }
  
  if (error.code === 'TIMEOUT_ERROR' || error.message?.includes('timeout')) {
    return "⏰ Kết nối bị timeout. Vui lòng thử lại.";
  }
  
  if (error.code === 'ECONNREFUSED') {
    return "🔌 Không thể kết nối đến máy chủ. Máy chủ có thể đang bảo trì.";
  }
  
  return getErrorMessage(error.message || error);
};


export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: "🔑 Thông tin đăng nhập không chính xác.",
  SESSION_EXPIRED: "⏰ Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  ACCESS_DENIED: "🚫 Bạn không có quyền truy cập vào tài nguyên này.",
  
  // Network
  NETWORK_ERROR: "🌐 Lỗi kết nối mạng. Vui lòng kiểm tra internet.",
  SERVER_ERROR: "⚠️ Lỗi máy chủ. Vui lòng thử lại sau.",
  
  // Validation
  REQUIRED_FIELD: "📝 Trường này là bắt buộc.",
  INVALID_EMAIL: "📧 Email không hợp lệ.",
  INVALID_PHONE: "📱 Số điện thoại không hợp lệ.",
  PASSWORD_TOO_SHORT: "🔒 Mật khẩu phải có ít nhất 6 ký tự.",
  
  // Generic
  UNKNOWN_ERROR: "❓ Có lỗi không xác định xảy ra.",
  TRY_AGAIN: "🔄 Vui lòng thử lại sau.",
  CONTACT_SUPPORT: "📞 Vui lòng liên hệ hỗ trợ nếu vấn đề tiếp tục xảy ra."
};


export const combineErrorMessages = (errors) => {
  if (!errors || errors.length === 0) return ERROR_MESSAGES.UNKNOWN_ERROR;
  if (errors.length === 1) return getErrorMessage(errors[0]);
  
  return errors.map((error, index) => `${index + 1}. ${getErrorMessage(error)}`).join('\n');
};
