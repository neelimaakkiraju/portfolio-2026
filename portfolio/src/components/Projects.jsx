import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const projects = [
  {
    name: "E-Commerce Simple Store",
    description: "Modern shopping experience with intuitive navigation.",
    tags: ["React", "Responsive Design","Tailwind CSS","Redux","React Hooks","Rest API"],
    image: "/images/simplestore.png",
    imageAlt: "E-Commerce dashboard preview",
    repo: "https://github.com/neelimaakkiraju/frontend-e-commerce.git",
    live: "https://ecommerce-simple-store.netlify.app/",
  },
  {
    name: "Doctor-Booking-app",
    description: "A responsive doctor appointment booking app for quick and easy scheduling.",
    tags: ["React", "Responsive Design","Tailwind CSS","NextJS","Date-fns","Typescript"],
    image: "/images/doctor-booking.png",
    imageAlt: "Banking mobile app preview",
    repo: "https://github.com/neelimaakkiraju/doctor-booking-app.git",
    live: "https://doctor-booking-app.netlify.app/",
  },
  {
    name: "Finance Monitor",
    description: "A real-time finance dashboard for tracking key financial insights.",
    tags: ["React", "Responsive Design","Tailwind CSS","Recharts","React Hooks","React Icons"],
    image: "/images/dashboard.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/invoice-dashboard.git",
    live: "https://dashboard-invoice2.netlify.app/",
  },
  {
    name: "SecureX",
    description: "A secure and responsive login page with smooth authentication flow.",
    tags: ["React JS", "Typescript", "Vite","Firebase","React Hooks","React-toast"],
    image: "/images/login.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/login-page.git",
    live: "https://authentication-setup.netlify.app/login",
  },
  {
    name: "TaskFlow",
    description: "A simple and efficient task manager for organizing and tracking daily work.",
    tags: ["HTML/CSS","Javascript","EventListeners","Responsive Design","Tailwind CSS"],
    image: "/images/task.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/todo-app.git",
    live: "https://plan-task-app.netlify.app/",
  },
  {
    name: "SearchEase",
    description: "A smooth search animation app for fast and intuitive interactions.",
    tags: ["Recat JS","Responsive Design","React Icons","Animations","Tailwind CSS"],
    image: "/images/search.png",
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/neelimaakkiraju/search-animation.git",
    live: "https://search-animation-app.netlify.app/",
  },
];

export default function Projects() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      id="portfolio"
      className="bg-gradient-to-b from-white via-[#F9FAFF] to-white py-20"
    >
      <div
        ref={ref}
        className={`reveal-on-scroll mx-auto max-w-5xl px-4 md:px-6 ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">
            Featured Work
          </h2>
          <p className="mt-2 text-xs text-[#8588A3] md:text-sm">
            A selection of projects that showcase my skills and creativity.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
            >
              <div className="relative h-32 overflow-hidden md:h-28">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-4 pt-4">
                <h3 className="text-sm font-semibold text-[#1A1A2E]">
                  {p.name}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-[#8588A3] md:text-xs">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F5F7FF] px-3 py-1 text-[10px] font-medium text-[#6C6FA3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-[11px]">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-[#E0E3F3] px-3 py-1 font-medium text-[#4C5BFF] transition-colors hover:border-[#4C5BFF] hover:bg-[#F5F7FF]"
                  >
                    GitHub Repo
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF] px-3 py-1 font-medium text-white shadow-sm shadow-[#654BFF33]"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
