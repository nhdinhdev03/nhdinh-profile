import React from "react";
import { motion } from "framer-motion";
import NeuroGrid from "components/User/Home/NeuroGrid/NeuroGrid";



function HeroBackground({ heroRef, isLoaded }) {
  return (
    <div className="hero__bg" aria-hidden="true">
      {/* Animated Particles */}
      <div className="hero__particles">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="hero__particle"
            style={{
              "--size": `${Math.random() * 8 + 2}px`,
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--duration": `${Math.random() * 20 + 10}s`,
              "--delay": `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <NeuroGrid parentRef={heroRef} />

      {/* Enhanced Geometric Pattern Overlay */}
      <div className="hero__patterns">
        <div className="geometric-grid"></div>
        <div className="floating-elements">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`float-elem float-elem--${i + 1}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isLoaded ? 0.7 : 0,
                scale: isLoaded ? 1 : 0.8,
              }}
              transition={{
                duration: 1.2,
                delay: 0.1 + i * 0.15,
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

      {/* Code snippet decorative elements */}
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
  );
}

export default HeroBackground;
