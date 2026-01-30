import React, { memo } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import styles from "./Experience.module.css";

const experience = [
  {
    period: "Apr 2025 - Present",
    role: "Frontend Developer",
    company: "Techenhance",
    description:
      "Developed a scalable Next.js and TypeScript CRM with automated workflows, advanced reporting, modular UI components, and streamlined CI/CD delivery processes.",
  },
  {
    period: "Jul 2024 - Mar 2025",
    role: "Frontend Developer",
    company: "Freelancer",
    description:
      "Designed responsive React and Next.js interfaces using Tailwind CSS, optimized performance and SEO, integrated secure APIs, and maintained reliable production deployments.",
  },
  {
    period: "May 2023 - Jun 2024",
    role: "Frontend Developer",
    company: "AGM Global Solutions",
    description:
      "Built high-performance React and Next.js applications with optimized Core Web Vitals, reusable UI components, and UX collaboration to improve speed, maintainability, and engagement.",
      
  },
];

const skills = [
  { name: "React JS", value: 90 },
  { name: "Next JS", value: 85 },
  { name: "Javascript & Typescript", value: 82 },
  { name: "Tailwind CSS & Responsive UI", value: 80 },
  { name: "Performance Optimization & SEO", value: 75 },
];

const tools = [
  "Figma",
  "React JS",
  "Next JS",
  "Tailwind",
  "HTML & CSS",
  "TypeScript",
  "Javascript",
  "Git",
  "Redux",
  "Context API",
  "Responsive Design",
  "Bootstrap",
  "Netlify",
  "GraphQL",
  "Rest API",
  "GitHub",
  "Jest",
  "Vitest",
  "React Hooks",
  "Data structure & Algorithms",
  "AI Assisted Development",
  "Copilot",
  "Cursor",
  "Webpack"

];

function Experience() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="experience" className="section">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className="textCenter">
          <p className="eyebrow">Experience</p>
          <h2 className="sectionTitle">Growth &amp; expertise</h2>
          <p className="sectionSubtitle">
            A snapshot of my professional journey and the skills I&apos;ve honed.
          </p>
        </div>

        <div className={styles.wrapper}>
          <div>
            <h3 className={styles.subsectionTitle}>
              Professional Journey
            </h3>
            <div className={styles.timeline}>
              {experience.map((item) => (
                <div key={item.role} className={styles.timelineItem}>
                  <span className={styles.timelineDot} />
                  <p className={styles.timelinePeriod}>{item.period}</p>
                  <h4 className={styles.timelineRole}>{item.role}</h4>
                  <p className={styles.timelineCompany}>{item.company}</p>
                  <p className={styles.timelineCopy}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.subsectionTitle}>
              Technical Skills
            </h3>
            <div className={styles.skillGrid}>
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className={styles.skillLabel}>
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className={styles.skillTrack}>
                    <div
                      className={styles.skillFill}
                      style={{ width: `${isVisible ? skill.value : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.toolsSection}>
              <h4 className={styles.toolsTitle}>
                Tools &amp; Technologies
              </h4>
              <div className={styles.tools}>
                {tools.map((tool) => (
                  <span key={tool} className="chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Experience);
