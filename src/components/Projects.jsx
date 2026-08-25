import React, { memo, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";

import Section from "./ui/Section";
import { EASE } from "./ui/motionTokens";
import CaseStudyModal from "./CaseStudyModal";
import { useImpression } from "../hooks/useAnalytics";
import { getProjects } from "../data";
import { CATEGORY, trackEvent, trackProject } from "../lib/analytics";
import styles from "./Projects.module.css";

const projects = getProjects();
const caseStudyLabels = projects.caseStudyLabels;

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  variant = "compact",
  onOpenCaseStudy,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [hoverTracked, setHoverTracked] = useState(false);
  const isFeatured = variant === "featured";

  const impressionRef = useImpression(() =>
    trackProject("project_view", project.name, {
      component: "project_card",
      position: index + 1,
      category_name: project.category,
      variant,
    })
  );

  const handleHover = () => {
    if (hoverTracked) return;
    setHoverTracked(true);
    trackProject("project_hover", project.name, {
      component: "project_card",
      position: index + 1,
    });
  };

  return (
    <Motion.article
      ref={impressionRef}
      layout={!prefersReducedMotion}
      className={`card ${styles.card} ${isFeatured ? styles.cardFeatured : styles.cardCompact} ${
        isFeatured && index % 2 === 1 ? styles.cardReverse : ""
      }`}
      onMouseEnter={handleHover}
      onFocus={handleHover}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      <div className={styles.media}>
        <img
          src={project.image}
          alt={project.imageAlt}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          itemProp="image"
        />
        <span className={styles.year} aria-hidden="true">
          {project.year}
        </span>
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <p className={styles.category}>{project.category}</p>
          <h3 className={styles.title} itemProp="name">
            {project.name}
          </h3>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </header>

        <p className={styles.description} itemProp="description">
          {project.description}
        </p>

        {isFeatured && project.metrics.length > 0 && (
          <dl className={styles.metrics}>
            {project.metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <dt className={styles.metricValue}>{metric.value}</dt>
                <dd className={styles.metricLabel}>{metric.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className="tag" itemProp="keywords">
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnPrimary btnSm"
            itemProp="url"
            aria-label={`Open ${project.name} live demo`}
            onClick={() =>
              trackProject("live_demo_click", project.name, {
                component: "project_card",
                destination_url: project.live,
                position: index + 1,
              })
            }
          >
            <FiExternalLink aria-hidden="true" />
            Live Demo
          </a>

          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btnSecondary btnSm"
            aria-label={`View ${project.name} source code on GitHub`}
            onClick={() =>
              trackProject("github_click", project.name, {
                component: "project_card",
                destination_url: project.repo,
                position: index + 1,
              })
            }
          >
            <FiGithub aria-hidden="true" />
            Code
          </a>

          <button
            type="button"
            className={styles.caseStudyLink}
            aria-label={`Read ${project.name} case study`}
            onClick={() => onOpenCaseStudy(project, index)}
          >
            Case study
            <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </Motion.article>
  );
});

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects.items
        : projects.items.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  /* Editorial split: featured projects get the large treatment, the rest
     stay in a compact grid. Both are derived slices of the same filtered
     list, so category filtering keeps working across both tiers for free. */
  const featuredProjects = useMemo(() => filtered.filter((p) => p.featured), [filtered]);
  const secondaryProjects = useMemo(() => filtered.filter((p) => !p.featured), [filtered]);

  const handleCategorySelect = useCallback((category) => {
    setActiveCategory(category);
    trackEvent({
      action: "category_filter",
      category: CATEGORY.ENGAGEMENT,
      label: category,
      metadata: { section: "projects", component: "category_filters" },
    });
  }, []);

  const handleOpenCaseStudy = useCallback((project, index) => {
    setActiveProject(project);
    trackProject("case_study_open", project.name, {
      component: "project_card",
      position: index + 1,
    });
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <Section
      id="portfolio"
      badge={projects.eyebrow}
      title={projects.title}
      description={projects.subtitle}
      analyticsName="projects"
    >
      <div className={styles.filters} role="tablist" aria-label="Project categories">
        {projects.categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategorySelect(category)}
              className={`${styles.filter} ${isActive ? styles.filterActive : ""}`}
            >
              {isActive && !prefersReducedMotion && (
                <Motion.span
                  layoutId="filter-pill"
                  className={styles.filterPill}
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={styles.filterLabel}>{category}</span>
            </button>
          );
        })}
      </div>

      {featuredProjects.length > 0 && (
        <Motion.div layout className={styles.featuredList}>
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={filtered.indexOf(project)}
                variant="featured"
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            ))}
          </AnimatePresence>
        </Motion.div>
      )}

      {secondaryProjects.length > 0 && (
        <div className={styles.secondaryGroup}>
          {featuredProjects.length > 0 && (
            <h3 className={styles.groupLabel}>More Projects</h3>
          )}
          <Motion.div layout className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {secondaryProjects.map((project) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={filtered.indexOf(project)}
                  variant="compact"
                  onOpenCaseStudy={handleOpenCaseStudy}
                />
              ))}
            </AnimatePresence>
          </Motion.div>
        </div>
      )}

      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          labels={caseStudyLabels}
          onClose={handleCloseCaseStudy}
        />
      )}
    </Section>
  );
}
