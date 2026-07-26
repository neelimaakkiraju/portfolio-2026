import React from "react";
import styles from "./Portrait.module.css";

/**
 * Hero/About visual.
 *
 * If `src` is provided (a real portrait photo) it renders inside the frame.
 * Otherwise it falls back to a self-contained abstract illustration — inline
 * SVG, so there is no network request, no decode cost and zero layout shift.
 *
 * Swapping in a real photo is a one-line data change: set
 * `personal.avatarUrl` in portfolio.json.
 */
export default function Portrait({
  src,
  alt = "",
  monogram = "NA",
  size = 480,
  priority = false,
  className = "",
}) {
  return (
    <div
      className={`${styles.frame} ${className}`}
      style={{ "--portrait-size": `${size}px` }}
    >
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.surface}>
        {src ? (
          <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={styles.photo}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
        ) : (
          <AbstractPortrait monogram={monogram} label={alt} />
        )}
        <div className={styles.sheen} aria-hidden="true" />
      </div>
    </div>
  );
}

function AbstractPortrait({ monogram, label }) {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 480 480"
      role="img"
      aria-label={label || "Abstract portrait illustration"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1c1f" />
          <stop offset="52%" stopColor="#121316" />
          <stop offset="100%" stopColor="#0a0b0c" />
        </linearGradient>

        <radialGradient id="pt-orb" cx="36%" cy="32%" r="74%">
          <stop offset="0%" stopColor="#3a3d42" />
          <stop offset="46%" stopColor="#212429" />
          <stop offset="100%" stopColor="#141518" />
        </radialGradient>

        <linearGradient id="pt-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
        </linearGradient>

        <pattern id="pt-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="480" height="480" fill="url(#pt-bg)" />
      <rect width="480" height="480" fill="url(#pt-grid)" />

      {/* Core form — graphite, with a single accent rim as the only colour */}
      <circle cx="240" cy="228" r="132" fill="url(#pt-orb)" />
      <circle
        cx="240"
        cy="228"
        r="132"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.07"
      />

      {/* Orbital rings */}
      <g className={styles.orbitSlow} style={{ transformOrigin: "240px 228px" }}>
        <ellipse
          cx="240"
          cy="228"
          rx="186"
          ry="78"
          fill="none"
          stroke="url(#pt-ring)"
          strokeWidth="1.25"
          transform="rotate(-24 240 228)"
        />
        <circle cx="60" cy="284" r="4" fill="#5457d6" />
      </g>
      <g className={styles.orbitFast} style={{ transformOrigin: "240px 228px" }}>
        <ellipse
          cx="240"
          cy="228"
          rx="170"
          ry="170"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.06"
          strokeWidth="1"
          strokeDasharray="3 9"
        />
        <circle cx="410" cy="228" r="3" fill="#ffffff" fillOpacity="0.5" />
      </g>

      {/* Monogram */}
      <text
        x="240"
        y="228"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="104"
        fontWeight="700"
        letterSpacing="-4"
        fill="#f4f5f6"
      >
        {monogram}
      </text>

      {/* Signature baseline */}
      <text
        x="240"
        y="400"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14"
        letterSpacing="2.5"
        fill="#9ba0a6"
      >
        build.ship.scale
      </text>
    </svg>
  );
}
