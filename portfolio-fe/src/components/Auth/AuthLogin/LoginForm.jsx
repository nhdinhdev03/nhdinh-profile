import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  LogIn,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.scss";
import { ROUTES } from "router/routeConstants";
import { useAuth } from "contexts/AuthContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [fadeIn, setFadeIn] = useState(false);
  
  const navigate = useNavigate();
  const { login, loading, error: authError, clearError } = useAuth();

  useEffect(() => {
    // Animation trigger on mount
    setFadeIn(true);
    // Clear any previous auth errors on mount
    clearError();
  }, [clearError]);

  const fieldErrors = useMemo(() => {
    const e = {};
    if (!username.trim()) e.username = "Bắt buộc";
    if (password.length < 6) e.password = "Ít nhất 6 ký tự";
    return e;
  }, [username, password]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      clearError();
      setTouched({ username: true, password: true });
      
      if (Object.keys(fieldErrors).length) {
        toast.error("Vui lòng nhập đầy đủ thông tin", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      try {
        const result = await login(username, password);
        
        if (result.success) {
          toast.success("Đăng nhập thành côssssssssssssssssng!", {
            position: "top-center",
            autoClose: 2000,
          });
                      navigate(ROUTES.ADMIN.DASHBOARD);
       
        } else {
          toast.error(result.error || "Đăng nhập thất bại. Vui lòng thử lại.", {
            position: "top-center",
            autoClose: 4000,
          });
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.", {
          position: "top-center",
          autoClose: 4000,
        });
      }
    },
    [fieldErrors, login, username, password, navigate, clearError]
  );

  const togglePw = useCallback(() => setShowPassword((s) => !s), []);
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const particles = useMemo(
    () => Array.from({ length: 15 }, (_, i) => i + 1),
    []
  );

  return (
    <div className="login-screen">
      {/* Animated Particles */}
      <div className="particles" aria-hidden="true">
        {particles.map((i) => (
          <span key={i} className={`particle p${i}`} />
        ))}
      </div>

      {/* Decorative Layers */}
      <div className="bg-layer gradient-mesh" aria-hidden="true" />
      <div className="bg-layer vignette" aria-hidden="true" />
      <div className="bg-layer noise" aria-hidden="true" />

      {/* Floating Elements */}
      <div className="floating-elements" aria-hidden="true">
        <motion.div
          className="floating-card card-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div
          className="floating-card card-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.div
          className="floating-card card-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </div>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="back-btn"
          title="Về trang chủ"
          aria-label="Về trang chủ"
        >
          <ArrowLeft size={20} />
        </Link>
      </motion.div>

      <ToastContainer />

      <motion.div
        className="auth-wrapper"
        role="main"
        aria-labelledby="auth-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="panel" data-elevated>
          <div className="glass-effect"></div>

          <motion.header
            className="panel-head"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="logo-container">
              <div className="logo-badge">
                <motion.div
                  className="avatar-gradient"
                  aria-hidden="true"
                  initial={{ scale: 0.8, rotateY: -30 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                >
                  <Shield size={32} className="icon-shield" />
                  <div className="icon-glow"></div>
                </motion.div>
              </div>
            </div>
            <motion.h1
              id="auth-title"
              className="panel-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Admin Dashboard
            </motion.h1>
            <motion.p
              className="panel-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Đăng nhập để quản lý portfolio chuyên nghiệp
            </motion.p>
          </motion.header>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={authError ? "form-error" : undefined}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key="username-field"
                className={`field ${
                  touched.username && fieldErrors.username ? "has-error" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label htmlFor="username" className="field-label">
                  <span className="label-text">Tài khoản</span>
                  <span className="required-mark">*</span>
                </label>
                <div className="input-wrap">
                  <User size={18} className="i" aria-hidden="true" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Email hoặc tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={onBlur}
                    aria-invalid={touched.username && !!fieldErrors.username}
                    aria-describedby={
                      touched.username && fieldErrors.username
                        ? "err-username"
                        : undefined
                    }
                    disabled={loading}
                    className="modern-input"
                  />
                  {username && (
                    <motion.span
                      className="input-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </div>
                {touched.username && fieldErrors.username && (
                  <motion.p
                    id="err-username"
                    className="field-error"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {fieldErrors.username}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                key="password-field"
                className={`field ${
                  touched.password && fieldErrors.password ? "has-error" : ""
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label htmlFor="password" className="field-label">
                  <span className="label-text">Mật khẩu</span>
                  <span className="required-mark">*</span>
                </label>
                <div className="input-wrap">
                  <Lock size={18} className="i" aria-hidden="true" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={onBlur}
                    aria-invalid={touched.password && !!fieldErrors.password}
                    aria-describedby={
                      touched.password && fieldErrors.password
                        ? "err-password"
                        : undefined
                    }
                    disabled={loading}
                    className="modern-input"
                  />
                  <motion.button
                    type="button"
                    className="toggle-pw"
                    onClick={togglePw}
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon-wrapper">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </span>
                  </motion.button>
                </div>
                {touched.password && fieldErrors.password && (
                  <motion.p
                    id="err-password"
                    className="field-error"
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {fieldErrors.password}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            {authError && (
              <motion.div
                id="form-error"
                className="form-error-banner"
                role="alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {authError}
              </motion.div>
            )}

            <motion.div
              className="login-options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              <a href="/forgot-password" className="forgot-password">
                Quên mật khẩu?
              </a>
            </motion.div>

            <motion.button
              type="submit"
              className="btn-submit"
              disabled={loading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="loading">
                  <span className="spinner" aria-hidden="true" />
                  <span>Đang xác thực...</span>
                </span>
              ) : (
                <span className="login-text">
                  <LogIn size={18} />
                  <span>Đăng nhập</span>
                </span>
              )}
            </motion.button>
          </form>

          <motion.div
            className="additional-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <p className="security-text">
              <Shield size={14} />
              <span>Bảo mật tiêu chuẩn SSL 256-bit</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;
