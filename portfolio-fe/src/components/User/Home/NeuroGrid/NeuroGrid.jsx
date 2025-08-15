


import React, { useEffect, useRef } from "react";

 function NeuroGrid({ parentRef, isMobile = false }) {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const roRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;

		const container = canvas.parentElement || canvas;
		const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2); // Giảm DPR cho mobile
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
			// Limit width to 1500px maximum
			const maxWidth = 1500;
			width = Math.min(maxWidth, Math.max(1, rect.width));
			height = Math.max(1, rect.height);
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = width + "px";
			canvas.style.height = height + "px";
			canvas.style.maxWidth = maxWidth + "px";
			canvas.style.margin = "0 auto"; // Center canvas if container is wider than maxWidth
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// derive spacing based on width for consistent density, tối ưu cho mobile
			const baseSpacing = isMobile ? 11 : 12; // Slight increase in spacing for mobile for better performance
			spacing = Math.max(isMobile ? 48 : 56, Math.min(isMobile ? 80 : 100, Math.round(width / baseSpacing)));
			cols = Math.ceil(width / spacing) + 1;
			rows = Math.ceil(height / spacing) + 1;

			// Create a more structured grid with points array
			points = new Array(rows * cols).fill(null);
			
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const idx = y * cols + x;
					
					// Skip some points on mobile for better performance (use a more reliable pattern)
					if (isMobile && ((x + y) % 2 === 1)) {
						continue;
					}
					
					const px = x * spacing + (Math.random() - 0.5) * spacing * (isMobile ? 0.1 : 0.15);
					const py = y * spacing + (Math.random() - 0.5) * spacing * (isMobile ? 0.1 : 0.15);
					const phase = Math.random() * Math.PI * 2;
					points[idx] = {
						ax: px,
						ay: py,
						phase,
					};
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

			// subtle global parallax offset (reduced for mobile)
			const ox = isMobile ? mx * 5 : mx * 10; // Half strength for mobile
			const oy = isMobile ? my * 3 : my * 6;

			// Optimize animation parameters
			// Simplified calculation to avoid nested ternaries
			let amp = 0;
			let speed = 0;
			
			if (!prefersReduced) {
				if (isMobile) {
					amp = Math.min(3, spacing * 0.06); // Further reduced for mobile
					speed = 0.25; // Even slower for better performance
				} else {
					amp = Math.min(8, spacing * 0.12);
					speed = 0.6;
				}
			}
			
			// Điều chỉnh opacity dựa theo light/dark mode và mobile
			const baseAlpha = isLight ? 0.4 : 0.65;
			const mobileAlpha = isMobile ? baseAlpha * 0.8 : baseAlpha; // Tăng opacity cho mobile để rõ hơn
			ctx.globalAlpha = mobileAlpha;

			// Precompute gradient for strokes
			const g = ctx.createLinearGradient(0, 0, width, height);
			g.addColorStop(0, brand);
			g.addColorStop(1, brand2);

			ctx.lineWidth = isMobile ? 1.2 : 1.1; // Slightly thicker lines for mobile
			ctx.strokeStyle = g;
			ctx.globalAlpha = isMobile ? 0.7 : 0.65; // Higher contrast for mobile

			// helper to compute index
			const idx = (x, y) => y * cols + x;

			// draw connections (only right and down to avoid duplicates)
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const p = points[idx(x, y)];
					if (!p) continue;
					const jitter = Math.sin(t * speed + p.phase); // Apply for mobile too
					const px = p.ax + ox + jitter * amp;
					const py = p.ay + oy + Math.cos(t * speed + p.phase) * amp * (isMobile ? 0.4 : 0.6);

					// right neighbor
					if (x + 1 < cols) {
						const pr = points[idx(x + 1, y)];
						if (pr) { // Check if the right neighbor exists
							const jr = Math.sin(t * speed + pr.phase);
							const prx = pr.ax + ox + jr * amp;
							const pry = pr.ay + oy + Math.cos(t * speed + pr.phase) * amp * (isMobile ? 0.4 : 0.6);
							ctx.beginPath();
							ctx.moveTo(px, py);
							ctx.lineTo(prx, pry);
							ctx.stroke();
						}
					}
					// down neighbor
					if (y + 1 < rows) {
						const pd = points[idx(x, y + 1)];
						if (pd) { // Check if the down neighbor exists
							const jd = Math.sin(t * speed + pd.phase);
							const pdx = pd.ax + ox + jd * amp;
							const pdy = pd.ay + oy + Math.cos(t * speed + pd.phase) * amp * (isMobile ? 0.4 : 0.6);
							ctx.beginPath();
							ctx.moveTo(px, py);
							ctx.lineTo(pdx, pdy);
							ctx.stroke();
						}
					}
				}
			}

			// draw nodes lightly on top
			ctx.globalAlpha = isMobile ? 0.8 : 0.75; // Slightly increased opacity for mobile
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const p = points[idx(x, y)];
					if (!p) continue; // Skip if point doesn't exist
					const jitter = Math.sin(t * speed + p.phase); // Apply for mobile too
					const px = p.ax + ox + jitter * amp;
					const py = p.ay + oy + Math.cos(t * speed + p.phase) * amp * (isMobile ? 0.4 : 0.6);
					ctx.beginPath();
					ctx.fillStyle = brand;
					ctx.arc(px, py, isMobile ? 1.5 : 1.2, 0, Math.PI * 2); // Slightly larger nodes for mobile
					ctx.fill();
				}
			}

			// Continue animation for all devices
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
	}, [parentRef, isMobile]);

	return (
		<div className="neuro-grid-container" style={{ maxWidth: '1600px', margin: '0 auto' }}>
			<canvas
				ref={canvasRef}
				className="fx-canvas"
				aria-hidden="true"
				tabIndex="-1" /* Ensures the element is not focusable */
			/>
		</div>
	);
}
export default NeuroGrid;