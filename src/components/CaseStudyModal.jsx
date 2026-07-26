import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";

import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { trackProject } from "../lib/analytics";
import styles from "./CaseStudyModal.module.css";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Accessible case-study dialog.
 *
 * Rendered through a portal so no transformed ancestor can break `position:
 * fixed`. Traps focus, restores it on close, closes on Escape/backdrop, and
 * locks background scroll without shifting the layout.
 */
export default function CaseStudyModal({ project, labels, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const open = Boolean(project);

  useLockBodyScroll(open);

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    previouslyFocused.current = document.activeElement;

    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const frame = window.requestAnimationFrame(() => {
      const [first] = getFocusable();
      (first ?? dialogRef.current)?.focus();
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
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

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [open, handleClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={styles.root}>
          <Motion.div
            className={styles.backdrop}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            aria-hidden="true"
          />

          <Motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            tabIndex={-1}
            className={styles.dialog}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 32, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            transition={{ duration: 0.34, ease: EASE }}
          >
            <button
              type="button"
              className={styles.close}
              onClick={handleClose}
              aria-label="Close case study"
            >
              <FiX aria-hidden="true" />
            </button>

            <div className={styles.media}>
              <img
                src={project.image}
                alt={project.imageAlt}
                width="1200"
                height="750"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className={styles.body}>
              <header className={styles.header}>
                <p className={styles.meta}>
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </p>
                <h2 id="case-study-title" className={styles.title}>
                  {project.name}
                </h2>
                <p className={styles.subtitle}>{project.subtitle}</p>
              </header>

              <dl className={styles.sections}>
                <div className={styles.block}>
                  <dt className={styles.blockLabel}>{labels.challenge}</dt>
                  <dd className={styles.blockText}>{project.challenge}</dd>
                </div>
                <div className={styles.block}>
                  <dt className={styles.blockLabel}>{labels.solution}</dt>
                  <dd className={styles.blockText}>{project.solution}</dd>
                </div>
                <div className={styles.block}>
                  <dt className={styles.blockLabel}>{labels.outcome}</dt>
                  <dd className={styles.blockText}>{project.outcome}</dd>
                </div>
                <div className={styles.block}>
                  <dt className={styles.blockLabel}>{labels.techStack}</dt>
                  <dd className={styles.blockText}>{project.techStack}</dd>
                </div>
              </dl>

              <div className={styles.metrics}>
                {project.metrics.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <span className={styles.metricValue}>{metric.value}</span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btnPrimary"
                  onClick={() =>
                    trackProject("live_demo_click", project.name, {
                      component: "case_study_modal",
                      destination_url: project.live,
                    })
                  }
                >
                  <FiExternalLink aria-hidden="true" />
                  Live demo
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btnSecondary"
                  onClick={() =>
                    trackProject("github_click", project.name, {
                      component: "case_study_modal",
                      destination_url: project.repo,
                    })
                  }
                >
                  <FiGithub aria-hidden="true" />
                  View source
                </a>
              </div>
            </div>
          </Motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
