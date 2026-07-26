import React from "react";
import {
  FiClock,
  FiDownload,
  FiDribbble,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiTwitter,
} from "react-icons/fi";

import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import { getContact, getPersonal, getSocial } from "../data";
import {
  CATEGORY,
  trackEvent,
  trackOutbound,
  trackResumeDownload,
} from "../lib/analytics";
import styles from "./Contact.module.css";

const iconMap = {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiDribbble,
};

export default function Contact() {
  const contact = getContact();
  const personal = getPersonal();
  const social = getSocial();

  return (
    <Section
      id="contact"
      badge={contact.eyebrow}
      title={contact.title}
      description={contact.subtitle}
      analyticsName="contact"
    >
      <Reveal className={`card ${styles.panel}`}>
        <div className={styles.statusRow}>
          <p className={styles.availability}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            {personal.availabilityStatus}
          </p>
          <p className={styles.responseTime}>
            <FiClock aria-hidden="true" />
            {personal.responseTime}
          </p>
        </div>

        <a
          href={`mailto:${personal.email}`}
          className={`btn btnPrimary btnLg ${styles.emailCta}`}
          onClick={() =>
            trackEvent({
              action: "email_click",
              category: CATEGORY.CONVERSION,
              label: personal.email,
              metadata: {
                section: "contact",
                component: "contact_actions",
                destination_url: `mailto:${personal.email}`,
              },
            })
          }
        >
          <FiMail aria-hidden="true" />
          {personal.email}
        </a>

        <div className={styles.actionRow}>
          {social.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btnSecondary"
                aria-label={item.ariaLabel}
                onClick={() =>
                  trackOutbound({
                    url: item.url,
                    label: item.name,
                    section: "contact",
                    component: "contact_actions",
                  })
                }
              >
                {Icon && <Icon aria-hidden="true" />}
                {item.name}
              </a>
            );
          })}
          <a
            href={personal.resumeUrl}
            download
            className="btn btnSecondary"
            onClick={() =>
              trackResumeDownload({
                section: "contact",
                component: "contact_actions",
                url: personal.resumeUrl,
              })
            }
          >
            <FiDownload aria-hidden="true" />
            Download résumé
          </a>
        </div>

        <p className={styles.locationRow}>
          <FiMapPin aria-hidden="true" />
          {personal.location} · {personal.timezone}
        </p>
        <p className={styles.note}>{contact.availability}</p>
      </Reveal>
    </Section>
  );
}
