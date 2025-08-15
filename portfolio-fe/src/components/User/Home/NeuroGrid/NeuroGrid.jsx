


import React, { useEffect, useRef } from "react";

 function NeuroGrid({ parentRef }) {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const roRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		const container = canvas.parentElement || canvas;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

		let width = 0,
			height = 0,
			t0 = performance.now();

		// Grid state
		let points = [];
		let cols = 0,
			rows = 0,
			spacing = 72;

		function getCSSVar(el, name, fallback) {
			try {
				const v = getComputedStyle(el).getPropertyValue(name).trim();
				return v || fallback;
			} catch (_) {
				return fallback;
			}
		}

		function size() {
			const rect = container.getBoundingClientRect();
			width = Math.max(1, rect.width);
			height = Math.max(1, rect.height);
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = width + "px";
			canvas.style.height = height + "px";
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// derive spacing based on width for consistent density
			spacing = Math.max(56, Math.min(100, Math.round(width / 12)));
			cols = Math.ceil(width / spacing) + 1;
			rows = Math.ceil(height / spacing) + 1;

			// initialize points on a perturbed grid
			points = [];
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const px = x * spacing + (Math.random() - 0.5) * spacing * 0.15;
					const py = y * spacing + (Math.random() - 0.5) * spacing * 0.15;
					const phase = Math.random() * Math.PI * 2;
					points.push({
						ax: px,
						ay: py,
						phase,
					});
				}
			}
		}

		function sampleParallax() {
			const host = parentRef?.current || container;
			const mx = parseFloat(getComputedStyle(host).getPropertyValue("--mx")) || 0;
			const my = parseFloat(getComputedStyle(host).getPropertyValue("--my")) || 0;
			return { mx, my };
		}

		function draw(now) {
			const t = (now - t0) / 1000;
			ctx.clearRect(0, 0, width, height);

			// colors via CSS variables with fallbacks
			const brand = getCSSVar(document.documentElement, "--brand-primary", "#5b8cff");
			const brand2 = getCSSVar(document.documentElement, "--brand-secondary", "#06b6d4");
			const isLight = !document.body.classList.contains("dark");
			const { mx, my } = sampleParallax();

			// subtle global parallax offset
			const ox = mx * 10;
			const oy = my * 6;

			// animate with low amplitude; turn nearly static if reduced motion
			const amp = prefersReduced ? 0 : Math.min(8, spacing * 0.12);
			const speed = prefersReduced ? 0 : 0.6;
			
			// Điều chỉnh opacity dựa theo light/dark mode
			ctx.globalAlpha = isLight ? 0.4 : 0.65;

			// Precompute gradient for strokes
			const g = ctx.createLinearGradient(0, 0, width, height);
			g.addColorStop(0, brand);
			g.addColorStop(1, brand2);

			ctx.lineWidth = 1.1;
			ctx.strokeStyle = g;
			ctx.globalAlpha = 0.65;

			// helper to compute index
			const idx = (x, y) => y * cols + x;

			// draw connections (only right and down to avoid duplicates)
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const p = points[idx(x, y)];
					if (!p) continue;
					const jitter = Math.sin(t * speed + p.phase);
					const px = p.ax + ox + jitter * amp;
					const py = p.ay + oy + Math.cos(t * speed + p.phase) * amp * 0.6;

					// right neighbor
					if (x + 1 < cols) {
						const pr = points[idx(x + 1, y)];
						const jr = Math.sin(t * speed + pr.phase);
						const prx = pr.ax + ox + jr * amp;
						const pry = pr.ay + oy + Math.cos(t * speed + pr.phase) * amp * 0.6;
						ctx.beginPath();
						ctx.moveTo(px, py);
						ctx.lineTo(prx, pry);
						ctx.stroke();
					}
					// down neighbor
					if (y + 1 < rows) {
						const pd = points[idx(x, y + 1)];
						const jd = Math.sin(t * speed + pd.phase);
						const pdx = pd.ax + ox + jd * amp;
						const pdy = pd.ay + oy + Math.cos(t * speed + pd.phase) * amp * 0.6;
						ctx.beginPath();
						ctx.moveTo(px, py);
						ctx.lineTo(pdx, pdy);
						ctx.stroke();
					}
				}
			}

			// draw nodes lightly on top
			ctx.globalAlpha = 0.75;
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const p = points[idx(x, y)];
					const jitter = Math.sin(t * speed + p.phase);
					const px = p.ax + ox + jitter * amp;
					const py = p.ay + oy + Math.cos(t * speed + p.phase) * amp * 0.6;
					ctx.beginPath();
					ctx.fillStyle = brand;
					ctx.arc(px, py, 1.2, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			rafRef.current = requestAnimationFrame(draw);
		}

		// Observe size changes efficiently
		function start() {
			size();
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(draw);
		}

			if ("ResizeObserver" in window) {
				roRef.current = new ResizeObserver(() => start());
				roRef.current.observe(container);
			} else {
				// Fallback if ResizeObserver is unavailable
				window.addEventListener("resize", start);
			}

		start();

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (roRef.current) roRef.current.disconnect();
			if (!("ResizeObserver" in window)) window.removeEventListener("resize", start);
		};
	}, [parentRef]);

	return (
		<canvas
			ref={canvasRef}
			className="fx-canvas"
			aria-hidden="true"
		/>
	);
}
export default NeuroGrid;