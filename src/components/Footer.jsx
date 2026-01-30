import React from "react";
import { getFooter, getPersonal, getSocial, getNavigation } from "../data";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiDribbble,
  FiMail,
  FiHeart,
  FiArrowUp,
} from "react-icons/fi";
import styles from "./Footer.module.css";

// Icon mapping for dynamic rendering
const iconMap = {
  FiGithub: FiGithub,
  FiLinkedin: FiLinkedin,
  FiTwitter: FiTwitter,
  FiInstagram: FiInstagram,
  FiDribbble: FiDribbble,
  FiMail: FiMail,
};

export default function Footer() {
  const footerData = getFooter();
  const personalData = getPersonal();
  const socialLinks = getSocial();
  const navData = getNavigation();

  // Generate copyright text with dynamic year
  const currentYear = new Date().getFullYear();
  const copyrightText = footerData.copyright
    .replace("{year}", currentYear)
    .replace("{name}", personalData.name);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.footerContainer}`}>
        {/* Top Section */}
        <div className={styles.topSection}>
          {/* Brand */}
          <div className={styles.brandSection}>
            <a href="#home" className={styles.brand}>
              {navData.brand.text}
              <span className={styles.brandAccent}>{navData.brand.accent}</span>
            </a>
            <p className={styles.tagline}>{footerData.tagline}</p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.linksTitle}>Quick Links</h3>
            <nav className={styles.quickLinks} aria-label="Footer navigation">
              {navData.links.slice(0, 6).map((link) => (
                <a key={link.href} href={link.href} className={styles.quickLink}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.linksTitle}>Get in Touch</h3>
            <div className={styles.contactInfo}>
              <a href={`mailto:${personalData.email}`} className={styles.contactLink}>
                <FiMail aria-hidden="true" />
                <span>{personalData.email}</span>
              </a>
              <p className={styles.location}>{personalData.location}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          {/* Copyright */}
          <p className={styles.copy}>
            {copyrightText.replace("©", "")}
            <span className={styles.madeWith}>
              Made with <FiHeart className={styles.heartIcon} aria-label="love" /> 
            </span>
          </p>

          {/* Social Links */}
          <nav className={styles.socialLinks} aria-label="Social media links">
            {socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.socialLink}
                  aria-label={social.ariaLabel}
                >
                  {IconComponent && <IconComponent aria-hidden="true" />}
                </a>
              );
            })}
          </nav>

          {/* Back to Top */}
          <button
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
