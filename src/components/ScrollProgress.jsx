import React from "react";
import { motion as Motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import styles from "./ScrollProgress.module.css";

/**
 * Reading-progress bar pinned above the navbar. Purely decorative — hidden
 * from assistive tech and driven entirely on the compositor.
 */
export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <Motion.div
      className={styles.bar}
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}
