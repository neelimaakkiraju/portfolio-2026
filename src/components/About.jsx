import React from "react";
import {
  SiFigma,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiStyledcomponents,
  SiFramer,
  SiGit,
  SiVercel,
  SiNpm,
  SiVite,
} from "react-icons/si";
import { FiCode, FiZap, FiSmartphone } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { getAbout, getPersonal } from "../data";
import styles from "./About.module.css";

const aboutData = getAbout();
const personalData = getPersonal();

// Icon mapping for dynamic rendering
const iconMap = {
  // Tech icons
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiTailwindcss: SiTailwindcss,
  SiFigma: SiFigma,
  SiHtml5: SiHtml5,
  SiCss3: SiCss3,
  SiSass: SiSass,
  SiStyledcomponents: SiStyledcomponents,
  SiFramer: SiFramer,
  SiGit: SiGit,
  VscVscode: VscVscode,
  SiVercel: SiVercel,
  SiNpm: SiNpm,
  SiVite: SiVite,
  // Feature icons
  FiCode: FiCode,
  FiZap: FiZap,
  FiSmartphone: FiSmartphone,
};

export default function About() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <header className="textCenter">
          <p className="eyebrow">{aboutData.eyebrow}</p>
          <h2 id="about-title" className="sectionTitle">{aboutData.title}</h2>
          <p className="sectionSubtitle">{aboutData.subtitle}</p>
        </header>

        <div className={styles.aboutGrid}>
          {/* Left: Photo + Bio */}
          <div className={styles.introSection}>
            <figure className={styles.photoCard}>
              <img
                src={personalData.avatarUrl}
                alt={`${personalData.name} portrait`}
                loading="lazy"
                width="400"
                height="400"
                className={styles.photoImage}
              />
            </figure>
            <p className={styles.bioText}>{aboutData.bio}</p>
            
            {/* Highlights */}
            <div className={styles.highlights}>
              {aboutData.highlights.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={item.title} className={styles.highlightCard}>
                    <span className={styles.highlightIcon}>
                      {IconComponent && <IconComponent aria-hidden="true" />}
                    </span>
                    <div>
                      <h4 className={styles.highlightTitle}>{item.title}</h4>
                      <p className={styles.highlightText}>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Skills Grid */}
          <div className={styles.skillsSection}>
            {aboutData.skillCategories.map((category) => (
              <div key={category.category} className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                <div className={styles.skillsGrid}>
                  {category.skills.map((skill) => {
                    const IconComponent = iconMap[skill.icon];
                    return (
                      <div key={skill.name} className={styles.skillItem}>
                        <span className={styles.skillIcon}>
                          {IconComponent && <IconComponent aria-hidden="true" />}
                        </span>
                        <span className={styles.skillName}>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
