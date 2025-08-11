// Header.jsx
import React, { useEffect, useState } from "react";
import "./Header.scss";
import { ADMINROUTES, ROUTES } from "router/routeConstants";
import { Link } from "react-router-dom";

function Header({ brand = "Tên của bạn" }) {
  const [light, setLight] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [light]);

  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Chính">
        <div className="brand">
          <div className="logo" aria-hidden="true" />
          <a href={`${ROUTES.HOME}#`} className="brand-name">
            {brand}
          </a>
        </div>

        <nav className="row" aria-label="Liên kết chính">
          <a href={`${ROUTES.HOME}#projects`} className="nav-link">
            Dự án
          </a>
          <a href={`${ROUTES.HOME}#blog`} className="nav-link">
            Blog
          </a>
          <a href={`${ROUTES.HOME}#about`} className="nav-link">
            Giới thiệu
          </a>
          <a href={`${ROUTES.HOME}#contact`} className="nav-link">
            Liên hệ
          </a>
        </nav>

        <div className="actions">
          <button
            type="button"
            className="btn"
            aria-pressed={light ? "true" : "false"}
            aria-label="Chuyển giao diện"
            onClick={() => setLight((v) => !v)}
          >
            🌗
          </button>
          <Link className="btn primary" to={`${ROUTES.ADMIN.LOGIN}`}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
