import React, { memo } from "react";
import { FiActivity, FiLayers, FiZap, FiCode, FiSmartphone, FiDatabase } from "react-icons/fi";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { getServices } from "../data";
import styles from "./Services.module.css";

const servicesData = getServices();

// Icon mapping for dynamic rendering
const iconMap = {
  FiLayers: <FiLayers />,
  FiZap: <FiZap />,
  FiActivity: <FiActivity />,
  FiCode: <FiCode />,
  FiSmartphone: <FiSmartphone />,
  FiDatabase: <FiDatabase />,
};

function Services() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <header className="textCenter">
          <p className="eyebrow">{servicesData.eyebrow}</p>
          <h2 id="services-title" className="sectionTitle">{servicesData.title}</h2>
          <p className="sectionSubtitle">{servicesData.subtitle}</p>
        </header>

        <div className={styles.grid}>
          {servicesData.items.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                {iconMap[service.icon]}
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.copy}>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Services);
