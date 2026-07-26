import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, itemVariants } from "./motionTokens";

/**
 * Scroll-reveal wrapper. Animates once, respects prefers-reduced-motion,
 * and only animates transform/opacity so it stays off the layout path.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  duration = 0.6,
  amount = 0.2,
  once = true,
  className,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers the entrance of its <RevealItem> children. */
export function Stagger({
  children,
  as = "div",
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  once = true,
  className,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return (
      <MotionTag className={className} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <Stagger>. */
export function RevealItem({ children, as = "div", className, ...rest }) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={prefersReducedMotion ? undefined : itemVariants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
