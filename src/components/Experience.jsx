import React, { memo } from "react";
import { FiCheck } from "react-icons/fi";

import Section from "./ui/Section";
import Reveal, { RevealItem, Stagger } from "./ui/Reveal";
import { getExperience } from "../data";
import styles from "./Experience.module.css";

const experience = getExperience() || {};

function Experience() {
  const timelineRoles = experience.timeline || experience.jobs || [];

  return (
    <Section
      id="experience"
      badge={experience.eyebrow}
      title={experience.title}
      description={experience.subtitle}
      analyticsName="experience"
      tone="raised"
    >
      <Stagger className={styles.timeline} stagger={0.12}>
        {timelineRoles.map((role) => {
          const metrics = role.highlights || role.metrics || [];
          const achievements = role.achievements || [];
          return (
            <RevealItem
              key={`${role.role}-${role.company}`}
              as="article"
              className={styles.entry}
            >
              <div className={styles.rail} aria-hidden="true">
                <span
                  className={`${styles.dot} ${role.current ? styles.dotCurrent : ""}`}
                />
              </div>

              <div className={`card cardHover ${styles.entryCard}`}>
                <header className={styles.entryHeader}>
                  <div>
                    <h4 className={styles.role}>{role.role}</h4>
                    <p className={styles.company}>{role.company}</p>
                  </div>
                  <p className={styles.period}>
                    {role.current && (
                      <span className={styles.currentFlag}>
                        <span className={styles.currentDot} aria-hidden="true" />
                        Current
                      </span>
                    )}
                    <span>{role.period}</span>
                  </p>
                </header>

                {role.summary && <p className={styles.summary}>{role.summary}</p>}

                {metrics.length > 0 && (
                  <dl className={styles.metrics}>
                    {metrics.map((metric) => (
                      <div key={metric.label} className={styles.metric}>
                        <dt className={styles.metricValue}>{metric.value}</dt>
                        <dd className={styles.metricLabel}>{metric.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {achievements.length > 0 && (
                  <ul className={styles.achievements}>
                    {achievements.map((achievement) => (
                      <li key={achievement} className={styles.achievement}>
                        <FiCheck aria-hidden="true" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealItem>
          );
        })}
      </Stagger>
    </Section>
  );
}

export default memo(Experience);
