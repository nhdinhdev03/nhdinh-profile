import { useEffect, useMemo, useState } from "react";

/**
 * Enhanced custom hook for professional typewriter animation effect
 * @param {string[]} words - Array of words to display in typewriter effect
 * @param {object} options - Configuration options for the typewriter
 * @param {number} options.typeSpeed - Speed of typing in milliseconds (higher = slower)
 * @param {number} options.deleteSpeed - Speed of deleting in milliseconds (higher = slower)
 * @param {number} options.delayBetweenWords - Pause time between words in milliseconds
 * @param {number} options.startDelay - Initial delay before starting animation
 * @param {boolean} options.loop - Whether to loop through words continuously
 * @returns {string} - Current text state of the typewriter
 */
function useTypewriter(words = [], options = {}) {
  // Support both new options object and legacy parameters
  const isLegacyParams = typeof options === 'number';
  
  // Default options with improved typing experience
  const {
    typeSpeed = isLegacyParams ? options : 80,
    deleteSpeed = isLegacyParams ? Math.max(40, (options/2)) : 50,
    delayBetweenWords = isLegacyParams ? arguments[2] || 1200 : 1200,
    startDelay = 0,
    loop = true
  } = isLegacyParams ? {} : options;

  const seq = useMemo(() => (Array.isArray(words) ? words : []), [words]);
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // how many chars
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Handle initial delay before starting animation
    if (!started) {
      const initialTimer = setTimeout(() => {
        setStarted(true);
      }, startDelay);
      
      return () => clearTimeout(initialTimer);
    }
    
    if (seq.length === 0 || !started) return;
    
    const current = seq[index % seq.length] ?? "";
    const atWordEnd = !deleting && subIndex === current.length;
    const atWordStart = deleting && subIndex === 0;
    
    // Calculate dynamic speed for more natural typing effect
    // Add slight variation to typing speed for realism
    const variation = Math.random() * 10 - 5; // -5 to +5ms variation
    const currentSpeed = deleting 
      ? deleteSpeed + variation 
      : typeSpeed + variation;

    const timeout = setTimeout(
      () => {
        if (atWordEnd) {
          // Pause at the end of a word before starting to delete
          setDeleting(true);
        } else if (atWordStart) {
          // Move to next word
          setDeleting(false);
          
          // Only increment index if we're looping or not at the end
          if (loop || index < seq.length - 1) {
            setIndex((i) => (i + 1) % seq.length);
          }
        } else {
          setSubIndex((s) => s + (deleting ? -1 : 1));
        }
      },
      atWordEnd ? delayBetweenWords : currentSpeed
    );

    setText(current.slice(0, subIndex));
    return () => clearTimeout(timeout);
  }, [seq, index, subIndex, deleting, typeSpeed, deleteSpeed, delayBetweenWords, started, startDelay, loop]);

  return text;
}

export default useTypewriter;
