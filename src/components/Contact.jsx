import React, { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import styles from "./Contact.module.css";

export default function Contact() {
  const { ref, isVisible } = useRevealOnScroll();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) nextErrors.message = "Please share your message.";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setToast({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setErrors({});
    setToast({ type: "success", message: "Message sent successfully." });
    setForm({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <section id="contact" className="section">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className="textCenter">
          <p className="eyebrow">Contact</p>
          <h2 className="sectionTitle">Let&apos;s build something great</h2>
          <p className="sectionSubtitle">
            Have a project in mind? Send a message and I&apos;ll get back within 24
            hours.
          </p>
        </div>

        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                className={styles.input}
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
                <span id="name-error" className={styles.error}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
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
                <span id="email-error" className={styles.error}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                value={form.message}
                onChange={(event) => {
                  setForm((prev) => ({ ...prev, message: event.target.value }));
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span id="message-error" className={styles.error}>
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btnPrimary">
              Send Message
            </button>
          </form>

          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <FiMail />
              <a href="mailto:neelimaakkiraju2001@gmail.com">
                neelimaakkiraju2001@gmail.com
              </a>
            </div>
            <div className={styles.infoRow}>
              <FiPhone />
              <span>+91 6281649948</span>
            </div>
            <p className="sectionSubtitle" style={{ margin: 0 }}>
              Based in India · Open to remote opportunities.
            </p>
            <div className={styles.links}>
              <a
                href="https://www.linkedin.com/in/akkirajuneelima/"
                target="_blank"
                rel="noreferrer"
                className="iconButton"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="https://github.com/neelimaakkiraju"
                target="_blank"
                rel="noreferrer"
                className="iconButton"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
            </div>
          </div>
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
