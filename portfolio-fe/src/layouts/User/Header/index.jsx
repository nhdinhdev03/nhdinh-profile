import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTES } from "router/routeConstants";

const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad/.test(navigator.platform);

function useThemeClass() {
  const [light, setLight] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "light";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [light]);

  return { light, setLight };
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setScrolled(
        (window.scrollY || document.documentElement.scrollTop) > threshold
      );
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useCmdK(callback) {
  useEffect(() => {
    const onKey = (e) => {
      const mod = isMac ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [callback]);
}

function CommandPalette({ open, onClose, items }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => i.label.toLowerCase().includes(s));
  }, [q, items]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", bounce: 0, duration: 0.22 }}
            className="relative mx-auto mt-24 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-slate-200/70 dark:border-slate-700/60">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="opacity-60 dark:opacity-70"
              >
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20zM4 9.5C4 6.46 6.46 4 9.5 4S15 6.46 15 9.5 12.54 15 9.5 15 4 12.54 4 9.5"
                />
              </svg>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm nhanh..."
                className="w-full bg-transparent outline-none placeholder-slate-400/80 dark:placeholder-slate-500/80 py-2 text-slate-800 dark:text-slate-200"
              />
              <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {isMac ? "⌘" : "Ctrl"} K
              </span>
            </div>
            <ul className="max-h-80 overflow-auto py-2">
              {results.map((r) => (
                <li key={r.to} className="">
                  <NavLink
                    to={r.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 text-sm ${isActive ? "bg-sky-500/10 text-sky-700 dark:text-sky-300" : "text-slate-700 dark:text-slate-300 hover:bg-slate-500/10"}`
                    }
                  >
                    {r.label}
                  </NavLink>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  Không có kết quả
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ brand = "Tên của bạn", loginPath }) {
  const { pathname } = useLocation();
  const { light, setLight } = useThemeClass();
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Ctrl/Cmd + K for palette
  useCmdK(() => setPaletteOpen((v) => !v));

  const navItems = useMemo(
    () => [
      { to: ROUTES.PROJECTS, label: "Dự án" },
      { to: ROUTES.BLOG, label: "Blog" },
      { to: ROUTES.ABOUT, label: "Giới thiệu" },
      { to: ROUTES.CONTACT, label: "Liên hệ" },
    ],
    [ROUTES]
  );

  const _loginPath =
    loginPath || ROUTES?.ADMIN?.LOGIN || ROUTES?.LOGIN || "/login";

  // Active underline layoutId for framer-motion shared layout
  const activeKey =
    navItems.find((n) => pathname.startsWith(n.to))?.to || pathname;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[height,background,backdrop-filter] ${scrolled ? "h-14" : "h-16"}
      border-slate-200/80 bg-white/65 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/60`}
      data-open={open ? "true" : "false"}
    >
      {/* Neon hairline */}
      <div className="pointer-events-none h-[1.5px] w-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 opacity-60 dark:opacity-70" />

      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sky-500 focus:px-3 focus:py-2 focus:text-white"
        href="#main"
      >
        Bỏ qua nội dung
      </a>

      <div className="mx-auto grid h-full max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4">
        {/* Brand */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile menu */}
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-grid h-10 w-10 place-items-center rounded-xl text-slate-700 hover:bg-slate-500/10 dark:text-slate-200 dark:hover:bg-slate-700/40 lg:hidden"
          >
            <span className="relative block h-[2px] w-5 bg-current before:absolute before:-top-1.5 before:h-[2px] before:w-5 before:bg-current after:absolute after:top-1.5 after:h-[2px] after:w-5 after:bg-current" />
          </button>

          {/* Logo blob */}
          <div
            aria-hidden
            className="h-8 w-8 rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-[conic-gradient(at_70%_30%,theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.emerald.400),theme(colors.sky.400))] shadow-inner"
          />

          <Link
            to={ROUTES?.HOME ?? "/"}
            className="truncate font-extrabold tracking-tight text-slate-900 hover:text-sky-600 dark:text-slate-100 dark:hover:text-sky-400"
          >
            {brand}
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="relative hidden h-full items-stretch justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((n) => (
              <li key={n.to} className="relative">
                <NavLink
                  to={n.to}
                  className={({
                    isActive,
                  }) => `relative z-10 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-sky-600 dark:text-sky-300"
                      : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative">{n.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="active-pill"
                          className="absolute inset-0 -z-10 rounded-lg bg-sky-500/10 dark:bg-sky-400/10"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
                {activeKey === n.to && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute -bottom-[7px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400"
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          {/* Command palette button */}
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3 text-sm text-slate-700 shadow-sm backdrop-blur hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800 lg:flex"
            title={`${isMac ? "⌘" : "Ctrl"} + K`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="opacity-70"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20zM4 9.5C4 6.46 6.46 4 9.5 4S15 6.46 15 9.5 12.54 15 9.5 15 4 12.54 4 9.5"
              />
            </svg>
            <span className="hidden md:inline">Tìm nhanh</span>
            <kbd className="ml-1 rounded border border-slate-300 bg-slate-50 px-1.5 text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            aria-pressed={light ? "true" : "false"}
            aria-label="Chuyển giao diện"
            onClick={() => setLight((v) => !v)}
            className="inline-grid h-10 w-10 place-items-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur hover:bg-white dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {/* Sun/moon icon */}
            {light ? (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79zm10.45 14.32l1.79 1.79l1.79-1.79l-1.79-1.79zM12 4V1h-0v3zm0 19v-3h0v3zM4 13H1v-2h3zm19 0h-3v-2h3zM6.76 19.16l-1.8 1.79l-1.79-1.79l1.79-1.79zM17.24 4.84l1.79-1.79l1.79 1.79l-1.79 1.79zM12 7a5 5 0 100 10 5 5 0 000-10z"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M20 15.31A8.94 8.94 0 0112.69 4 7 7 0 1020 15.31z"
                />
              </svg>
            )}
          </button>

          <Link
            className="inline-flex h-10 items-center justify-center rounded-xl border border-transparent bg-gradient-to-b from-sky-500 to-sky-600 px-3 text-sm font-bold text-white shadow-md hover:from-sky-400 hover:to-sky-600 active:shadow-sm"
            to={_loginPath}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", bounce: 0, duration: 0.22 }}
            className="lg:hidden"
          >
            <div className="border-t border-slate-200/80 bg-white/90 px-4 py-2 backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/90">
              <ul className="flex flex-col gap-1 py-1">
                {navItems.map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm font-semibold ${
                          isActive
                            ? "bg-sky-500/10 text-sky-700 dark:text-sky-300"
                            : "text-slate-700 hover:bg-slate-500/10 dark:text-slate-300 dark:hover:bg-slate-700/40"
                        }`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command palette */}
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={navItems}
      />
    </header>
  );
}
export default Header;
