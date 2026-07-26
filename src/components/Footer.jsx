import React, { memo } from "react";
import {
  FiArrowUp,
  FiDribbble,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

import { getFooter, getNavigation, getPersonal, getSocial } from "../data";
import {
  CATEGORY,
  trackEvent,
  trackNavigation,
  trackOutbound,
} from "../lib/analytics";
import styles from "./Footer.module.css";

const iconMap = {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiDribbble,
};

function Footer() {
  const footer = getFooter();
  const personal = getPersonal();
  const social = getSocial();
  const nav = getNavigation();

  const copyright = footer.copyright
    .replace("{year}", new Date().getFullYear())
    .replace("{name}", personal.name);

  const scrollToTop = () => {
    trackEvent({
      action: "back_to_top",
      category: CATEGORY.NAVIGATION,
      label: "footer",
      metadata: { section: "footer", component: "back_to_top" },
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <a
              href="#home"
              className={styles.brand}
              onClick={() =>
                trackNavigation({
                  label: "Brand",
                  target: "#home",
                  component: "footer_brand",
                })
              }
            >
              <span className={styles.brandMark} aria-hidden="true">
                {personal.monogram}
              </span>
              <span>
                {nav.brand.text}
                <span className={styles.brandAccent}>{nav.brand.accent}</span>
              </span>
            </a>
            <p className={styles.availability}>
              <span className={styles.dot} aria-hidden="true" />
              {personal.availabilityStatus}
            </p>
          </div>

          <ul className={styles.social}>
            {social.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`iconButton ${styles.socialLink}`}
                    aria-label={item.ariaLabel}
                    onClick={() =>
                      trackOutbound({
                        url: item.url,
                        label: item.name,
                        section: "footer",
                        component: "footer_social",
                      })
                    }
                  >
                    {Icon && <Icon aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{copyright}</p>
          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FiArrowUp aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
