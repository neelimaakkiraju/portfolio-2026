/** Shared Framer Motion constants. Kept out of component files so fast
 *  refresh stays intact (a module may export components *or* values). */

export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.18,
  base: 0.34,
  slow: 0.6,
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
