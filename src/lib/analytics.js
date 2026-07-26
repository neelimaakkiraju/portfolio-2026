/**
 * GA4 analytics utility.
 *
 * Single entry point for every tracked interaction on the site. Safe to call
 * anywhere: if gtag has not loaded (dev server, ad blocker, prerender) events
 * are buffered and flushed once it appears, and dropped after a grace period
 * so the buffer can never grow unbounded.
 */

export const GA_MEASUREMENT_ID = "G-ETM3CTTMGP";

/** Stable category names so reports group cleanly in GA4. */
export const CATEGORY = {
  NAVIGATION: "navigation",
  ENGAGEMENT: "engagement",
  CONVERSION: "conversion",
  PROJECT: "project",
  CONTACT: "contact",
  OUTBOUND: "outbound",
  SOCIAL: "social",
  CONTENT: "content",
};

const isBrowser = typeof window !== "undefined";
const DEBUG =
  isBrowser && typeof import.meta !== "undefined" && import.meta.env?.DEV;

/* GA4 limits: param name <= 40 chars, string value <= 100 chars, 25 params. */
const MAX_PARAM_NAME = 40;
const MAX_PARAM_VALUE = 100;
const MAX_PARAMS = 25;

const RESERVED_PARAMS = new Set([
  "event_category",
  "event_label",
  "value",
  "page_location",
  "page_title",
  "page_referrer",
]);

const buffer = [];
const MAX_BUFFER = 50;
let flushTimer = null;
let flushAttempts = 0;

function hasGtag() {
  return isBrowser && typeof window.gtag === "function";
}

/** Normalise an arbitrary key into a valid GA4 parameter name. */
function toParamName(key) {
  return String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^[^a-z]+/, "")
    .slice(0, MAX_PARAM_NAME);
}

function toParamValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value).slice(0, MAX_PARAM_VALUE);
}

/** Viewport-derived device bucket, matching the CSS breakpoints. */
export function getDeviceType() {
  if (!isBrowser) return "unknown";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function baseContext() {
  if (!isBrowser) return {};
  return {
    device_type: getDeviceType(),
    viewport_width: window.innerWidth,
    page_path: window.location.pathname + window.location.hash,
    timestamp: new Date().toISOString(),
  };
}

function send(name, params) {
  if (hasGtag()) {
    window.gtag("event", name, params);
    if (DEBUG) console.debug("[analytics]", name, params);
    return true;
  }
  return false;
}

function scheduleFlush() {
  if (flushTimer !== null || !isBrowser) return;
  flushTimer = window.setInterval(() => {
    flushAttempts += 1;

    if (hasGtag()) {
      while (buffer.length) {
        const { name, params } = buffer.shift();
        send(name, params);
      }
    }

    // Give gtag ~10s to arrive, then stop retrying and release the buffer.
    if (!buffer.length || flushAttempts > 20) {
      buffer.length = 0;
      window.clearInterval(flushTimer);
      flushTimer = null;
    }
  }, 500);
}

/**
 * Core tracking call.
 *
 * @param {object}  event
 * @param {string}  event.action    GA4 event name, e.g. "cta_click".
 * @param {string} [event.category] One of CATEGORY.
 * @param {string} [event.label]    Human-readable identifier.
 * @param {number} [event.value]    Numeric value for the event.
 * @param {object} [event.metadata] Extra context (section, component, url, …).
 */
export function trackEvent({ action, category, label, value, metadata } = {}) {
  if (!isBrowser || !action) return;

  const params = { ...baseContext() };

  if (category) params.event_category = category;
  if (label !== undefined && label !== null) params.event_label = toParamValue(label);
  if (typeof value === "number" && Number.isFinite(value)) params.value = value;

  if (metadata && typeof metadata === "object") {
    for (const [key, raw] of Object.entries(metadata)) {
      if (raw === undefined || raw === null || raw === "") continue;
      const name = toParamName(key);
      if (!name || RESERVED_PARAMS.has(name)) continue;
      if (Object.keys(params).length >= MAX_PARAMS) break;
      params[name] = toParamValue(raw);
    }
  }

  const eventName = toParamName(action) || "custom_event";

  if (!send(eventName, params)) {
    if (buffer.length < MAX_BUFFER) buffer.push({ name: eventName, params });
    scheduleFlush();
  }
}

/* ------------------------------------------------------------------ */
/* Named helpers — thin wrappers so call sites stay declarative.       */
/* ------------------------------------------------------------------ */

export function trackPageView(metadata = {}) {
  if (!isBrowser) return;
  trackEvent({
    action: "page_view_custom",
    category: CATEGORY.ENGAGEMENT,
    label: document.title,
    metadata: {
      referrer: document.referrer || "direct",
      language: navigator.language,
      screen_width: window.screen?.width,
      ...metadata,
    },
  });
}

export function trackSectionView(section, metadata = {}) {
  trackEvent({
    action: "section_view",
    category: CATEGORY.CONTENT,
    label: section,
    metadata: { section, ...metadata },
  });
}

export function trackScrollDepth(percent) {
  trackEvent({
    action: "scroll_depth",
    category: CATEGORY.ENGAGEMENT,
    label: `${percent}%`,
    value: percent,
    metadata: { percent_scrolled: percent },
  });
}

export function trackCta({ label, section, component, destination, metadata }) {
  trackEvent({
    action: "cta_click",
    category: CATEGORY.CONVERSION,
    label,
    metadata: {
      button_text: label,
      section,
      component,
      destination_url: destination,
      ...metadata,
    },
  });
}

export function trackNavigation({ label, target, component = "navbar" }) {
  trackEvent({
    action: "nav_click",
    category: CATEGORY.NAVIGATION,
    label,
    metadata: { component, link_text: label, destination_url: target },
  });
}

export function trackOutbound({ url, label, section, component, metadata }) {
  const isSocial = /github|linkedin|twitter|x\.com|dribbble|instagram/i.test(
    url || ""
  );
  let host = "";
  try {
    host = new URL(url, window.location.href).hostname;
  } catch {
    host = "unknown";
  }
  trackEvent({
    action: "outbound_click",
    category: isSocial ? CATEGORY.SOCIAL : CATEGORY.OUTBOUND,
    label: label || host,
    metadata: {
      destination_url: url,
      destination_host: host,
      link_text: label,
      section,
      component,
      ...metadata,
    },
  });
}

export function trackResumeDownload({ section, component, url }) {
  trackEvent({
    action: "resume_download",
    category: CATEGORY.CONVERSION,
    label: "resume",
    metadata: { section, component, destination_url: url },
  });
}

export function trackProject(action, project, metadata = {}) {
  trackEvent({
    action,
    category: CATEGORY.PROJECT,
    label: project,
    metadata: { project_name: project, section: "projects", ...metadata },
  });
}

export function trackForm(action, metadata = {}) {
  trackEvent({
    action,
    category: CATEGORY.CONTACT,
    label: metadata.field || "contact_form",
    metadata: { section: "contact", component: "contact_form", ...metadata },
  });
}

/**
 * Session engagement: reports total visible time when the user leaves or
 * backgrounds the tab. Returns a cleanup function.
 */
export function initEngagementTracking() {
  if (!isBrowser) return () => {};

  let activeSince = document.visibilityState === "visible" ? Date.now() : null;
  let engagedMs = 0;
  let reported = false;

  const accumulate = () => {
    if (activeSince !== null) {
      engagedMs += Date.now() - activeSince;
      activeSince = null;
    }
  };

  const report = (reason) => {
    accumulate();
    const seconds = Math.round(engagedMs / 1000);
    if (reported || seconds < 3) return;
    reported = true;
    trackEvent({
      action: "session_engagement",
      category: CATEGORY.ENGAGEMENT,
      label: reason,
      value: seconds,
      metadata: { engagement_seconds: seconds, exit_reason: reason },
    });
  };

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      report("hidden");
    } else {
      activeSince = Date.now();
      reported = false;
    }
  };

  const onPageHide = () => report("pagehide");

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);

  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
  };
}

export default trackEvent;
