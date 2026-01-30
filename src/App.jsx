import React, { Suspense, lazy } from "react";

import styles from "./App.module.css";
import Navbar from "./components/Navbar";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
      <Navbar />
      <Suspense
        fallback={
          <div className={styles.loader} role="status" aria-live="polite">
            Loading experience…
          </div>
        }
      >
        <main id="main-content" className={styles.main}>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}
