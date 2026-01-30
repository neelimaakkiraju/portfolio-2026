import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.name}>Neelima Akkiraju</p>
        <p className={styles.tagline}>Creating refined digital experiences</p>
        <p className={styles.copy}>© 2026 Neelima Akkiraju. All rights reserved.</p>
      </div>
    </footer>
  );
}
