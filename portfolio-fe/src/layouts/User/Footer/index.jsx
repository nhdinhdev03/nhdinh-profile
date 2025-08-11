import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Tên của bạn</h2>
          <p>Java Backend • React Frontend • SQL Server</p>
        </div>

        <div className="footer-links">
          <Link to="/projects">Dự án</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} • Tên của bạn • Made with ❤️
      </div>
    </footer>
  );
}

export default Footer;
