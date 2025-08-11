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
    <section id="contact">
      <div className="section-head">
        <div>
          <div className="section-title">Liên hệ</div>
          <div className="section-desc">Sẵn sàng cho cơ hội hợp tác mới ✨</div>
        </div>
      </div>

      <div className="grid">
        <div className="card" style={{ gridColumn: "span 7" }}>
          <form onSubmit={onSubmit} id="contactForm" noValidate>
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
              <input
                name="name"
                placeholder="Họ tên"
                value={form.name}
                onChange={onChange}
                required
                aria-label="Họ tên"
                aria-invalid={!form.name.trim() ? "true" : "false"}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                required
                aria-label="Email"
                aria-invalid={!form.email.trim() ? "true" : "false"}
              />
            </div>

            <input
              name="subject"
              placeholder="Tiêu đề"
              value={form.subject}
              onChange={onChange}
              aria-label="Tiêu đề"
            />

            <textarea
              name="message"
              placeholder="Nội dung"
              value={form.message}
              onChange={onChange}
              required
              aria-label="Nội dung"
              aria-invalid={!form.message.trim() ? "true" : "false"}
            />

            <div className="row">
              <button
                className="btn primary"
                type="submit"
                disabled={status.sending}
              >
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
            >
              {status.ok && "Đã gửi thành công! Cảm ơn bạn 🙌"}
              {!status.ok && status.error}
            </div>
          </form>
        </div>

        <aside className="card" style={{ gridColumn: "span 5" }}>
          <h3 style={{ marginTop: 0 }}>Thông tin</h3>
          <p className="section-desc">
            Email: {email}
            <br />
            LinkedIn: {info.linkedin || "/in/yourname"}
            <br />
            GitHub: {info.github || "/yourhandle"}
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Contact;
