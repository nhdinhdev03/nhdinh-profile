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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./LoginForm.scss";
import { ROUTES } from "router/routeConstants";
import { useAuth } from "contexts/AuthContext";
import { useNotificationContext } from "components/Notification";
import { getLoginErrorMessage, getErrorMessage } from "utils/errorHandler";
import { validateLoginForm } from "utils/formValidation";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [fadeIn, setFadeIn] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [displayError, setDisplayError] = useState(""); // State riêng để hiển thị lỗi
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    loading,
    error: authError,
    clearError,
    isAuthenticated,
  } = useAuth();
  const notification = useNotificationContext();

  const from = location.state?.from?.pathname || ROUTES.ADMIN.DASHBOARD;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ADMIN.DASHBOARD, { replace: true });
      return;
    }
    setFadeIn(true);
    clearError();
  }, [clearError, isAuthenticated, navigate]);

  const fieldErrors = useMemo(() => {
    return validateLoginForm(username, password);
  }, [username, password]);

  useEffect(() => {
    if ((authError || displayError) && (username || password)) {
      clearError();
      setDisplayError("");
      setShowErrorAlert(false);
    }
  }, [username, password, authError, displayError, clearError]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      clearError();
      setDisplayError("");
      setTouched({ username: true, password: true });

      if (Object.keys(fieldErrors).length) {
        const errorMsg = "⚠️ Vui lòng nhập đầy đủ thông tin";
        setDisplayError(errorMsg);
        notification.error(errorMsg, 3000);
        return;
      }

      try {
        const result = await login(username, password);

        if (result.success) {
          setDisplayError("");
          notification.success("✅ Đăng nhập thành công!", 2000);
          navigate(from, { replace: true });
        } else {
          const rawError =
            result.error ||
            "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.";
          const friendlyError = getLoginErrorMessage(rawError);

          setDisplayError(friendlyError);
          setShowErrorAlert(true);
          notification.error(friendlyError, 6000);

          setShakeError(true);
          setTimeout(() => setShakeError(false), 600);

          setTimeout(() => setShowErrorAlert(false), 8000);

          if (
            rawError.toLowerCase().includes("mật khẩu") ||
            rawError.toLowerCase().includes("password") ||
            rawError.toLowerCase().includes("invalid credentials") ||
            rawError.toLowerCase().includes("sai") ||
            rawError.toLowerCase().includes("unauthorized") ||
            rawError.toLowerCase().includes("401")
          ) {
            setTimeout(() => {
              const passwordField = document.getElementById("password");
              if (passwordField) {
                passwordField.focus();
                passwordField.select();
              }
            }, 100);
          }
        }
      } catch (error) {
        const rawError =
          error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.";
        const friendlyError = getErrorMessage(rawError);

        setDisplayError(friendlyError);
        setShowErrorAlert(true);
        notification.error(friendlyError, 6000);

        // Trigger shake animation
        setShakeError(true);
        setTimeout(() => setShakeError(false), 600);

        // Auto hide error alert sau 8 giây
        setTimeout(() => setShowErrorAlert(false), 8000);
      }
    },
    [
      fieldErrors,
      login,
      username,
      password,
      navigate,
      clearError,
      from,
      notification,
    ]
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

      {/* Error Alert Popup - hiển thị phía trên form */}
      <AnimatePresence>
        {showErrorAlert && (
          <motion.div
            className="error-alert-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowErrorAlert(false)}
          >
            <motion.div
              className="error-alert-popup"
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="error-alert-header">
                <div className="error-alert-icon">🚨</div>
                <h3>Lỗi Đăng Nhập</h3>
                <button
                  className="error-alert-close"
                  onClick={() => setShowErrorAlert(false)}
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
              <div className="error-alert-body">
                <p>{displayError}</p>
              </div>
              <div className="error-alert-footer">
                <button
                  className="error-alert-button"
                  onClick={() => {
                    setShowErrorAlert(false);
                    const usernameField = document.getElementById("username");
                    if (usernameField) usernameField.focus();
                  }}
                >
                  Thử Lại
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`auth-wrapper ${shakeError ? "shake-error" : ""}`}
        role="main"
        aria-labelledby="auth-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: fadeIn ? 1 : 0,
          y: fadeIn ? 0 : 20,
          x: shakeError ? [0, -10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: shakeError ? "easeInOut" : "easeOut",
        }}
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
            aria-describedby={
              authError || displayError ? "form-error" : undefined
            }
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

            {(authError || displayError) && (
              <motion.div
                id="form-error"
                className="form-error-banner"
                role="alert"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="error-content">
                  <div className="error-icon">🚨</div>
                  <div className="error-text">
                    {displayError || getErrorMessage(authError)}
                  </div>
                </div>
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
