import React, { useEffect, useMemo, useRef, useState } from "react";
import NeuroGrid from "./HIHI";
import "./HomeIndex.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routeConstants";

function useTypewriter(words = [], speed = 80, pause = 1200) {
  const seq = useMemo(() => (Array.isArray(words) ? words : []), [words]);
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // how many chars
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (seq.length === 0) return;
    const current = seq[index % seq.length] ?? "";
    const atWordEnd = !deleting && subIndex === current.length;
    const atWordStart = deleting && subIndex === 0;

    const timeout = setTimeout(
      () => {
        if (atWordEnd) {
          setDeleting(true);
        } else if (atWordStart) {
          setDeleting(false);
          setIndex((i) => (i + 1) % seq.length);
        } else {
          setSubIndex((s) => s + (deleting ? -1 : 1));
        }
      },
      atWordEnd ? pause : deleting ? Math.max(40, speed / 2) : speed
    );

    setText(current.slice(0, subIndex));
    return () => clearTimeout(timeout);
  }, [seq, index, subIndex, deleting, speed, pause]);

  return text;
}

function HomeIndex() {
  const heroRef = useRef(null);
  const rafRef = useRef(0);
  const targetVars = useRef({ x: 0, y: 0 });

  // Parallax: update CSS vars --mx/--my in range [-1, 1]
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const rect = () => el.getBoundingClientRect();
    const onMove = (e) => {
      const r = rect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      targetVars.current.x = Math.max(-1, Math.min(1, dx));
      targetVars.current.y = Math.max(-1, Math.min(1, dy));
      if (!rafRef.current) loop();
    };
    const onLeave = () => {
      targetVars.current.x = 0;
      targetVars.current.y = 0;
      if (!rafRef.current) loop();
    };
    const loop = () => {
      const step = 0.08; // easing
      const sx = parseFloat(getComputedStyle(el).getPropertyValue("--mx")) || 0;
      const sy = parseFloat(getComputedStyle(el).getPropertyValue("--my")) || 0;
      const nx = sx + (targetVars.current.x - sx) * step;
      const ny = sy + (targetVars.current.y - sy) * step;
      el.style.setProperty("--mx", nx.toFixed(4));
      el.style.setProperty("--my", ny.toFixed(4));
      if (
        Math.abs(nx - targetVars.current.x) > 0.002 ||
        Math.abs(ny - targetVars.current.y) > 0.002
      ) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = 0;
      }
    };

    // Only enable on pointer devices
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mq.matches) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
  const typed = useTypewriter([
    "Lập Trình Viên Full Stack",
    "Front‑end Developer",
    "React/Node.js Engineer",
  ]);

  const scrollTo = (hash) => {
    const id = (hash || "").replace("#", "");
    const el = id ? document.getElementById(id) : null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" aria-label="Phần giới thiệu" ref={heroRef}>
      <div className="hero__bg" aria-hidden="true">
        <NeuroGrid parentRef={heroRef} />
      </div>
      <div className="hero__container">
        <h1 className="hero__title">
          <span>Xin chào, tôi là</span>
          <span className="hero__name" data-text="Nhdinh">
            Nhdinh
          </span>
        </h1>

        <p className="hero__subtitle">
          <span className="typewriter" aria-live="polite" aria-atomic="true">
            {typed}
            <span className="caret" aria-hidden="true">
              |
            </span>
          </span>
        </p>

        <p className="hero__lead">
          Tôi tạo ra những trang web đẹp, tương thích với mọi thiết bị và mang
          lại trải nghiệm người dùng tuyệt vời. Chuyên môn về công nghệ web hiện
          đại và các giải pháp sáng tạo.
        </p>

        <div className="hero__ctas">
          <Link className="btn btn--primary" to={ROUTES.PROJECTS}>
            Xem Dự Án
          </Link>
          <Link className="btn" to={ROUTES.CONTACT}>
            Liên Hệ
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeIndex;
