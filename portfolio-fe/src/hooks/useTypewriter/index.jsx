import { useEffect, useMemo, useState } from "react";

/**
 * Custom hook for typewriter animation effect
 * @param {string[]} words - Array of words to display in typewriter effect
 * @param {number} speed - Speed of typing in milliseconds
 * @param {number} pause - Pause time between words in milliseconds
 * @returns {string} - Current text state of the typewriter
 */
function useTypewriter(words = [], speed = 80, pause = 1200) {
  const seq = useMemo(() => (Array.isArray(words) ? words : []), [words]);
  const [index, setIndex] = useState(0); // which word
  const [subIndex, setSubIndex] = useState(0); // how many chars
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (seq.length === 0) return;
    const current = seq[index % seq.length] ?? "";
    const atWordEnd = !deleting && subIndex === current.length;
    const atWordStart = deleting && subIndex === 0;

    const timeout = setTimeout(
      () => {
        if (atWordEnd) {
          setDeleting(true);
        } else if (atWordStart) {
          setDeleting(false);
          setIndex((i) => (i + 1) % seq.length);
        } else {
          setSubIndex((s) => s + (deleting ? -1 : 1));
        }
      },
      atWordEnd ? pause : deleting ? Math.max(40, speed / 2) : speed
    );

    setText(current.slice(0, subIndex));
    return () => clearTimeout(timeout);
  }, [seq, index, subIndex, deleting, speed, pause]);

  return text;
}

export default useTypewriter;
