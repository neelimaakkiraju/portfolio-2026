import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Toggle visibility whenever the element enters/leaves the viewport
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
