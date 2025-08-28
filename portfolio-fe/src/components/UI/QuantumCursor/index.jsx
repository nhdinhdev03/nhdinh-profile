import React, { useEffect, useRef, useCallback } from 'react';
import './QuantumCursor.scss';

const QuantumCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const positionsRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  // Initialize trail positions
  const initializeTrail = useCallback(() => {
    for (let i = 0; i < 8; i++) {
      positionsRef.current[i] = { x: 0, y: 0 };
    }
  }, []);

  // Smooth interpolation function
  const lerp = (start, end, factor) => start + (end - start) * factor;

  // Animation loop
  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Update cursor position
    cursor.style.left = `${targetRef.current.x}px`;
    cursor.style.top = `${targetRef.current.y}px`;

    // Update trail positions with smooth interpolation
    for (let i = 0; i < trailRefs.current.length; i++) {
      const trail = trailRefs.current[i];
      if (!trail) continue;

      const factor = 0.15 - i * 0.015; // Slower for trailing elements
      
      if (i === 0) {
        positionsRef.current[i].x = lerp(positionsRef.current[i].x, targetRef.current.x, factor);
        positionsRef.current[i].y = lerp(positionsRef.current[i].y, targetRef.current.y, factor);
      } else {
        positionsRef.current[i].x = lerp(positionsRef.current[i].x, positionsRef.current[i - 1].x, factor);
        positionsRef.current[i].y = lerp(positionsRef.current[i].y, positionsRef.current[i - 1].y, factor);
      }

      trail.style.left = `${positionsRef.current[i].x}px`;
      trail.style.top = `${positionsRef.current[i].y}px`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
    
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.opacity = '1';
    }
  }, []);

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.classList.add('active');
    }
  }, []);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.classList.remove('active');
    }
  }, []);

  // Handle element hover
  const handleElementHover = useCallback((e) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const target = e.target;
    const isInteractive = target.matches('a, button, input, textarea, select, [role="button"], [onclick], .clickable, .interactive');
    
    if (isInteractive) {
      cursor.classList.add('hover-element');
    } else {
      cursor.classList.remove('hover-element');
    }
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.opacity = '0';
      cursor.classList.remove('hover-element', 'active');
    }
  }, []);

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    initializeTrail();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleElementHover, handleMouseLeave, animate, initializeTrail]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="quantum-cursor" />
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor-trail"
          style={{
            opacity: 0.3 - i * 0.03,
            scale: 1 - i * 0.1,
          }}
        />
      ))}
    </>
  );
};

export default QuantumCursor;
