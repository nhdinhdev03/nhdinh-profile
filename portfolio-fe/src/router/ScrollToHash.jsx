// ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash({ offset = 0 }) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // đợi DOM render
    requestAnimationFrame(() => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  }, [hash, offset]);

  return null;
}
