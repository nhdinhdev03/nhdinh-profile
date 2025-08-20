import { Link } from "react-router-dom";
import "./Footer.scss";
import facebookIcon from "../../../assets/icon/f-facebook.svg";
import linkedinIcon from "../../../assets/icon/f-linkedIn.svg";
import youtubeIcon from "../../../assets/icon/f-youtube.svg";
import { useUserTheme } from "../../../theme";

function Footer() {
  const currentYear = new Date().getFullYear();
  const foundationYear = 2024; // adjust if needed
  const yearText = foundationYear === currentYear ? currentYear : `${foundationYear}–${currentYear}`;
  const { light } = useUserTheme();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    if (email) {
      alert("Cảm ơn bạn đã đăng ký! ✨");
      form.reset();
    }
  };

  return (
    <footer className="site-footer" role="contentinfo" aria-labelledby="site-footer-heading">
      <h2 id="site-footer-heading" className="sr-only">
        Chân trang website
      </h2>
      <div className="footer__bg" aria-hidden="true" />
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand" data-col>
            <Link to="/" className="brand__logo" aria-label="Trang chủ">
              <span className="logo__badge" aria-hidden="true">
                N
              </span>
              <span className="logo__text">
                <strong className="logo__title">Nguyễn Hoàng Dinh</strong>
                <span className="logo__subtitle">Software Engineer • Full‑stack</span>
              </span>
            </Link>
            <p className="brand__tagline">
              Giao thoa giữa tư duy hệ thống & trải nghiệm người dùng. Tập trung vào kiến trúc
              sạch, hiệu năng, tính truy cập và cảm xúc sản phẩm.
            </p>
            <div className="brand__social" aria-label="Liên kết mạng xã hội">
              <a
                href="https://facebook.com/"
                className="social__btn"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="social__btn"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="social__btn"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtubeIcon} alt="YouTube" />
              </a>
            </div>
          </div>

          {/* Explore */}
            <nav className="footer__nav" aria-label="Khám phá" data-col>
              <h3 className="footer__heading">Khám phá</h3>
              <ul className="footer__list">
                <li><Link to="/#about">Giới thiệu</Link></li>
                <li><Link to="/#skills">Kỹ năng</Link></li>
                <li><Link to="/#projects">Dự án</Link></li>
                <li><Link to="/#contact">Liên hệ</Link></li>
              </ul>
            </nav>

          {/* Resources */}
            <nav className="footer__nav" aria-label="Tài nguyên" data-col>
              <h3 className="footer__heading">Tài nguyên</h3>
              <ul className="footer__list">
                <li>
                  <a href="https://github.com/nhdinhdev03" target="_blank" rel="noopener noreferrer">GitHub</a>
                </li>
                <li>
                  <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">Behance/Dribbble</a>
                </li>
                <li><Link to="/#faq">FAQ</Link></li>
                <li><Link to="/#blog">Blog</Link></li>
              </ul>
            </nav>

          {/* Tech Stack */}
          <div className="footer__stack" data-col aria-labelledby="stack-heading">
            <h3 id="stack-heading" className="footer__heading">Stack chính</h3>
            <ul className="stack__list" aria-label="Công nghệ sử dụng">
              {['React','TypeScript','Spring Boot','PostgreSQL','Redis','Tailwind CSS','Docker','CI/CD'].map(t => (
                <li key={t} className="stack__item">{t}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer__subscribe" data-col>
            <h3 className="footer__heading">Nhận tin mới</h3>
            <p className="subscribe__desc">
              Front‑end tips, ghi chú kiến trúc & bản cập nhật sản phẩm (1‑2 email / tháng).
            </p>
            <form className="subscribe__form" onSubmit={handleSubscribe} noValidate>
              <div className="form__group">
                <label htmlFor="subscribe-email" className="sr-only">Email</label>
                <input
                  id="subscribe-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="Nhập email của bạn"
                  required
                  aria-required="true"
                />
                <button type="submit" className="btn btn--primary">Đăng ký</button>
              </div>
              <small className="subscribe__note">Không spam. Có thể huỷ bất cứ lúc nào.</small>
            </form>
          </div>

          {/* Contact */}
          <div className="footer__contact" data-col aria-labelledby="contact-heading">
            <h3 id="contact-heading" className="footer__heading">Liên hệ</h3>
            <ul className="contact__list">
              <li><a href="mailto:contact@nhdinh.dev" rel="me">contact@nhdinh.dev</a></li>
              <li><span>Ho Chi Minh City, VN</span></li>
              <li><span>{light ? 'Chế độ sáng' : 'Chế độ tối'} bật</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom" data-surface>
          <div className="legal">
            <p className="copyright">© {yearText} nhdinh. Crafted with passion.</p>
            <ul className="policies">
              <li>
                <Link to="/privacy" className="policy__link">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to="/terms" className="policy__link">Điều khoản</Link>
              </li>
            </ul>
          </div>
          <div className="footer__meta">
            <span className="build">Build: v1.0.{currentYear}</span>
            <button className="to-top" onClick={scrollToTop} aria-label="Lên đầu trang">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M6 11L12 5L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;