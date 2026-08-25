import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiDribbble,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiTwitter,
} from "react-icons/fi";

import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { getContact, getPersonal, getSocial } from "../data";
import { trackEvent, trackForm, trackOutbound, CATEGORY } from "../lib/analytics";
import styles from "./Contact.module.css";

const iconMap = {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiDribbble,
};

const FIELDS = ["name", "email", "message"];

export default function Contact() {
  const contact = getContact();
  const personal = getPersonal();
  const social = getSocial();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toast, setToast] = useState(null);
  const startedRef = useRef(false);
  const fieldRefs = useRef({});

  /* ---- validation (unchanged rules) ---- */
  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = contact.form.fields.name.error;
    if (!form.email.trim()) {
      nextErrors.email = contact.form.fields.email.error;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = contact.form.fields.email.invalidError;
    }
    if (!form.message.trim())
      nextErrors.message = contact.form.fields.message.error;
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    trackForm("form_submit", {
      has_errors: Object.keys(validationErrors).length > 0,
      error_count: Object.keys(validationErrors).length,
    });

    if (Object.keys(validationErrors).length > 0) {
      setToast({ type: "error", message: contact.form.errorToast });
      trackForm("form_error", {
        error_fields: Object.keys(validationErrors).join(","),
      });
      const firstInvalid = FIELDS.find((field) => validationErrors[field]);
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setErrors({});
    setTouched({});
    setToast({ type: "success", message: contact.form.successToast });
    setForm({ name: "", email: "", message: "" });
    startedRef.current = false;
    trackForm("form_success", { message_length: form.message.length });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  /* ---- field wiring ---- */
  const handleFocus = useCallback((field) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackForm("form_start", { field });
    }
    trackForm("form_field_focus", { field });
  }, []);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  /* Validate on blur so users get feedback before they hit submit. */
  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validate()[field];
    setErrors((prev) => ({ ...prev, [field]: fieldError }));
    if (fieldError) {
      trackForm("form_validation_error", { field, error_message: fieldError });
    }
  };

  const renderField = (field, { as = "input", type = "text", autoComplete } = {}) => {
    const config = contact.form.fields[field];
    const hasError = Boolean(errors[field]);
    const isValid = touched[field] && !hasError && form[field].trim();
    const Tag = as;

    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={field}>
          {config.label}
        </label>

        <div className={styles.controlWrap}>
          <Tag
            id={field}
            name={field}
            type={as === "input" ? type : undefined}
            ref={(node) => {
              fieldRefs.current[field] = node;
            }}
            className={`${as === "input" ? styles.input : styles.textarea} ${
              hasError ? styles.controlError : ""
            } ${isValid ? styles.controlValid : ""}`}
            placeholder={config.placeholder}
            value={form[field]}
            autoComplete={autoComplete}
            onChange={handleChange(field)}
            onFocus={() => handleFocus(field)}
            onBlur={handleBlur(field)}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${field}-error` : undefined}
          />
          {isValid && (
            <FiCheckCircle className={styles.validIcon} aria-hidden="true" />
          )}
        </div>

        <AnimatePresence>
          {hasError && (
            <Motion.span
              id={`${field}-error`}
              className={styles.error}
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <FiAlertCircle aria-hidden="true" />
              {errors[field]}
            </Motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Section
      id="contact"
      badge={contact.eyebrow}
      title={contact.title}
      description={contact.subtitle}
      analyticsName="contact"
    >
      <div className={styles.grid}>
        {/* ── Info panel ───────────────────────────────────── */}
        <Reveal className={styles.info}>
          <div className={styles.availabilityBlock}>
            <p className={styles.availability}>
              <span className={styles.availabilityDot} aria-hidden="true" />
              {personal.availabilityStatus}
            </p>
            <p className={styles.responseTime}>
              <FiClock aria-hidden="true" />
              {personal.responseTime}
            </p>
            <p className={styles.availabilityNote}>{personal.availability}</p>
          </div>

          <div>
            <h3 className={styles.blockTitle}>{contact.detailsTitle}</h3>
            <address className={styles.details}>
              <a
                href={`mailto:${personal.email}`}
                className={styles.detailRow}
                onClick={() =>
                  trackEvent({
                    action: "email_click",
                    category: CATEGORY.CONVERSION,
                    label: personal.email,
                    metadata: {
                      section: "contact",
                      component: "contact_details",
                      destination_url: `mailto:${personal.email}`,
                    },
                  })
                }
              >
                <span className={styles.detailIcon} aria-hidden="true">
                  <FiMail />
                </span>
                <span>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{personal.email}</span>
                </span>
              </a>

              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                className={styles.detailRow}
                onClick={() =>
                  trackEvent({
                    action: "phone_click",
                    category: CATEGORY.CONVERSION,
                    label: personal.phone,
                    metadata: { section: "contact", component: "contact_details" },
                  })
                }
              >
                <span className={styles.detailIcon} aria-hidden="true">
                  <FiPhone />
                </span>
                <span>
                  <span className={styles.detailLabel}>Phone</span>
                  <span className={styles.detailValue}>{personal.phone}</span>
                </span>
              </a>

              <p className={styles.detailRow}>
                <span className={styles.detailIcon} aria-hidden="true">
                  <FiMapPin />
                </span>
                <span>
                  <span className={styles.detailLabel}>Location</span>
                  <span className={styles.detailValue}>
                    {personal.location} · {personal.timezone}
                  </span>
                </span>
              </p>
            </address>
          </div>

          <div>
            <h3 className={styles.blockTitle}>{contact.socialTitle}</h3>
            <nav className={styles.social} aria-label="Social profiles">
              {social.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="iconButton"
                    aria-label={`${item.name} (opens in a new tab)`}
                    onClick={() =>
                      trackOutbound({
                        url: item.url,
                        label: item.name,
                        section: "contact",
                        component: "social_links",
                      })
                    }
                  >
                    {Icon && <Icon aria-hidden="true" />}
                  </a>
                );
              })}
            </nav>
          </div>
        </Reveal>

        {/* ── Form ─────────────────────────────────────────── */}
        <Reveal delay={0.08} className={`card ${styles.formCard}`}>
          <header className={styles.formHeader}>
            <h3 className={styles.formTitle}>{contact.form.title}</h3>
            <p className={styles.formSubtitle}>{contact.form.subtitle}</p>
          </header>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Contact form"
          >
            {renderField("name", { autoComplete: "name" })}
            {renderField("email", { type: "email", autoComplete: "email" })}
            {renderField("message", { as: "textarea" })}

            <button type="submit" className="btn btnPrimary btnLg btnBlock">
              <FiSend aria-hidden="true" />
              {contact.form.submitButton}
            </button>

            <p className={styles.formFooter}>
              Prefer email? Write to{" "}
              <a href={`mailto:${personal.email}`} className={styles.inlineLink}>
                {personal.email}
              </a>
            </p>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {toast && (
          <Motion.div
            className={`${styles.toast} ${
              toast.type === "success" ? styles.toastSuccess : styles.toastError
            }`}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {toast.type === "success" ? (
              <FiCheckCircle aria-hidden="true" />
            ) : (
              <FiAlertCircle aria-hidden="true" />
            )}
            {toast.message}
          </Motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
