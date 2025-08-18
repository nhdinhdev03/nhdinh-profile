import { useEffect, useRef, useState } from "react";

function useVisibility(
  options = { threshold: 0.1, root: null, rootMargin: "0px" }
) {
  const elRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = elRef.current;
    if (!node || visible) return; // if already visible keep it mounted
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options, visible]);

  return [elRef, visible];
}
export default useVisibility;
