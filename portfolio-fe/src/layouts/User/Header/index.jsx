function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        borderBottom: "1px solid #eee",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo + Tên */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Nguyễn Văn A
        </span>
      </div>

      {/* Menu */}
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "24px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a href="/" style={linkStyle}>
              Trang chủ
            </a>
          </li>
          <li>
            <a href="/about" style={linkStyle}>
              Giới thiệu
            </a>
          </li>
          <li>
            <a href="/projects" style={linkStyle}>
              Dự án
            </a>
          </li>
          <li>
            <a href="/contact" style={linkStyle}>
              Liên hệ
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

// Style link tách riêng để tái sử dụng
const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: 500,
  transition: "color 0.3s",
};

export default Header;
