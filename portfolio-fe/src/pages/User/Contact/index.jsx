import React, { useState, useCallback, useMemo } from "react";

import { useNotificationContext } from "components/Notification";
import "./Sections.scss";
import userContactMessageApi from "api/user/contact/ContactMessageApi";


function Contact({ email = "nhdinh.dev03@gmail.com", info = {} }) {
  const notification = useNotificationContext();
  
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
    if (!form.name.trim()) errs.name = "Họ tên là bắt buộc";
    else if (form.name.trim().length < 2) errs.name = "Họ tên phải có ít nhất 2 ký tự";
    else if (form.name.trim().length > 100) errs.name = "Họ tên không được quá 100 ký tự";
    
    if (!form.email.trim()) errs.email = "Email là bắt buộc";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = "Email không hợp lệ";
    else if (form.email.length > 256) errs.email = "Email không được quá 256 ký tự";
    
    if (form.subject && form.subject.length > 200) errs.subject = "Tiêu đề không được quá 200 ký tự";
    
    if (!form.message.trim()) errs.message = "Nội dung tin nhắn là bắt buộc";
    else if (form.message.trim().length < 10) errs.message = "Tin nhắn phải có ít nhất 10 ký tự";
    
    return errs;
  }, [form]);

  const submitViaMailto = useCallback(() => {
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} <${form.email}>`
    );
    const subject = encodeURIComponent(form.subject || "Liên hệ từ portfolio");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }, [form, email]);

  const submitViaAPI = useCallback(async () => {
    try {
      setStatus((s) => ({
        ...s,
        sending: true,
        ok: false,
        error: "",
        apiTried: true,
      }));
      
      await userContactMessageApi.submit(form);
      
      setStatus({ 
        sending: false, 
        ok: true, 
        error: "", 
        apiTried: true 
      });
      
      // Show success notification
      notification.success(
        "🎉 Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất !.",
        6000,
        {
          title: "Gửi thành công",
          actions: [
            {
              label: "Gửi tin nhắn khác",
              onClick: () => {
                // Form already reset below
              }
            }
          ]
        }
      );
      
      // Reset form after successful submission
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTouched({});
      
      return true;
    } catch (error) {
      console.error('Failed to submit contact message:', error);
      
      let errorMessage = "Không thể gửi tin nhắn. Vui lòng thử lại sau.";
      let errorTitle = "Gửi thất bại";
      
      // Handle specific error cases
      if (error.response) {
        const serverMessage = error.response.data?.message;
        
        switch (error.response.status) {
          case 400:
            // Check if it's a rate limiting error specifically
            if (serverMessage && serverMessage.includes("phút nữa")) {
              // Extract minutes from server message like "Vui lòng chờ 5 phút nữa"
              const minutesMatch = serverMessage.match(/chờ (\d+) phút nữa/);
              const minutes = minutesMatch ? minutesMatch[1] : "vài";
              errorMessage = `⏰ Bạn đã gửi tin nhắn gần đây. Vui lòng chờ ${minutes} phút nữa trước khi gửi tin nhắn khác để tránh spam.`;
              errorTitle = `Vui lòng chờ ${minutes} phút nữa`;
            } else if (serverMessage && serverMessage.includes("15 phút")) {
              errorMessage = "⏰ Bạn đã gửi tin nhắn gần đây. Vui lòng chờ 15 phút trước khi gửi tin nhắn khác để tránh spam.";
              errorTitle = "Vui lòng chờ 15 phút";
            } else if (serverMessage && serverMessage.includes("trùng lặp")) {
              errorMessage = "📝 Tin nhắn tương tự đã được gửi gần đây. Vui lòng không gửi lại nội dung trùng lặp.";
              errorTitle = "Nội dung trùng lặp";
            } else {
              errorMessage = serverMessage || "Thông tin không hợp lệ. Vui lòng kiểm tra lại các trường.";
              errorTitle = "Dữ liệu không hợp lệ";
            }
            break;
          case 429:
            errorMessage = "⏰ Bạn đã gửi quá nhiều tin nhắn. Vui lòng chờ 15 phút trước khi gửi lại.";
            errorTitle = "Vui lòng chờ 15 phút";
            break;
          case 500:
            errorMessage = "Lỗi server. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.";
            errorTitle = "Lỗi hệ thống";
            break;
          default:
            errorMessage = serverMessage || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến server. Kiểm tra kết nối mạng của bạn.";
        errorTitle = "Lỗi kết nối";
      }
      
      // Show error notification
      const isRateLimited = errorTitle.includes("phút");
      
      notification.error(
        errorMessage,
        isRateLimited ? 10000 : 8000, // Longer duration for rate limit error
        {
          title: errorTitle,
          actions: isRateLimited ? [
            {
              label: "Hiểu rồi",
              onClick: () => {
                // Maybe show a countdown timer in the future
              }
            },
            {
              label: "Gửi email trực tiếp",
              onClick: () => {
                submitViaMailto();
              }
            }
          ] : [
            {
              label: "Thử lại",
              onClick: () => {
                // Will retry when user clicks submit again
              }
            },
            {
              label: "Gửi email trực tiếp",
              onClick: () => {
                submitViaMailto();
              }
            }
          ]
        }
      );
      
      setStatus({
        sending: false,
        ok: false,
        error: errorMessage,
        apiTried: true,
      });
      return false;
    }
  }, [form, notification, submitViaMailto]);

  const copyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
        
        // Show success notification for copy
        notification.success(
          `Đã sao chép email: ${email}`,
          3000,
          {
            title: "Sao chép thành công"
          }
        );
      } else {
        window.location.href = `mailto:${email}`; // fallback
      }
    } catch (error) {
      console.error('Failed to copy email:', error);
      notification.error(
        "Không thể sao chép email. Đã mở ứng dụng email thay thế.",
        4000,
        {
          title: "Sao chép thất bại"
        }
      );
      window.location.href = `mailto:${email}`;
    }
  }, [email, notification]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (botField) return; // bot protection
      
      // mark all as touched to show errors if any
      setTouched({ name: true, email: true, subject: true, message: true });
      
      if (Object.keys(errors).length) {
        // Show validation error notification
        notification.warning(
          "Vui lòng kiểm tra và điền đầy đủ thông tin bắt buộc trước khi gửi.",
          5000,
          {
            title: "Thông tin chưa đầy đủ",
            actions: []
          }
        );
        
        setStatus((s) => ({
          ...s,
          error: "Vui lòng kiểm tra các trường bắt buộc.",
        }));
        return;
      }
      
      // Try API submission
      await submitViaAPI();
    },
    [botField, errors, submitViaAPI, notification]
  );

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

            <div className={`field ${
              touched.subject && errors.subject ? "has-error" : ""
            }`}>
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
              {touched.subject && errors.subject && (
                <p className="field-error" role="alert">
                  {errors.subject}
                </p>
              )}
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

    

            {/* General error message */}
            {status.error && !status.error.includes("15 phút") && !status.error.includes("phút nữa") && (
              <div className="form-error" role="alert" style={{
                padding: "12px 16px",
                marginTop: "16px",
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
                borderRadius: "6px",
                color: "#721c24"
              }}>
                <strong>❌ Có lỗi xảy ra</strong>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                  {status.error}
                </p>
              </div>
            )}

            <div className="form-footer">
              <button
                className="btn primary submit-btn"
                type="submit"
                disabled={status.sending || Object.keys(errors).length > 0}
              >
                {status.sending && (
                  <span className="spinner" aria-hidden="true" />
                )}
                <span>{status.sending ? "Đang gửi..." : "Gửi tin nhắn"}</span>
              </button>
              <p className="hint section-desc">
                Tin nhắn sẽ được gửi trực tiếp đến email của tôi
              </p>
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
