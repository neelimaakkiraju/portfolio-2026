import React, { memo } from "react";
import { FiActivity, FiLayers, FiZap } from "react-icons/fi";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import styles from "./Services.module.css";

const services = [
  {
    title: "UI Engineering",
    description:
      "Design system-ready interfaces with precise spacing, typography, and reusable components.",
    icon: <FiLayers />,
  },
  {
    title: "Performance + SEO",
    description:
      "Core Web Vitals optimization, code splitting, and semantic markup for high Lighthouse scores.",
    icon: <FiZap />,
  },
  {
    title: "Product Strategy",
    description:
      "Collaborative delivery across design, engineering, and stakeholders to ship polished experiences.",
    icon: <FiActivity />,
  },
];

function Services() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="services" className="section">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className="textCenter">
          <p className="eyebrow">Services</p>
          <h2 className="sectionTitle">How I can help</h2>
          <p className="sectionSubtitle">
            Focused offerings designed to move your product forward quickly and
            confidently.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.iconWrap} aria-hidden="true">
                {service.icon}
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
