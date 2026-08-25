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
import { FiCheck, FiClock, FiCode, FiMapPin, FiSmartphone, FiZap } from "react-icons/fi";

import Section from "./ui/Section";
import Reveal, { RevealItem, Stagger } from "./ui/Reveal";
import Portrait from "./ui/Portrait";
import { getAbout, getPersonal } from "../data";
import { CATEGORY, trackEvent } from "../lib/analytics";
import styles from "./Expertise.module.css";

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

function Expertise() {
  const handleSkillClick = (skill, category) => {
    trackEvent({
      action: "skill_click",
      category: CATEGORY.ENGAGEMENT,
      label: skill,
      metadata: {
        section: "expertise",
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
      id="expertise"
      badge={about.eyebrow}
      title={about.title}
      description={about.subtitle}
      analyticsName="expertise"
      tone="raised"
    >
      <div className={styles.container}>
        {/* ── Bio ─────────────────────────────────────────────── */}
        <Reveal className={styles.bio}>
          <div className={styles.portraitWrap}>
            <Portrait
              src={personal.avatarUrl || undefined}
              alt={`${personal.name}, ${personal.role}`}
              monogram={personal.monogram}
              size={120}
            />
          </div>
          <div className={styles.bioText}>
            <p className={styles.bioParagraph}>{about.bio}</p>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <FiMapPin aria-hidden="true" />
                {personal.location}
              </span>
              <span className={styles.metaItem}>
                <FiClock aria-hidden="true" />
                {personal.timezone}
              </span>
            </div>
          </div>
        </Reveal>

        {/* ── Capability Areas ──────────────────────────────────── */}
        {highlightsList.length > 0 && (
          <Stagger className={styles.pillarsGrid}>
            {highlightsList.map((item) => {
              const Icon = iconMap[item.icon];
              const outcomes = item.outcomes || [];
              return (
                <RevealItem
                  key={item.title}
                  as="article"
                  className={`card cardHover ${styles.pillarCard}`}
                >
                  <span className={styles.pillarIcon} aria-hidden="true">
                    {Icon && <Icon />}
                  </span>
                  <div className={styles.pillarBody}>
                    <h4 className={styles.pillarTitle}>{item.title}</h4>
                    <p className={styles.pillarText}>{item.text}</p>
                    {outcomes.length > 0 && (
                      <ul className={styles.outcomes}>
                        {outcomes.map((outcome) => (
                          <li key={outcome} className={styles.outcome}>
                            <FiCheck aria-hidden="true" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    )}
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
                <div
                  key={category.category}
                  className={`${styles.skillGroup} ${category.primary ? styles.skillGroupPrimary : ""}`}
                >
                  <h4 className={styles.skillGroupTitle}>{category.category}</h4>
                  <ul className={styles.skillPills}>
                    {(category.skills || []).map((skill) => {
                      const Icon = iconMap[skill.icon];
                      return (
                        <li key={skill.name}>
                          <button
                            type="button"
                            className={`${styles.skillPill} ${
                              category.primary ? styles.skillPillPrimary : ""
                            }`}
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

export default memo(Expertise);
