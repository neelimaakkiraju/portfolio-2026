import React, { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { getProjects } from "../data";
import styles from "./Projects.module.css";

const projectsData = getProjects();

const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <article className={styles.card} itemScope itemType="https://schema.org/CreativeWork">
      <div className={styles.imageWrap}>
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          itemProp="image"
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle} itemProp="name">{project.name}</h3>
        <p className={styles.cardCopy} itemProp="description">{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag" itemProp="keywords">
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
            aria-label={`View ${project.name} source code on GitHub`}
          >
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkButton} ${styles.primaryLink}`}
            itemProp="url"
            aria-label={`View ${project.name} live demo`}
          >
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
});

function Projects() {
  const { ref, isVisible } = useRevealOnScroll();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projectsData.items;
    return projectsData.items.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="portfolio" className="section" aria-labelledby="portfolio-title">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <header className="textCenter">
          <p className="eyebrow">{projectsData.eyebrow}</p>
          <h2 id="portfolio-title" className="sectionTitle">{projectsData.title}</h2>
          <p className="sectionSubtitle">{projectsData.subtitle}</p>
        </header>

        <div className={styles.filters} role="tablist" aria-label="Project categories">
          {projectsData.categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={`${styles.filterButton} ${
                activeCategory === category ? styles.filterActive : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.1 },
            },
          }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.name}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Projects);
