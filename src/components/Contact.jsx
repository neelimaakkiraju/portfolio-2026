import React, { useEffect, useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiDribbble,
} from "react-icons/fi";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { getContact, getPersonal, getSocial } from "../data";
import styles from "./Contact.module.css";

// Icon mapping for dynamic rendering
const iconMap = {
  FiGithub: FiGithub,
  FiLinkedin: FiLinkedin,
  FiTwitter: FiTwitter,
  FiMail: FiMail,
  FiPhone: FiPhone,
  FiMapPin: FiMapPin,
  FiInstagram: FiInstagram,
  FiDribbble: FiDribbble,
};

export default function Contact() {
  const { ref, isVisible } = useRevealOnScroll();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Load data from JSON
  const contactData = getContact();
  const personalData = getPersonal();
  const socialLinks = getSocial();

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim())
      nextErrors.name = contactData.form.fields.name.error;
    if (!form.email.trim()) {
      nextErrors.email = contactData.form.fields.email.error;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = contactData.form.fields.email.invalidError;
    }
    if (!form.message.trim())
      nextErrors.message = contactData.form.fields.message.error;
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setToast({ type: "error", message: contactData.form.errorToast });
      return;
    }

    setErrors({});
    setToast({ type: "success", message: contactData.form.successToast });
    setForm({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className="textCenter">
          <p className="eyebrow">{contactData.eyebrow}</p>
          <h2 id="contact-heading" className="sectionTitle">
            {contactData.title}
          </h2>
          <p className="sectionSubtitle">{contactData.subtitle}</p>
        </div>

        <div className={styles.wrapper}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                {contactData.form.fields.name.label}
              </label>
              <input
                id="name"
                name="name"
                className={styles.input}
                placeholder={contactData.form.fields.name.placeholder}
                value={form.name}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, name: event.target.value }));
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className={styles.error} role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                {contactData.form.fields.email.label}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder={contactData.form.fields.email.placeholder}
                value={form.email}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, email: event.target.value }));
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className={styles.error} role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                {contactData.form.fields.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder={contactData.form.fields.message.placeholder}
                value={form.message}
                onChange={(event) => {
                  setForm((prev) => ({
                    ...prev,
                    message: event.target.value,
                  }));
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span id="message-error" className={styles.error} role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btnPrimary">
              {contactData.form.submitButton}
            </button>
          </form>

          <address className={styles.infoCard}>
            <div className={styles.infoRow}>
              <FiMail aria-hidden="true" />
              <a href={`mailto:${personalData.email}`}>{personalData.email}</a>
            </div>
            <div className={styles.infoRow}>
              <FiPhone aria-hidden="true" />
              <a href={`tel:${personalData.phone.replace(/\s/g, "")}`}>
                {personalData.phone}
              </a>
            </div>
            <div className={styles.infoRow}>
              <FiMapPin aria-hidden="true" />
              <span>{personalData.location}</span>
            </div>
            <p className="sectionSubtitle" style={{ margin: 0 }}>
              {contactData.availability}
            </p>
            <nav className={styles.links} aria-label="Social media links">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="iconButton"
                    aria-label={social.ariaLabel}
                  >
                    {IconComponent && <IconComponent aria-hidden="true" />}
                  </a>
                );
              })}
            </nav>
          </address>
        </div>
      </div>

      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "success" ? styles.toastSuccess : styles.toastError
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}
