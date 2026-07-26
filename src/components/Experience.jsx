import React, { memo } from "react";
import { FiCheck } from "react-icons/fi";

import Section from "./ui/Section";
import Reveal, { RevealItem, Stagger } from "./ui/Reveal";
import { getExperience } from "../data";
import { CATEGORY, trackEvent } from "../lib/analytics";
import styles from "./Experience.module.css";

const experience = getExperience();

function Experience() {
  const trackSkill = (label, group, component) =>
    trackEvent({
      action: "skill_click",
      category: CATEGORY.ENGAGEMENT,
      label,
      metadata: {
        section: "experience",
        component,
        skill_name: label,
        skill_category: group,
      },
    });

  return (
    <Section
      id="experience"
      badge={experience.eyebrow}
      title={experience.title}
      description={experience.subtitle}
      analyticsName="experience"
      tone="raised"
    >
      {/* ── Timeline ─────────────────────────────────────────── */}
      <Reveal as="h3" className={styles.subheading}>
        {experience.journeyTitle}
      </Reveal>

      <Stagger className={styles.timeline} stagger={0.12}>
        {experience.timeline.map((role) => (
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

              <p className={styles.summary}>{role.summary}</p>

              <dl className={styles.metrics}>
                {role.highlights.map((metric) => (
                  <div key={metric.label} className={styles.metric}>
                    <dt className={styles.metricValue}>{metric.value}</dt>
                    <dd className={styles.metricLabel}>{metric.label}</dd>
                  </div>
                ))}
              </dl>

              <ul className={styles.achievements}>
                {role.achievements.map((achievement) => (
                  <li key={achievement} className={styles.achievement}>
                    <FiCheck aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </Stagger>

      {/* ── Skills matrix ────────────────────────────────────── */}
      <Reveal as="h3" className={styles.subheading}>
        {experience.skillsTitle}
      </Reveal>

      <Stagger className={styles.skillsGrid} stagger={0.08}>
        {experience.skills.categories.map((category) => (
          <RevealItem
            key={category.title}
            as="section"
            className={`card cardHover ${styles.skillCard} ${
              category.primary ? styles.skillCardPrimary : ""
            }`}
            aria-label={category.title}
          >
            <header className={styles.skillHeader}>
              <h4 className={styles.skillTitle}>{category.title}</h4>
              {category.primary && (
                <span className={styles.primaryFlag}>Primary</span>
              )}
            </header>
            <ul className={styles.skillList}>
              {category.items.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className={styles.skillItem}
                    onClick={() => trackSkill(item, category.title, "skills_matrix")}
                  >
                    <span className={styles.bullet} aria-hidden="true" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Stagger>

      {/* ── Toolkit ──────────────────────────────────────────── */}
      <Reveal className={styles.toolsSection}>
        <h3 className={styles.toolsTitle}>{experience.toolsTitle}</h3>
        <ul className={styles.tools}>
          {experience.tools.map((tool) => (
            <li key={tool}>
              <button
                type="button"
                className={`chip ${styles.tool}`}
                onClick={() => trackSkill(tool, "toolkit", "toolkit_chips")}
              >
                {tool}
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

export default memo(Experience);
