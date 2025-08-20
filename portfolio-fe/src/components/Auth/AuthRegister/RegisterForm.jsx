import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, Lock, UserPlus } from 'lucide-react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    username: '',
    password: '',
    fullName: ''
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({
      ...prev,
      [e.target.name]: true
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Tên đăng nhập là bắt buộc';
    } else if (formData.username.length < 3) {
      errors.username = 'Tên đăng nhập ít nhất 3 ký tự';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu ít nhất 6 ký tự';
    }
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Họ tên là bắt buộc';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      phoneNumber: true,
      username: true,
      password: true,
      fullName: true
    });

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error('Vui lòng kiểm tra thông tin nhập vào');
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        toast.success('Đăng ký thành công!');
        setFormData({
          phoneNumber: '',
          username: '',
          password: '',
          fullName: ''
        });
        setTouched({});
      } else {
        toast.error(result.error || 'Đăng ký thất bại');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng ký');
    }
  };

  const fieldErrors = validateForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-6">
      <ToastContainer />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UserPlus size={24} className="text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Đăng ký Admin</h2>
            <p className="text-gray-300">Tạo tài khoản quản trị mới</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Số điện thoại *
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="0987654321"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {touched.phoneNumber && fieldErrors.phoneNumber && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.phoneNumber}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên đăng nhập *
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="superadmin"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {touched.username && fieldErrors.username && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.username}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Họ tên *
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Super Administrator"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {touched.fullName && fieldErrors.fullName && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mật khẩu *
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="admin123"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {touched.password && fieldErrors.password && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang đăng ký...
                </div>
              ) : (
                'Đăng ký'
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Đã có tài khoản?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
