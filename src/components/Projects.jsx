import React, { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import styles from "./Projects.module.css";

const projects = [
  {
    name: "E-Commerce Simple Store",
    description: "Modern shopping experience with intuitive navigation.",
    tags: ["React", "Responsive Design","Tailwind CSS","Redux","React Hooks","Rest API"],
    image: "/images/simplestore.png",
    imageAlt: "E-Commerce dashboard preview",
    repo: "https://github.com/neelimaakkiraju/frontend-e-commerce.git",
    live: "https://ecommerce-simple-store.netlify.app/",
    category: "Web Apps",
  },
  {
    name: "Doctor-Booking-app",
    description: "A responsive doctor appointment booking app for quick and easy scheduling.",
    tags: ["React", "Responsive Design","Tailwind CSS","NextJS","Date-fns","Typescript"],
    image: "/images/doctor-booking.png",
    imageAlt: "Banking mobile app preview",
    repo: "https://github.com/neelimaakkiraju/doctor-booking-app.git",
    live: "https://doctor-booking-app.netlify.app/",
    category: "Mobile",
  },
  {
    name: "Finance Monitor",
    description: "A real-time finance dashboard for tracking key financial insights.",
    tags: ["React", "Responsive Design","Tailwind CSS","Recharts","React Hooks","React Icons"],
    image: "/images/dashboard.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/invoice-dashboard.git",
    live: "https://dashboard-invoice2.netlify.app/",
    category: "Dashboards",
  },
  {
    name: "SecureX",
    description: "A secure and responsive login page with smooth authentication flow.",
    tags: ["React JS", "Typescript", "Vite","Firebase","React Hooks","React-toast"],
    image: "/images/login.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/login-page.git",
    live: "https://authentication-setup.netlify.app/login",
    category: "Web Apps",
  },
  {
    name: "TaskFlow",
    description: "A simple and efficient task manager for organizing and tracking daily work.",
    tags: ["HTML/CSS","Javascript","EventListeners","Responsive Design","Tailwind CSS"],
    image: "/images/task.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/todo-app.git",
    live: "https://plan-task-app.netlify.app/",
    category: "Web Apps",
  },
  {
    name: "SearchEase",
    description: "A smooth search animation app for fast and intuitive interactions.",
    tags: ["Recat JS","Responsive Design","React Icons","Animations","Tailwind CSS"],
    image: "/images/search.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/search-animation.git",
    live: "https://search-animation-app.netlify.app/",
    category: "UI Experiments",
  },
];

const categories = ["All", "Web Apps", "Mobile", "Dashboards", "UI Experiments"];

const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.name}</h3>
        <p className={styles.cardCopy}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.actions}>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className={styles.linkButton}
          >
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className={`${styles.linkButton} ${styles.primaryLink}`}
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
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="portfolio" className="section">
      <div
        ref={ref}
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className="textCenter">
          <p className="eyebrow">Projects</p>
          <h2 className="sectionTitle">Selected work</h2>
          <p className="sectionSubtitle">
            A curated portfolio of frontend projects spanning product work and
            UI experimentation.
          </p>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Project categories">
          {categories.map((category) => (
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
