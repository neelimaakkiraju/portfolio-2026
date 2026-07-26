import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

import styles from "./Navbar.module.css";
import { useActiveSection } from "../hooks/useActiveSection";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { getNavigation, getPersonal } from "../data";
import { trackCta, trackEvent, trackNavigation, CATEGORY } from "../lib/analytics";

const navData = getNavigation();
const personal = getPersonal();
const navItems = navData.links.map((link) => ({
  id: link.href.replace("#", ""),
  label: link.label,
  href: link.href,
}));
const sectionIds = navItems.map((item) => item.id);
const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef(null);
  const menuButtonRef = useRef(null);

  useLockBodyScroll(open);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  const handleNavClick = useCallback(
    (item, component) => {
      trackNavigation({ label: item.label, target: item.href, component });
      setOpen(false);
      scrollToSection(item.id);
    },
    [scrollToSection]
  );

  const handleCtaClick = useCallback(
    (component) => {
      trackCta({
        label: navData.ctaButton.text,
        section: "navbar",
        component,
        destination: navData.ctaButton.href,
      });
      setOpen(false);
      scrollToSection(navData.ctaButton.href.replace("#", ""));
    },
    [scrollToSection]
  );

  /* Elevate the bar once the page has moved off the top. */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 12);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Mobile sheet: Escape to close + focus trap inside the panel. */
  useEffect(() => {
    if (!open) return undefined;

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleMenu = () => {
    setOpen((prev) => {
      trackEvent({
        action: prev ? "mobile_menu_close" : "mobile_menu_open",
        category: CATEGORY.NAVIGATION,
        label: "mobile_menu",
        metadata: { component: "navbar", section: "navbar" },
      });
      return !prev;
    });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <nav className={styles.nav} aria-label="Primary">
        <button
          type="button"
          className={styles.brand}
          onClick={() => handleNavClick({ id: "home", label: "Brand", href: "#home" }, "navbar_brand")}
          aria-label={`${personal.name} — back to top`}
        >
          <span className={styles.brandMark} aria-hidden="true">
            {personal.monogram}
          </span>
          <span className={styles.brandText}>
            {navData.brand.text}
            <span className={styles.brandAccent}>{navData.brand.accent}</span>
          </span>
        </button>

        <ul className={styles.links}>
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item, "navbar_desktop")}
                  className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive && !prefersReducedMotion && (
                    <Motion.span
                      layoutId="nav-pill"
                      className={styles.linkPill}
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.linkLabel}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => handleCtaClick("navbar_cta")}
            className={`btn btnPrimary btnSm ${styles.cta}`}
          >
            {navData.ctaButton.text}
            <FiArrowRight aria-hidden="true" />
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <Motion.div
              className={styles.scrim}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              aria-hidden="true"
            />
            <Motion.div
              id="mobile-navigation"
              ref={panelRef}
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <ul className={styles.sheetLinks}>
                {navItems.map((item, index) => (
                  <Motion.li
                    key={item.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index + 0.06, duration: 0.3, ease: EASE }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item, "navbar_mobile")}
                      className={`${styles.sheetLink} ${
                        activeId === item.id ? styles.sheetLinkActive : ""
                      }`}
                      aria-current={activeId === item.id ? "true" : undefined}
                    >
                      <span>{item.label}</span>
                      <FiArrowRight aria-hidden="true" />
                    </button>
                  </Motion.li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => handleCtaClick("navbar_mobile_cta")}
                className="btn btnPrimary btnBlock"
              >
                {navData.ctaButton.text}
                <FiArrowRight aria-hidden="true" />
              </button>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
