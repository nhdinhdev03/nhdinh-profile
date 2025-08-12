import React, { useEffect, useRef } from "react";

// Futuristic neural lattice canvas with pointer-reactive distortion
export default function NeuroGrid({ parentRef }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const cfgRef = useRef({});
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = 0, h = 0, t0 = performance.now();

    const getBrand = (name, fb) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    };
    const brandA = getBrand("--brand", "#5b8cff");
    const brandB = getBrand("--brand-2", "#06b6d4");

    const state = {
      cols: 0,
      rows: 0,
      points: [],
      spacing: 80,
      amp: 14,
      speed: 0.0007,
      radius: 160,
      strength: 22,
      reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
    cfgRef.current = state;

    const makeGradient = () => {
      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, brandA);
      g.addColorStop(0.5, "#ffffff");
      g.addColorStop(1, brandB);
      return g;
    };
    let strokeGrad = null;

    const build = () => {
      const rect = cvs.parentElement?.getBoundingClientRect();
      const vw = rect?.width || window.innerWidth;
      const vh = rect?.height || window.innerHeight * 0.7;
      w = Math.ceil(vw);
      h = Math.ceil(vh);
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);
      cvs.style.width = w + "px";
      cvs.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density based on viewport
      state.spacing = Math.max(60, Math.min(120, Math.floor(Math.min(w, h) / 9)));
      state.cols = Math.ceil(w / state.spacing) + 2;
      state.rows = Math.ceil(h / state.spacing) + 2;
      state.points = [];
      for (let r = 0; r < state.rows; r++) {
        for (let c = 0; c < state.cols; c++) {
          const x0 = (c - 1) * state.spacing;
          const y0 = (r - 1) * state.spacing;
          state.points.push({
            x0,
            y0,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      strokeGrad = makeGradient();
    };

    const dist2 = (x1, y1, x2, y2) => {
      const dx = x1 - x2, dy = y1 - y2; return dx * dx + dy * dy;
    };

    const render = (time) => {
  const { amp, speed, rows, cols, points, radius, strength, reduce } = cfgRef.current;
      const t = reduce ? t0 : time;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = strokeGrad;
      ctx.globalAlpha = 0.85;

      const pr = radius;
      const pr2 = pr * pr;

      // Compute positions
      const pos = (idx) => {
        const p = points[idx];
        const wobbleX = Math.sin(t * speed + p.phase) * amp;
        const wobbleY = Math.cos(t * speed + p.phase) * amp;
        let x = p.x0 + wobbleX;
        let y = p.y0 + wobbleY;
        if (pointer.current.active) {
          const d2 = dist2(x, y, pointer.current.x, pointer.current.y);
          if (d2 < pr2) {
            const d = Math.max(12, Math.sqrt(d2));
            const f = (1 - d / pr) ** 2; // smooth falloff
            const nx = (x - pointer.current.x) / d;
            const ny = (y - pointer.current.y) / d;
            x += nx * strength * f;
            y += ny * strength * f;
          }
        }
        return { x, y };
      };

      // Draw horizontal and vertical segments
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const p = pos(i);
          if (c < cols - 1) {
            const pR = pos(i + 1);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pR.x, pR.y);
          }
          if (r < rows - 1) {
            const pB = pos(i + cols);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pB.x, pB.y);
          }
        }
      }
      ctx.stroke();

      rafRef.current = requestAnimationFrame(render);
    };

    const onPointer = (e) => {
      const rect = cvs.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      pointer.current.active = true;
    };
    const onLeave = () => (pointer.current.active = false);

    build();
    rafRef.current = requestAnimationFrame(render);
    const target = parentRef?.current || cvs.parentElement || window;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (mq.matches) {
      target.addEventListener("mousemove", onPointer);
      target.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("resize", build);

    return () => {
      window.removeEventListener("resize", build);
      if (mq.matches) {
        target.removeEventListener("mousemove", onPointer);
        target.removeEventListener("mouseleave", onLeave);
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [parentRef]);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden />;
}
