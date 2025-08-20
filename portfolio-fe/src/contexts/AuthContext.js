import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import adminUserApi from '../api/admin/auth/AdminUserApi';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = adminUserApi.getToken();
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user, token }
          });
          
          // Verify token with server
          try {
            await adminUserApi.getCurrentUser();
          } catch (error) {
            // Token invalid, logout
            logout();
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (identifier, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      console.log('Login attempt with:', { identifier, password: '***' });
      const response = await adminUserApi.login(identifier, password);
      console.log('Login response:', response);
      const { data } = response;
      console.log('Response data:', data);
      
      if (data && data.token) {
        // Save to localStorage
        adminUserApi.setToken(data.token);
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          phoneNumber: data.phoneNumber,
          username: data.username,
          fullName: data.fullName,
          roles: [data.role] // Fix: backend returns 'role' not 'roles'
        }));
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: {
              id: data.id,
              phoneNumber: data.phoneNumber,
              username: data.username,
              fullName: data.fullName,
              roles: [data.role] // Fix: backend returns 'role' not 'roles'
            },
            token: data.token
          }
        });
        
        console.log('Login successful');
        return { success: true, data };
      } else {
        throw new Error('Không nhận được token từ server');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response);
      
      let errorMessage = 'Đăng nhập thất bại';
      
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;
        
        switch (status) {
          case 401:
            errorMessage = serverMessage || 'Tài khoản hoặc mật khẩu không chính xác';
            break;
          case 403:
            errorMessage = serverMessage || 'Tài khoản của bạn chưa được kích hoạt hoặc không có quyền truy cập';
            break;
          case 404:
            errorMessage = serverMessage || 'Tài khoản không tồn tại';
            break;
          case 423:
            errorMessage = serverMessage || 'Tài khoản của bạn đã bị khóa';
            break;
          case 500:
            errorMessage = serverMessage || 'Lỗi máy chủ. Vui lòng thử lại sau';
            break;
          default:
            errorMessage = serverMessage || `Lỗi đăng nhập (${status})`;
        }
      } else if (error.request) {
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet';
      } else {
        errorMessage = error.message || 'Có lỗi xảy ra khi đăng nhập';
      }
      
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await adminUserApi.register(userData);
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Đăng ký thất bại';
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await adminUserApi.logout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      // Always clear local storage and state
      adminUserApi.removeToken();
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
