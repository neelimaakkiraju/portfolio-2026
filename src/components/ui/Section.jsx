import React from "react";
import Reveal from "./Reveal";
import { useSectionView } from "../../hooks/useAnalytics";

/**
 * Section shell with left-aligned header hierarchy:
 *   badge → title → description → content
 */
export default function Section({
  id,
  badge,
  title,
  description,
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
            className="sectionHeader"
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
