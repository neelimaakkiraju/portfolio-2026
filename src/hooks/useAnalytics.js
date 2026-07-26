import { useEffect, useRef } from "react";
import { trackScrollDepth, trackSectionView } from "../lib/analytics";

const DEPTH_MILESTONES = [25, 50, 75, 100];

/**
 * Fires a scroll_depth event once per milestone (25/50/75/100%) per session.
 * Uses rAF-throttled passive scroll so it never blocks the main thread.
 */
export function useScrollDepth() {
  useEffect(() => {
    const reached = new Set();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;

      for (const milestone of DEPTH_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackScrollDepth(milestone);
        }
      }

      if (reached.size === DEPTH_MILESTONES.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

/**
 * Reports a section_view the first time `name` scrolls meaningfully into view.
 * Returns a ref to attach to the section element.
 */
export function useSectionView(name, { threshold = 0.35, metadata } = {}) {
  const ref = useRef(null);
  const metaRef = useRef(metadata);

  useEffect(() => {
    metaRef.current = metadata;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || !name || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(name, metaRef.current);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [name, threshold]);

  return ref;
}

/**
 * Fires `onImpression` once, the first time the returned ref scrolls into view.
 * Used for card-level view tracking (project impressions, etc.).
 */
export function useImpression(onImpression, { threshold = 0.4 } = {}) {
  const ref = useRef(null);
  const callbackRef = useRef(onImpression);

  useEffect(() => {
    callbackRef.current = onImpression;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callbackRef.current?.();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
