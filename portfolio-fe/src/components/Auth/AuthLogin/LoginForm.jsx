import React, { useState, useCallback, useMemo } from "react";
import { User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./LoginForm.scss";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});

  const fieldErrors = useMemo(() => {
    const e = {};
    if (!username.trim()) e.username = "Bắt buộc";
    if (password.length < 6) e.password = "Ít nhất 6 ký tự";
    return e;
  }, [username, password]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");
    setTouched({ username: true, password: true });
    if (Object.keys(fieldErrors).length) {
      setError("Vui lòng kiểm tra các trường bắt buộc.");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: Gọi API đăng nhập
      await new Promise((r) => setTimeout(r, 1000));
      // success flow placeholder
    } catch (_) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, [fieldErrors]);

  const togglePw = useCallback(() => setShowPassword((s) => !s), []);
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  return (
    <div className="login-screen">
      {/* Decorative Layers */}
      <div className="bg-layer gradient-mesh" aria-hidden="true" />
      <div className="bg-layer vignette" aria-hidden="true" />
      <div className="bg-layer noise" aria-hidden="true" />
      <div className="bg-orbs" aria-hidden="true">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
      </div>

      <Link
        to="/"
        className="back-btn"
        title="Về trang chủ"
        aria-label="Về trang chủ"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="auth-wrapper" role="main" aria-labelledby="auth-title">
        <div className="panel" data-elevated>
          <header className="panel-head">
            <div className="avatar-gradient" aria-hidden="true">
              <Lock size={30} />
            </div>
            <h1 id="auth-title" className="panel-title">Admin Panel</h1>
            <p className="panel-sub">Đăng nhập để quản lý profile</p>
          </header>
          <form className="auth-form" onSubmit={handleSubmit} noValidate aria-describedby={error ? "form-error" : undefined}>
            <div className={`field ${touched.username && fieldErrors.username ? "has-error" : ""}`}>
              <label htmlFor="username" className="field-label">Tài khoản <span>*</span></label>
              <div className="input-wrap">
                <User size={18} className="i" aria-hidden="true" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Email hoặc username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={onBlur}
                  aria-invalid={touched.username && !!fieldErrors.username}
                  aria-describedby={touched.username && fieldErrors.username ? "err-username" : undefined}
                  disabled={isLoading}
                />
              </div>
              {touched.username && fieldErrors.username && <p id="err-username" className="field-error" role="alert">{fieldErrors.username}</p>}
            </div>

            <div className={`field ${touched.password && fieldErrors.password ? "has-error" : ""}`}>
              <label htmlFor="password" className="field-label">Mật khẩu <span>*</span></label>
              <div className="input-wrap">
                <Lock size={18} className="i" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Mật khẩu admin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={onBlur}
                  aria-invalid={touched.password && !!fieldErrors.password}
                  aria-describedby={touched.password && fieldErrors.password ? "err-password" : undefined}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={togglePw}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.password && fieldErrors.password && <p id="err-password" className="field-error" role="alert">{fieldErrors.password}</p>}
            </div>

            {error && (
              <div id="form-error" className="form-error-banner" role="alert">{error}</div>
            )}

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <span className="loading">
                  <span className="spinner" aria-hidden="true" />
                  <span>Đang xác thực...</span>
                </span>
              ) : (
                <span>Đăng nhập</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
