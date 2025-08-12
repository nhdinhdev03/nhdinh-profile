import { Link } from "react-router-dom";
import "./Footer.scss";
import facebookIcon from "../../../assets/icon/f-facebook.svg";
import linkedinIcon from "../../../assets/icon/f-linkedIn.svg";
import youtubeIcon from "../../../assets/icon/f-youtube.svg";

function Footer() {
  const year = new Date().getFullYear();

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
    <footer className="site-footer" role="contentinfo">
      <div className="footer__bg" aria-hidden="true" />
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="brand__logo" aria-label="Trang chủ">
              <span className="logo__badge" aria-hidden="true">
                N
              </span>
              <span className="logo__text">
                <strong className="logo__title">Nguyen Huu Dinh</strong>
                <span className="logo__subtitle">Software Engineer • Full‑stack</span>
              </span>
            </Link>
            <p className="brand__tagline">
              Xây dựng trải nghiệm số gọn gàng, tinh tế và hiệu quả. Mỗi dòng
              code là một bước tiến gần hơn tới trải nghiệm hoàn hảo.
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

          <nav className="footer__links" aria-label="Điều hướng chân trang">
            <div className="links__col">
              <h4 className="links__title">Khám phá</h4>
              <ul className="links__list">
                <li>
                  <Link to="/#about">Giới thiệu</Link>
                </li>
                <li>
                  <Link to="/#skills">Kỹ năng</Link>
                </li>
                <li>
                  <Link to="/#projects">Dự án</Link>
                </li>
                <li>
                  <Link to="/#contact">Liên hệ</Link>
                </li>
              </ul>
            </div>
            <div className="links__col">
              <h4 className="links__title">Tài nguyên</h4>
              <ul className="links__list">
                <li>
                  <a href="https://github.com/nhdinhdev03" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer">
                    Behance/Dribbble
                  </a>
                </li>
                <li>
                  <Link to="/#faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/#blog">Blog</Link>
                </li>
              </ul>
            </div>

            <div className="links__col links__col--wide">
              <h4 className="links__title">Nhận tin mới</h4>
              <p className="subscribe__desc">
                Mẹo Front‑end, câu chuyện dự án, và bản cập nhật sản phẩm. 1‑2
                email/tháng.
              </p>
              <form className="subscribe__form" onSubmit={handleSubscribe}>
                <label htmlFor="subscribe-email" className="sr-only">
                  Email
                </label>
                <input
                  id="subscribe-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="Nhập email của bạn"
                  required
                />
                <button type="submit" className="btn btn--primary">
                  Đăng ký
                </button>
              </form>
              <small className="subscribe__note">Không spam. Huỷ bất cứ lúc nào.</small>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="copyright">
            © {year} nhdinh. Made with passion and a bit of coffee.
          </p>
          <ul className="policies">
            <li>
              <Link to="/privacy" className="policy__link">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/terms" className="policy__link">
                Điều khoản sử dụng
              </Link>
            </li>
          </ul>

          <button className="to-top" onClick={scrollToTop} aria-label="Lên đầu trang">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M6 11L12 5L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;