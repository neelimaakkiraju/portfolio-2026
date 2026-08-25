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

/**
 * Abstract composition standing in for a photo: three layered rounded-rect
 * panels — a "content" card and a mini bar-chart card peeking out behind a
 * front identity panel carrying the monogram. Reads as a small UI/engineering
 * system rather than a generic avatar, and stays legible fanned out at both
 * the hero's large size and About's small one since it's built from a few
 * bold shapes rather than fine detail.
 */
function AbstractPortrait({ monogram, label }) {
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 480 480"
      role="img"
      aria-label={label || "Abstract engineering illustration"}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pt-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1c1f" />
          <stop offset="52%" stopColor="#121316" />
          <stop offset="100%" stopColor="#0a0b0c" />
        </linearGradient>

        <linearGradient id="pt-panel-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34373d" />
          <stop offset="55%" stopColor="#202329" />
          <stop offset="100%" stopColor="#16181c" />
        </linearGradient>

        <linearGradient id="pt-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
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

      {/* Back panel — content/text card peeking from the top right */}
      <g transform="rotate(8 336 128)">
        <rect x="270" y="80" width="132" height="96" rx="20" fill="#1c1f24" stroke="#ffffff" strokeOpacity="0.07" />
        <rect x="292" y="106" width="72" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
        <rect x="292" y="124" width="88" height="6" rx="3" fill="#ffffff" fillOpacity="0.11" />
        <rect x="292" y="142" width="52" height="6" rx="3" fill="#ffffff" fillOpacity="0.11" />
      </g>

      {/* Back panel — mini bar-chart card peeking from the bottom left */}
      <g transform="rotate(-7 161 318)">
        <rect x="86" y="264" width="150" height="108" rx="22" fill="#191c21" stroke="#ffffff" strokeOpacity="0.07" />
        <rect x="112" y="330" width="16" height="24" rx="3" fill="#5457d6" fillOpacity="0.55" />
        <rect x="138" y="316" width="16" height="38" rx="3" fill="#5457d6" fillOpacity="0.75" />
        <rect x="164" y="304" width="16" height="50" rx="3" fill="#5457d6" fillOpacity="0.95" />
        <rect x="190" y="322" width="16" height="32" rx="3" fill="#5457d6" fillOpacity="0.65" />
      </g>

      {/* Front panel — primary mark, always upright and on top */}
      <rect x="140" y="140" width="200" height="200" rx="40" fill="url(#pt-panel-front)" stroke="#ffffff" strokeOpacity="0.1" />

      {/* Alignment tick — small engineering-tool accent at the panel corner */}
      <path
        d="M152 176V152H176"
        fill="none"
        stroke="#5457d6"
        strokeOpacity="0.6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Guide ring — the one retained motion accent, off under reduced-motion */}
      <g className={styles.orbitSlow} style={{ transformOrigin: "240px 240px" }}>
        <circle
          cx="240"
          cy="240"
          r="196"
          fill="none"
          stroke="url(#pt-ring)"
          strokeWidth="1.25"
          strokeDasharray="2 10"
        />
        <circle cx="240" cy="44" r="4" fill="#5457d6" />
      </g>

      {/* Monogram */}
      <text
        x="240"
        y="248"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="92"
        fontWeight="700"
        letterSpacing="-3"
        fill="#f4f5f6"
      >
        {monogram}
      </text>
    </svg>
  );
}
