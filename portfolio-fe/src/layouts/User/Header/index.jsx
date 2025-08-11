import React from "react";
import "./Header.scss";

function Header() {
  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Chính">
        <div className="brand">
          <div className="logo" aria-hidden="true"></div>
          <a href="#home" className="brand-name">
            Tên của bạn
          </a>
        </div>
        <nav className="row">
          <a href="#projects">Dự án</a>
          <a href="#blog">Blog</a>
          <a href="#about">Giới thiệu</a>
          <a href="#contact">Liên hệ</a>
        </nav>
        <div className="actions">
          <button
            id="themeBtn"
            className="btn"
            aria-pressed="false"
            aria-label="Chuyển giao diện"
          >
            🌗
          </button>
          <a className="btn primary" href="#contact">
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
