import React from "react";
import { SiFigma, SiJavascript, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { getAbout, getPersonal } from "../data";
import styles from "./About.module.css";

const aboutData = getAbout();
const personalData = getPersonal();

// Icon mapping for dynamic rendering
const iconMap = {
  SiReact: <SiReact />,
  SiNextdotjs: <SiNextdotjs />,
  SiTypescript: <SiTypescript />,
  SiJavascript: <SiJavascript />,
  SiTailwindcss: <SiTailwindcss />,
  SiFigma: <SiFigma />,
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
          <figure className={styles.photoCard}>
            <img
              src={personalData.avatarUrl}
              alt={`${personalData.name} portrait`}
              loading="lazy"
              width="480"
              height="560"
              className={styles.photoImage}
            />
          </figure>

          <div className={styles.bio}>
            {aboutData.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className={styles.skills}>
              {aboutData.skills.map((skill) => (
                <div key={skill.name}>
                  <div className={styles.skillRow}>
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className={styles.skillBar} role="progressbar" aria-valuenow={skill.value} aria-valuemin="0" aria-valuemax="100">
                    <div
                      className={styles.skillFill}
                      style={{ width: `${isVisible ? skill.value : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.techGrid}>
              {aboutData.techStack.map((tech) => (
                <span
                  key={tech.label}
                  className={styles.techItem}
                  title={tech.hint}
                >
                  {iconMap[tech.icon]}
                  {tech.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
