import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2 className="brand-title">Nguyễn Hoàng Dinh</h2>
          <p className="brand-tagline">Java Backend • React Frontend • SQL Server</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <Link to="/projects">Dự án</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Liên hệ</Link>
        </div>

        {/* Socials */}
        <div className="footer-social">
          <a href="https://github.com/nhdinhdev03" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:nhdinh.dev03@gmail.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} • Nguyễn Hoàng Dinh • Made with <span className="heart">❤️</span>
      </div>
    </footer>
  );
}

export default Footer