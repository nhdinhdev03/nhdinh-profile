import React, { useEffect, useState } from "react";
import "./Header.scss";
import { ROUTES } from "router/routeConstants";
import { Link, NavLink } from "react-router-dom";

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

  const navItems = [
    { to: ROUTES.PROJECTS, label: "Dự án" },
    { to: ROUTES.BLOG, label: "Blog" },
    { to: ROUTES.ABOUT, label: "Giới thiệu" },
    { to: ROUTES.CONTACT, label: "Liên hệ" },
  ];

  return (
    <header>
      <div className="container nav" role="navigation" aria-label="Chính">
        <div className="brand">
          <div className="logo" aria-hidden="true" />
          <Link to={ROUTES.HOME} className="brand-name">
            {brand}
          </Link>
        </div>

        <nav className="row" aria-label="Liên kết chính">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }
            >
              {n.label}
            </NavLink>
          ))}
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
          <Link className="btn primary" to={ROUTES.ADMIN.LOGIN}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;