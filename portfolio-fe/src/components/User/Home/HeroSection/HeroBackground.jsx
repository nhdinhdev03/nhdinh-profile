import React from "react";
import { motion } from "framer-motion";
import NeuroGrid from "components/User/Home/NeuroGrid/NeuroGrid";

function HeroBackground({ heroRef, isLoaded, isMobile = false }) {
  // Giảm particles cho mobile để tối ưu performance
  const particleCount = isMobile ? 8 : 25; 
  const floatElementCount = isMobile ? 3 : 6; // Giảm floating elements cho mobile
  
  return (
    <div className="hero__bg" aria-hidden="true">
      {/* Particles - Tối ưu cho mobile */}
      <div className="hero__particles">
        {[...Array(particleCount)].map((_, i) => (
          <div
            key={i}
            className={`hero__particle ${isMobile ? 'mobile-static' : ''}`}
            style={{
              "--size": `${Math.random() * (isMobile ? 4 : 8) + 2}px`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--duration": `${isMobile ? '999999s' : Math.random() * 20 + 15 + 's'}`, // Tĩnh hoàn toàn cho mobile
              "--delay": `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Hiển thị NeuroGrid cho mobile nhưng tĩnh */}
      <NeuroGrid parentRef={heroRef} isMobile={isMobile} />

      {/* Enhanced Geometric Pattern Overlay */}
      <div className="hero__patterns">
        <div className="geometric-grid"></div>
        <div className="floating-elements">
          {[...Array(floatElementCount)].map((_, i) => (
            <motion.div
              key={i}
              className={`float-elem float-elem--${i + 1} ${isMobile ? 'mobile-static' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isLoaded ? (isMobile ? 0.3 : 0.7) : 0, // Giảm opacity cho mobile để tinh tế hơn
                scale: isLoaded ? 1 : 0.8,
              }}
              transition={{
                duration: isMobile ? 0.3 : 1.2, // Rất nhanh cho mobile
                delay: isMobile ? 0 : 0.1 + i * 0.15, // Không delay cho mobile
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Gradient Overlay with enhanced visuals */}
      <div className="hero__gradient-overlay">
        <div className="hero__light-beam"></div>
      </div>

      {/* Code snippet decorative elements - Chỉ hiển thị trên desktop */}
      {!isMobile && (
        <div className="code-snippets-container">
          <div className="code-snippet code-snippet--left">
            <div className="code-line">const profile = {`{`}</div>
            <div className="code-line code-indent">
              name: <span className="code-string">"Nhdinh"</span>,
            </div>
            <div className="code-line code-indent">
              role: <span className="code-string">"Web Developer"</span>,
            </div>
            <div className="code-line code-indent">
              expertise:{" "}
              <span className="code-array">
                ["React", "Java", "TypeScript"]
              </span>
              ,
            </div>
            <div className="code-line code-indent">
              passion:{" "}
              <span className="code-string">
                "Building exceptional digital"
              </span>
            </div>
            <div className="code-line">{`}`};</div>
          </div>

          <div className="code-snippet code-snippet--right">
            <div className="code-line">
              <span className="code-keyword">function</span>{" "}
              <span className="code-fn">developProduct</span>() {`{`}
            </div>
            <div className="code-line code-indent">
              <span className="code-keyword">const</span> result = creative &&
              reliable && efficient;
            </div>
            <div className="code-line code-indent">
              <span className="code-keyword">return</span> result;
            </div>
            <div className="code-line">{`}`}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroBackground;
