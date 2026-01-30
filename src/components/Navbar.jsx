import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useActiveSection } from "../hooks/useActiveSection";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(navItems.map((item) => item.id));

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar} aria-label="Primary">
          <button
            className={styles.brand}
            onClick={() => scrollToSection("home")}
            aria-label="Scroll to top"
          >
            Neelima <span className={styles.brandAccent}>Akkiraju</span>
          </button>

          <div className={styles.desktopLinks} role="list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${styles.link} ${
                  activeId === item.id ? styles.linkActive : ""
                }`}
                aria-current={activeId === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className={`btn btnPrimary ${styles.cta}`}
          >
            Let&apos;s Talk
          </button>

          <button
            className={styles.menuButton}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className={styles.menuIcon} />
          </button>
        </nav>
      </div>

      <div
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        onClick={() => setOpen(false)}
        role="presentation"
      >
        <div
          className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.mobileLinks} role="list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${styles.link} ${
                  activeId === item.id ? styles.linkActive : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollToSection("contact")}
            className={`btn btnPrimary ${styles.mobileCta}`}
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </header>
  );
}
