import React, { memo } from "react";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiCode,
  FiDatabase,
  FiLayers,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";

import Section from "./ui/Section";
import { RevealItem, Stagger } from "./ui/Reveal";
import { getServices } from "../data";
import { CATEGORY, trackEvent } from "../lib/analytics";
import styles from "./Services.module.css";

const services = getServices();

const iconMap = {
  FiLayers,
  FiZap,
  FiActivity,
  FiCode,
  FiSmartphone,
  FiDatabase,
};

function Services() {
  return (
    <Section
      id="services"
      badge={services.eyebrow}
      title={services.title}
      description={services.subtitle}
      analyticsName="services"
      tone="raised"
    >
      <Stagger className={styles.grid} stagger={0.1}>
        {services.items.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <RevealItem
              key={service.title}
              as="article"
              className={`card cardHover ${styles.card}`}
              onMouseEnter={() =>
                trackEvent({
                  action: "service_hover",
                  category: CATEGORY.ENGAGEMENT,
                  label: service.title,
                  metadata: {
                    section: "services",
                    component: "service_card",
                    service_name: service.title,
                    position: index + 1,
                  },
                })
              }
            >
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.icon} aria-hidden="true">
                {Icon && <Icon />}
              </span>

              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.copy}>{service.description}</p>

              <ul className={styles.outcomes}>
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className={styles.outcome}>
                    <FiCheck aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={styles.cardLink}
                onClick={() =>
                  trackEvent({
                    action: "service_cta_click",
                    category: CATEGORY.CONVERSION,
                    label: service.title,
                    metadata: {
                      section: "services",
                      component: "service_card_cta",
                      service_name: service.title,
                      destination_url: "#contact",
                    },
                  })
                }
              >
                Discuss this
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </RevealItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

export default memo(Services);
