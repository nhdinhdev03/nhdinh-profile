import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";
import "./LoadingFallback.scss";

const LoadingFallback = memo(
  ({ theme = "dark", loadingText = "Loading", progress = null }) => {
    const [currentText, setCurrentText] = useState(loadingText);
    const [dotCount, setDotCount] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [progressValue, setProgressValue] = useState(0);

    // Mount animation
    useEffect(() => {
      setMounted(true);
    }, []);

    // Animated loading text effect
    useEffect(() => {
      const interval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4);
      }, 400);
      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      setCurrentText(loadingText + ".".repeat(dotCount));
    }, [loadingText, dotCount]);

    // Smooth progress animation
    useEffect(() => {
      if (progress !== null) {
        const targetProgress = Math.min(100, Math.max(0, progress));
        const duration = 300;
        const steps = 30;
        const increment = (targetProgress - progressValue) / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;
          if (currentStep >= steps) {
            setProgressValue(targetProgress);
            clearInterval(interval);
          } else {
            setProgressValue((prev) => prev + increment);
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }
    }, [progress]);

    // Generate wave particles
    const generateWaveParticles = useCallback(() => {
      return [...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`loading-spinner__wave loading-spinner__wave--${i + 1}`}
          style={{ "--delay": `${i * 0.1}s` }}
        />
      ));
    }, []);

    // Generate orbit particles
    const generateOrbitParticles = useCallback(() => {
      return [...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`loading-orbit__particle loading-orbit__particle--${
            i + 1
          }`}
          style={{
            "--angle": `${(360 / 20) * i}deg`,
            "--delay": `${i * 0.15}s`,
          }}
        />
      ));
    }, []);

    return (
      <div
        className={`loading-fallback ${
          theme === "light" ? "theme-light" : ""
        } ${mounted ? "mounted" : ""}`}
      >
        {/* Animated Background Grid */}
        <div className="loading-bg">
          <div className="loading-bg__grid"></div>
          <div className="loading-bg__gradient loading-bg__gradient--1"></div>
          <div className="loading-bg__gradient loading-bg__gradient--2"></div>
          <div className="loading-bg__gradient loading-bg__gradient--3"></div>
        </div>

        {/* Floating Orbs */}
        <div className="loading-orbs">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`loading-orbs__orb loading-orbs__orb--${i + 1}`}
            ></div>
          ))}
        </div>

        <div className="loading-content">
          {/* Enhanced Brand Section with 3D effect */}
          <div className="loading-brand">
            <div className="loading-brand__icon-wrapper">
              <div className="loading-brand__icon">
                <div className="loading-brand__icon-inner">
                  <span className="loading-brand__icon-text">NH</span>
                  <div className="loading-brand__icon-glow"></div>
                </div>
                <div className="loading-brand__icon-ring loading-brand__icon-ring--1"></div>
                <div className="loading-brand__icon-ring loading-brand__icon-ring--2"></div>
                <div className="loading-brand__icon-ring loading-brand__icon-ring--3"></div>
              </div>
            </div>
            <div className="loading-brand__text">
              <h1 className="loading-brand__title">
                <span className="loading-brand__title-letter">n</span>
                <span className="loading-brand__title-letter">h</span>
                <span className="loading-brand__title-letter">d</span>
                <span className="loading-brand__title-letter">i</span>
                <span className="loading-brand__title-letter">n</span>
                <span className="loading-brand__title-letter">h</span>
              </h1>
              <p className="loading-brand__subtitle">
                <span>P</span>
                <span>o</span>
                <span>r</span>
                <span>t</span>
                <span>f</span>
                <span>o</span>
                <span>l</span>
                <span>i</span>
                <span>o</span>
              </p>
            </div>
          </div>

          {/* Ultra Modern Multi-Layer Spinner */}
          <div className="loading-spinner-container">
            {/* Orbit System */}
            <div className="loading-orbit">
              <div className="loading-orbit__ring loading-orbit__ring--outer"></div>
              <div className="loading-orbit__ring loading-orbit__ring--middle"></div>
              <div className="loading-orbit__ring loading-orbit__ring--inner"></div>
              <div className="loading-orbit__particles">
                {generateOrbitParticles()}
              </div>
            </div>

            {/* Main Spinner */}
            <div className="loading-spinner">
              <div className="loading-spinner__outer">
                <div className="loading-spinner__middle">
                  <div className="loading-spinner__inner">
                    <div className="loading-spinner__core">
                      <div className="loading-spinner__core-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wave effect */}
              <div className="loading-spinner__waves">
                {generateWaveParticles()}
              </div>

              {/* Energy particles */}
              <div className="loading-spinner__energy">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`loading-spinner__energy-particle loading-spinner__energy-particle--${
                      i + 1
                    }`}
                    style={{ "--rotation": `${(360 / 8) * i}deg` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Loading Text with Glitch Effect */}
          <div className="loading-text">
            <span className="loading-text__main" data-text={currentText}>
              {currentText}
            </span>
            <span className="loading-text__sub">
              <span className="loading-text__sub-icon">✨</span>
              Crafting your digital experience
              <span className="loading-text__sub-icon">✨</span>
            </span>
          </div>

          {/* Enhanced Progress Bar with Percentage Display */}
          {progress !== null && (
            <div className="loading-progress">
              <div className="loading-progress__container">
                <div className="loading-progress__bar">
                  <div
                    className="loading-progress__fill"
                    style={{ width: `${progressValue}%` }}
                  >
                    <div className="loading-progress__fill-glow"></div>
                    <div className="loading-progress__fill-shimmer"></div>
                  </div>
                  <div className="loading-progress__trail"></div>
                </div>
                <div className="loading-progress__percentage">
                  <span className="loading-progress__number">
                    {Math.round(progressValue)}
                  </span>
                  <span className="loading-progress__symbol">%</span>
                </div>
              </div>
              <div className="loading-progress__status">
                {progressValue < 30 && "Initializing..."}
                {progressValue >= 30 &&
                  progressValue < 60 &&
                  "Loading assets..."}
                {progressValue >= 60 && progressValue < 90 && "Almost there..."}
                {progressValue >= 90 && "Finalizing..."}
              </div>
            </div>
          )}

          {/* Enhanced Decorative Elements */}
          <div className="loading-decorative">
            <div className="loading-decorative__line loading-decorative__line--1"></div>
            <div className="loading-decorative__line loading-decorative__line--2"></div>
            <div className="loading-decorative__line loading-decorative__line--3"></div>
            <div className="loading-decorative__line loading-decorative__line--4"></div>

            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`loading-decorative__dot loading-decorative__dot--${
                  i + 1
                }`}
              ></div>
            ))}

            {/* Corner accents */}
            <div className="loading-decorative__corner loading-decorative__corner--tl"></div>
            <div className="loading-decorative__corner loading-decorative__corner--tr"></div>
            <div className="loading-decorative__corner loading-decorative__corner--bl"></div>
            <div className="loading-decorative__corner loading-decorative__corner--br"></div>
          </div>
        </div>

        {/* Scan line effect */}
        <div className="loading-scanline"></div>
      </div>
    );
  }
);

LoadingFallback.displayName = "LoadingFallback";

LoadingFallback.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  loadingText: PropTypes.string,
  progress: PropTypes.number,
};

export default LoadingFallback;
