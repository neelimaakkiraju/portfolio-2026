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
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { FiCode, FiSmartphone, FiZap } from "react-icons/fi";

import Section from "./ui/Section";
import Reveal, { RevealItem, Stagger } from "./ui/Reveal";
import Portrait from "./ui/Portrait";
import { getAbout, getPersonal } from "../data";
import { CATEGORY, trackEvent } from "../lib/analytics";
import styles from "./About.module.css";

const about = getAbout() || {};
const personal = getPersonal() || {};

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
  SiFramer,
  SiGit,
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

  const highlightsList = about.highlights || [];
  const skillCategoryList = about.skillCategories || [];

  return (
    <Section
      id="about"
      badge={about.eyebrow}
      title={about.title}
      description={about.subtitle}
      analyticsName="about"
    >
      <div className={styles.container}>
        {/* ── Top Overview Card ──────────────────────────────── */}
        <Reveal className={`card ${styles.heroCard}`}>
          <div className={styles.heroContent}>
            <div className={styles.portraitWrap}>
              <Portrait
                src={personal.avatarUrl || undefined}
                alt={`${personal.name}, ${personal.role}`}
                monogram={personal.monogram}
                size={120}
              />
            </div>
            <div className={styles.bioText}>
              <h3 className={styles.bioTitle}>Passionate about high-impact frontend engineering</h3>
              <p className={styles.bioParagraph}>{about.bio}</p>
              <div className={styles.metaRow}>
                <span className={styles.metaChip}>📍 {personal.location}</span>
                <span className={styles.metaChip}>🕒 {personal.timezone}</span>
                <span className={styles.metaChip}>🚀 {personal.tagline}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Core Value Pillars ──────────────────────────────── */}
        {highlightsList.length > 0 && (
          <Stagger className={styles.pillarsGrid}>
            {highlightsList.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <RevealItem
                  key={item.title}
                  as="article"
                  className={`card cardHover ${styles.pillarCard}`}
                >
                  <span className={styles.pillarIcon} aria-hidden="true">
                    {Icon && <Icon />}
                  </span>
                  <div>
                    <h4 className={styles.pillarTitle}>{item.title}</h4>
                    <p className={styles.pillarText}>{item.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </Stagger>
        )}

        {/* ── Skills & Technologies ──────────────────────────── */}
        {skillCategoryList.length > 0 && (
          <div className={styles.skillsSection}>
            <h3 className={styles.skillsHeader}>Technical Stack & Tools</h3>
            <div className={styles.skillsGroupGrid}>
              {skillCategoryList.map((category) => (
                <div key={category.category} className={styles.skillGroup}>
                  <h4 className={styles.skillGroupTitle}>{category.category}</h4>
                  <ul className={styles.skillPills}>
                    {(category.skills || []).map((skill) => {
                      const Icon = iconMap[skill.icon];
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            className={styles.skillPill}
                            onClick={() =>
                              handleSkillClick(skill.name, category.category)
                            }
                          >
                            {Icon && (
                              <span className={styles.skillIcon} aria-hidden="true">
                                <Icon />
                              </span>
                            )}
                            <span>{skill.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

export default memo(About);
