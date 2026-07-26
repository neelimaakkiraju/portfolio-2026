import React, { memo } from "react";
import {
  SiCss3,
  SiFigma,
  SiFramer,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNpm,
  SiReact,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { FiCode, FiSmartphone, FiZap } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";

import Section from "./ui/Section";
import Reveal, { RevealItem, Stagger } from "./ui/Reveal";
import Portrait from "./ui/Portrait";
import { getAbout, getPersonal } from "../data";
import { CATEGORY, trackEvent } from "../lib/analytics";
import styles from "./About.module.css";

const about = getAbout();
const personal = getPersonal();

const iconMap = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiSass,
  SiStyledcomponents,
  SiFramer,
  SiGit,
  VscVscode,
  SiVercel,
  SiNpm,
  SiVite,
  FiCode,
  FiZap,
  FiSmartphone,
};

function About() {
  const handleSkillClick = (skill, category) => {
    trackEvent({
      action: "skill_click",
      category: CATEGORY.ENGAGEMENT,
      label: skill,
      metadata: {
        section: "about",
        component: "skill_grid",
        skill_name: skill,
        skill_category: category,
      },
    });
  };

  return (
    <Section
      id="about"
      badge={about.eyebrow}
      title={about.title}
      description={about.subtitle}
      analyticsName="about"
    >
      <div className={styles.grid}>
        {/* ── Intro column ───────────────────────────────────── */}
        <div className={styles.intro}>
          <Reveal className={styles.portraitCard}>
            <Portrait
              src={personal.avatarUrl || undefined}
              alt={`${personal.name}, ${personal.role}`}
              monogram={personal.monogram}
              size={360}
            />
          </Reveal>

          <Reveal delay={0.06} className={styles.bioBlock}>
            <p className={styles.bio}>{about.bio}</p>
            <ul className={styles.facts}>
              <li className={styles.fact}>
                <span className={styles.factLabel}>Based in</span>
                <span className={styles.factValue}>{personal.location}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>Timezone</span>
                <span className={styles.factValue}>{personal.timezone}</span>
              </li>
              <li className={styles.fact}>
                <span className={styles.factLabel}>Focus</span>
                <span className={styles.factValue}>{personal.tagline}</span>
              </li>
            </ul>
          </Reveal>

          <Stagger className={styles.highlights}>
            {about.highlights.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <RevealItem
                  key={item.title}
                  as="article"
                  className={`card cardHover ${styles.highlightCard}`}
                >
                  <span className={styles.highlightIcon} aria-hidden="true">
                    {Icon && <Icon />}
                  </span>
                  <div>
                    <h3 className={styles.highlightTitle}>{item.title}</h3>
                    <p className={styles.highlightText}>{item.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </Stagger>
        </div>

        {/* ── Skills column ──────────────────────────────────── */}
        <Stagger className={styles.skills} stagger={0.1}>
          {about.skillCategories.map((category) => (
            <RevealItem
              key={category.category}
              as="section"
              className={`card ${styles.skillCard} ${
                category.primary ? styles.skillCardPrimary : ""
              }`}
              aria-label={category.category}
            >
              <header className={styles.skillHeader}>
                <h3 className={styles.skillCategoryTitle}>{category.category}</h3>
                {category.primary && (
                  <span className={styles.primaryFlag}>Primary</span>
                )}
              </header>
              <ul className={styles.skillList}>
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <li key={skill.name}>
                      <button
                        type="button"
                        className={styles.skillItem}
                        onClick={() =>
                          handleSkillClick(skill.name, category.category)
                        }
                      >
                        <span className={styles.skillIcon} aria-hidden="true">
                          {Icon && <Icon />}
                        </span>
                        <span className={styles.skillName}>{skill.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

export default memo(About);
