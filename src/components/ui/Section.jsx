import React from "react";
import Reveal from "./Reveal";
import { useSectionView } from "../../hooks/useAnalytics";

/**
 * Canonical section shell used by every section on the page so vertical
 * rhythm, container width and header hierarchy stay identical throughout:
 *
 *   badge → title → description → content
 */
export default function Section({
  id,
  badge,
  title,
  description,
  align = "center",
  /** "base" sits on the page canvas, "raised" one tonal step above it.
   *  Alternating the two is what separates sections — not dividers. */
  tone = "base",
  children,
  className = "",
  headerExtra,
  analyticsName,
  labelledBy,
  ...rest
}) {
  const viewRef = useSectionView(analyticsName || id);
  const headingId = labelledBy || (title ? `${id}-title` : undefined);

  return (
    <section
      id={id}
      ref={viewRef}
      className={`section ${tone === "raised" ? "sectionRaised" : ""} ${className}`}
      aria-labelledby={headingId}
      {...rest}
    >
      <div className="container">
        {(badge || title || description) && (
          <Reveal
            as="header"
            className={`sectionHeader ${align === "start" ? "sectionHeaderStart" : ""}`}
          >
            {badge && (
              <p className="badge">
                <span className="badgeDot" aria-hidden="true" />
                {badge}
              </p>
            )}
            {title && (
              <h2 id={headingId} className="sectionTitle">
                {title}
              </h2>
            )}
            {description && <p className="sectionSubtitle">{description}</p>}
            {headerExtra}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
