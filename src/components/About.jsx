import React from "react";
import { SiFigma, SiJavascript, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import styles from "./About.module.css";

const skills = [
  { name: "React + Next.js", value: 92 },
  { name: "TypeScript + JavaScript", value: 88 },
  { name: "UI Systems + Design", value: 84 },
];

const techStack = [
  { label: "React", icon: <SiReact />, hint: "Component architecture" },
  { label: "Next.js", icon: <SiNextdotjs />, hint: "Full-stack React" },
  { label: "TypeScript", icon: <SiTypescript />, hint: "Typed codebases" },
  { label: "JavaScript", icon: <SiJavascript />, hint: "ES2024+" },
  { label: "Tailwind", icon: <SiTailwindcss />, hint: "Utility styling" },
  { label: "Figma", icon: <SiFigma />, hint: "Design handoff" },
];

export default function About() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="about" className="section">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className="textCenter">
          <p className="eyebrow">About</p>
          <h2 className="sectionTitle">Design-minded frontend engineer</h2>
          <p className="sectionSubtitle">
            I blend thoughtful UX with robust engineering to deliver delightful,
            accessible web experiences.
          </p>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.photoCard}>
            <img
              src="/images/hero.jpg"
              alt="Neelima Akkiraju portrait"
              loading="lazy"
              width="480"
              height="560"
              className={styles.photoImage}
            />
          </div>

          <div className={styles.bio}>
            <p>
              I specialize in building modern React applications with clean
              architecture, scalable component systems, and meticulous attention to
              detail. My focus is creating polished UI that feels as good as it
              looks—fast, accessible, and intuitive.
            </p>
            <p>
              I collaborate closely with designers and product teams to translate
              complex requirements into elegant, maintainable interfaces. From
              motion design to performance tuning, I deliver end-to-end frontend
              solutions.
            </p>
            <p>
              Outside of client work, I enjoy exploring design systems, mentoring,
              and iterating on interaction patterns that elevate user delight.
            </p>

            <div className={styles.skills}>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className={styles.skillRow}>
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className={styles.skillBar}>
                    <div
                      className={styles.skillFill}
                      style={{ width: `${isVisible ? skill.value : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.techGrid}>
              {techStack.map((tech) => (
                <span
                  key={tech.label}
                  className={styles.techItem}
                  title={tech.hint}
                >
                  {tech.icon}
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
