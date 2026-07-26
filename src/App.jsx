import React, { Suspense, lazy, useEffect } from "react";

import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import { useScrollDepth } from "./hooks/useAnalytics";
import { initEngagementTracking, trackPageView } from "./lib/analytics";

/* Hero stays in the main bundle — it is the LCP element. Everything below the
   fold is split out so first paint carries as little JS as possible. */
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

/* Reserves vertical space while a section loads so nothing shifts. */
function SectionFallback() {
  return (
    <div className={styles.sectionFallback} role="status" aria-live="polite">
      <span className="srOnly">Loading section…</span>
    </div>
  );
}

export default function App() {
  useScrollDepth();

  useEffect(() => {
    trackPageView();
    return initEngagementTracking();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.ambient} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <ScrollProgress />
      <Navbar />

      <main id="main-content" className={styles.main}>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
