import React, { memo } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { getExperience } from "../data";
import styles from "./Experience.module.css";

const experienceData = getExperience();

function Experience() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <header className="textCenter">
          <p className="eyebrow">{experienceData.eyebrow}</p>
          <h2 id="experience-title" className="sectionTitle">{experienceData.title}</h2>
          <p className="sectionSubtitle">{experienceData.subtitle}</p>
        </header>

        <div className={styles.wrapper}>
          <div>
            <h3 className={styles.subsectionTitle}>
              {experienceData.journeyTitle}
            </h3>
            <div className={styles.timeline} itemScope itemType="https://schema.org/ItemList">
              {experienceData.timeline.map((item, index) => (
                <div 
                  key={item.role + item.company} 
                  className={styles.timelineItem}
                  itemScope 
                  itemType="https://schema.org/WorkExperience"
                  itemProp="itemListElement"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  <span className={styles.timelineDot} />
                  <p className={styles.timelinePeriod} itemProp="temporal">{item.period}</p>
                  <h4 className={styles.timelineRole} itemProp="roleName">{item.role}</h4>
                  <p className={styles.timelineCompany} itemProp="worksFor">{item.company}</p>
                  <p className={styles.timelineCopy} itemProp="description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.subsectionTitle}>
              {experienceData.skillsTitle}
            </h3>
            <div className={styles.skillGrid}>
              {experienceData.skills.map((skill) => (
                <div key={skill.name}>
                  <div className={styles.skillLabel}>
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div 
                    className={styles.skillTrack}
                    role="progressbar"
                    aria-valuenow={skill.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${skill.name} proficiency`}
                  >
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
                {experienceData.toolsTitle}
              </h4>
              <div className={styles.tools}>
                {experienceData.tools.map((tool) => (
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
