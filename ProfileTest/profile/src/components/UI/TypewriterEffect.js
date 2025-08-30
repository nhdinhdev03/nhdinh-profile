import React, { useEffect, useState } from 'react';

const TypewriterEffect = ({ strings, autoStart = true, loop = true, delay = 2000 }) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!autoStart || strings.length === 0) return;

    const currentString = strings[currentStringIndex];
    
    const typeSpeed = isDeleting ? 50 : 100;
    const waitTime = isDeleting ? 50 : delay;

    const timer = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false);
        setIsDeleting(true);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.slice(0, currentText.length + 1));
        } else {
          // Finished typing current string
          if (loop || currentStringIndex < strings.length - 1) {
            setIsWaiting(true);
          }
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting
          setIsDeleting(false);
          setCurrentStringIndex((prev) => 
            loop ? (prev + 1) % strings.length : Math.min(prev + 1, strings.length - 1)
          );
        }
      }
    }, isWaiting ? waitTime : typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isWaiting, currentStringIndex, strings, autoStart, loop, delay]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse ml-1 text-blue-400">|</span>
    </span>
  );
};

export default TypewriterEffect;
