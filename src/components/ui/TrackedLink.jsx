import React, { useCallback } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { trackOutbound } from "../../lib/analytics";

/**
 * Anchor that reports outbound clicks to GA4 and applies the shared
 * hover-lift interaction. External targets get rel="noopener noreferrer"
 * automatically.
 */
export default function TrackedLink({
  href,
  children,
  section,
  component,
  label,
  metadata,
  external,
  onClick,
  lift = true,
  className,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const isExternal =
    external ?? (typeof href === "string" && /^(https?:)?\/\//.test(href));

  const handleClick = useCallback(
    (event) => {
      if (isExternal) {
        trackOutbound({
          url: href,
          label: label || (typeof children === "string" ? children : undefined),
          section,
          component,
          metadata,
        });
      }
      onClick?.(event);
    },
    [isExternal, href, label, children, section, component, metadata, onClick]
  );

  const motionProps =
    prefersReducedMotion || !lift
      ? {}
      : {
          whileHover: { y: -2 },
          whileTap: { scale: 0.97 },
          transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <Motion.a
      href={href}
      className={className}
      onClick={handleClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...motionProps}
      {...rest}
    >
      {children}
    </Motion.a>
  );
}
