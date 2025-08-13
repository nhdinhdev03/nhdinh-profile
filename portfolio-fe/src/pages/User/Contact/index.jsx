import React, { useState, useCallback, useMemo } from "react";
import "./Sections.scss";


function Contact({ email = "nhdinh.dev03@gmail.com", info = {}, actionUrl = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({
    sending: false,
    ok: false,
    error: "",
    apiTried: false,
  });
  const [botField, setBotField] = useState(""); // honeypot
  const [copied, setCopied] = useState(false);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);
  const onBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const errors = useMemo(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Bắt buộc";
    if (!form.email.trim()) errs.email = "Bắt buộc";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = "Email không hợp lệ";
    if (!form.message.trim()) errs.message = "Bắt buộc";
    return errs;
  }, [form]);

  const submitViaAPI = useCallback(async () => {
    if (!actionUrl) return false;
    try {
      setStatus((s) => ({
        ...s,
        sending: true,
        ok: false,
        error: "",
        apiTried: true,
      }));
      const res = await fetch(actionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({ sending: false, ok: true, error: "", apiTried: true });
      return true;
    } catch (_) {
      setStatus({
        sending: false,
        ok: false,
        error: "Không thể gửi qua server. Sẽ mở email.",
        apiTried: true,
      });
      return false;
    }
  }, [actionUrl, form]);

  const submitViaMailto = useCallback(() => {
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} <${form.email}>`
    );
    const subject = encodeURIComponent(form.subject || "Liên hệ từ portfolio");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }, [form, email]);

  const copyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } else {
        window.location.href = `mailto:${email}`; // fallback
      }
    } catch (_) {
      /* ignore */
    }
  }, [email]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (botField) return; // bot
      // mark all as touched to show errors if any
      setTouched({ name: true, email: true, subject: true, message: true });
      if (Object.keys(errors).length) {
        setStatus((s) => ({
          ...s,
          error: "Vui lòng kiểm tra các trường bắt buộc.",
        }));
        return;
      }
      const done = await submitViaAPI();
      if (!done) submitViaMailto();
    },
    [botField, errors, submitViaAPI, submitViaMailto]
  );

  const globalMessage = status.ok
    ? "Đã gửi thành công! Cảm ơn bạn 🙌"
    : status.error;

  return (
    <section id="contact" aria-labelledby="contact-title" data-section>
      <div className="section-head">
        <div>
          <h2 id="contact-title" className="section-title">
            Liên hệ
          </h2>
          <p className="section-desc">Sẵn sàng cho cơ hội hợp tác mới ✨</p>
        </div>
      </div>
      <div className="gradient-line" aria-hidden="true" />

      <div className="grid contact-layout" aria-live="polite">
        <div
          className="card main-form"
          role="form"
          aria-labelledby="form-title"
        >
          <div className="card-head">
            <h3 id="form-title" className="card-title">
              Gửi tin nhắn
            </h3>
            {globalMessage && (
              <div
                className={`banner ${
                  status.ok ? "success" : status.error ? "error" : ""
                }`}
                role={status.ok ? "status" : "alert"}
              >
                {globalMessage}
              </div>
            )}
          </div>
          <form
            onSubmit={onSubmit}
            id="contactForm"
            noValidate
            aria-busy={status.sending ? "true" : "false"}
          >
            {/* Honeypot (ẩn) */}
            <label className="visually-hidden" htmlFor="company">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hp-field"
            />

            <div className="row">
              <div
                className={`field ${
                  touched.name && errors.name ? "has-error" : ""
                }`}
              >
                <label htmlFor="name">
                  Họ tên{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="VD: Nguyễn Văn A"
                  value={form.name}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                  aria-invalid={touched.name && !!errors.name}
                  autoComplete="name"
                  disabled={status.sending}
                />
                {touched.name && errors.name && (
                  <p className="field-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div
                className={`field ${
                  touched.email && errors.email ? "has-error" : ""
                }`}
              >
                <label htmlFor="email">
                  Email{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ban@example.com"
                  value={form.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  required
                  inputMode="email"
                  aria-invalid={touched.email && !!errors.email}
                  autoComplete="email"
                  disabled={status.sending}
                />
                {touched.email && errors.email && (
                  <p className="field-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">
                Tiêu đề <span className="muted">(tùy chọn)</span>
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="VD: Hợp tác dự án website"
                value={form.subject}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
                disabled={status.sending}
              />
            </div>

            <div
              className={`field ${
                touched.message && errors.message ? "has-error" : ""
              }`}
            >
              <label htmlFor="message">
                Nội dung{" "}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Mô tả ngắn gọn nhu cầu hoặc câu hỏi của bạn..."
                value={form.message}
                onChange={onChange}
                onBlur={onBlur}
                required
                aria-invalid={touched.message && !!errors.message}
                rows={6}
                disabled={status.sending}
              />
              {touched.message && errors.message && (
                <p className="field-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="form-footer">
              <button
                className="btn primary submit-btn"
                type="submit"
                disabled={status.sending}
              >
                {status.sending && (
                  <span className="spinner" aria-hidden="true" />
                )}
                <span>{status.sending ? "Đang gửi..." : "Gửi"}</span>
              </button>
              {actionUrl && (
                <p className="hint section-desc">
                  Ưu tiên gửi qua server • fallback mailto
                </p>
              )}
            </div>
            <div className="sr-status" aria-live="polite">
              {globalMessage}
            </div>
          </form>
        </div>

        <aside className="card info-panel" aria-labelledby="info-title">
          <div className="card-head">
            <h3 id="info-title" className="card-title" style={{ marginTop: 0 }}>
              Thông tin
            </h3>
            <p className="section-desc contact-lines">
              <span>
                Email: <strong>{email}</strong>
              </span>
              {/* <span>LinkedIn: {info.linkedin || "/in/yourname"}</span> */}
              <span>GitHub: {info.github || "/nhdinhdev03"}</span>
            </p>
          </div>
          <div className="methods">
            <button
              type="button"
              className="btn"
              onClick={() => (window.location.href = `mailto:${email}`)}
            >
              ✉️ Gửi email trực tiếp
            </button>
            {info.linkedin && (
              <a
                className="btn"
                href={`https://www.linkedin.com${info.linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Mở LinkedIn"
              >
                💼 Mở LinkedIn
              </a>
            )}
            {info.github && (
              <a
                className="btn"
                href={`https://github.com/${info.github.replace(/^\//, "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Mở GitHub"
              >
                🐱‍💻 Mở GitHub
              </a>
            )}
            <button
              type="button"
              className="btn"
              onClick={copyEmail}
              aria-live="polite"
            >
              {copied ? "✅ Đã sao chép email" : "📋 Sao chép email"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Contact;
