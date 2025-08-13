import React, { useState } from "react";
import "./Sections.scss";

function Contact({ email = "you@example.com", info = {}, actionUrl = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    sending: false,
    ok: false,
    error: "",
  });
  const [botField, setBotField] = useState(""); // honeypot
  const [copied, setCopied] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitViaAPI = async () => {
    if (!actionUrl) return false;
    try {
      setStatus({ sending: true, ok: false, error: "" });
      const res = await fetch(actionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus({ sending: false, ok: true, error: "" });
      return true;
    } catch (err) {
      setStatus({
        sending: false,
        ok: false,
        error: "Không thể gửi qua server. Sẽ mở email.",
      });
      return false;
    }
  };

  const submitViaMailto = () => {
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} <${form.email}>`
    );
    const subject = encodeURIComponent(form.subject || "Liên hệ từ portfolio");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } else {
        // Fallback: open mailto as a gentle fallback UX
        window.location.href = `mailto:${email}`;
      }
    } catch (_) {
      // ignore
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (botField) return; // bot -> bỏ qua
    // kiểm tra nhanh
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus((s) => ({
        ...s,
        error: "Vui lòng điền đầy đủ Họ tên, Email và Nội dung.",
      }));
      return;
    }

    const done = await submitViaAPI();
    if (!done) submitViaMailto();
  };

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="section-head">
        <div>
          <h2 id="contact-title" className="section-title">Liên hệ</h2>
          <p className="section-desc">Sẵn sàng cho cơ hội hợp tác mới ✨</p>
        </div>
      </div>
      <div className="gradient-line" aria-hidden="true" />

      <div className="grid" aria-live="polite">
        <div
          className="card"
          style={{ gridColumn: "span 7" }}
        >
          <h3 style={{ marginTop: 4, marginBottom: 12 }}>Gửi tin nhắn</h3>

          {status.ok && (
            <div className="banner success" role="status">Đã gửi thành công! Cảm ơn bạn 🙌</div>
          )}
          {!status.ok && status.error && (
            <div className="banner error" role="alert">{status.error}</div>
          )}

          <form
            onSubmit={onSubmit}
            id="contactForm"
            noValidate
            aria-busy={status.sending ? "true" : "false"}
          >
            {/* Honeypot (ẩn) */}
            <input
              type="text"
              name="company"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-5000px",
                opacity: 0,
                height: 0,
                width: 0,
              }}
              aria-hidden="true"
            />

            <div className="row">
              <div className="field">
                <label htmlFor="name">Họ tên</label>
                <input
                  id="name"
                  name="name"
                  placeholder="VD: Nguyễn Văn A"
                  value={form.name}
                  onChange={onChange}
                  required
                  aria-invalid={!form.name.trim() ? "true" : "false"}
                  autoComplete="name"
                  disabled={status.sending}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ban@example.com"
                  value={form.email}
                  onChange={onChange}
                  required
                  aria-invalid={!form.email.trim() ? "true" : "false"}
                  autoComplete="email"
                  disabled={status.sending}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="subject">Tiêu đề <span className="muted">(không bắt buộc)</span></label>
              <input
                id="subject"
                name="subject"
                placeholder="VD: Hợp tác dự án website"
                value={form.subject}
                onChange={onChange}
                autoComplete="subject"
                disabled={status.sending}
              />
            </div>

            <div className="field">
              <label htmlFor="message">Nội dung</label>
              <textarea
                id="message"
                name="message"
                placeholder="Mô tả ngắn gọn nhu cầu hoặc câu hỏi của bạn..."
                value={form.message}
                onChange={onChange}
                required
                aria-invalid={!form.message.trim() ? "true" : "false"}
                rows={6}
                disabled={status.sending}
              />
            </div>

            <div className="row">
              <button
                className="btn primary"
                type="submit"
                disabled={status.sending}
              >
                {status.sending && <span className="spinner" aria-hidden="true" />}
                {status.sending ? "Đang gửi..." : "Gửi"}
              </button>
              {actionUrl && (
                <span className="section-desc" style={{ alignSelf: "center" }}>
                  Sẽ gửi qua server, lỗi thì mở email dự phòng.
                </span>
              )}
            </div>

            <div
              role="status"
              aria-live="polite"
              style={{ marginTop: 8, minHeight: 22 }}
              className="section-desc"
              id="contact-status"
            >
              {status.ok && "Đã gửi thành công! Cảm ơn bạn 🙌"}
              {!status.ok && status.error}
            </div>
          </form>
        </div>

        <aside
          className="card"
          style={{ gridColumn: "span 5" }}
        >
          <h3 style={{ marginTop: 0 }}>Thông tin</h3>
          <p className="section-desc">
            Email: {email}
            <br />
            LinkedIn: {info.linkedin || "/in/yourname"}
            <br />
            GitHub: {info.github || "/yourhandle"}
          </p>

          <div className="methods">
            <button type="button" className="btn" onClick={() => (window.location.href = `mailto:${email}`)}>
              ✉️ Gửi email trực tiếp
            </button>
            {info.linkedin && (
              <a className="btn" href={`https://www.linkedin.com${info.linkedin}`} target="_blank" rel="noreferrer">💼 Mở LinkedIn</a>
            )}
            {info.github && (
              <a className="btn" href={`https://github.com/${info.github.replace(/^\//, "")}`} target="_blank" rel="noreferrer">🐱‍💻 Mở GitHub</a>
            )}
            <button type="button" className="btn" onClick={copyEmail} aria-live="polite">
              {copied ? "✅ Đã sao chép email" : "📋 Sao chép email"}
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Contact;
