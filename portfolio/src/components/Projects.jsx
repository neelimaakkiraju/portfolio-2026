import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const projects = [
  {
    name: "E-Commerce Platform",
    description: "Modern shopping experience with intuitive navigation.",
    tags: ["React", "Design"],
    imageAlt: "E-Commerce dashboard preview",
    repo: "https://github.com/your-username/ecommerce-platform",
    live: "https://ecommerce.example.com",
  },
  {
    name: "Banking App",
    description: "Secure and user-friendly financial management.",
    tags: ["Mobile", "UI/UX"],
    imageAlt: "Banking mobile app preview",
    repo: "https://github.com/your-username/banking-app",
    live: "https://banking.example.com",
  },
  {
    name: "Creative Portfolio",
    description: "Artistic showcase with interactive elements.",
    tags: ["Web", "Creative"],
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/your-username/creative-portfolio",
    live: "https://portfolio.example.com",
  },
  {
    name: "Creative Portfolio",
    description: "Artistic showcase with interactive elements.",
    tags: ["Web", "Creative"],
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/your-username/creative-portfolio",
    live: "https://portfolio.example.com",
  },
  {
    name: "Creative Portfolio",
    description: "Artistic showcase with interactive elements.",
    tags: ["Web", "Creative"],
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/your-username/creative-portfolio",
    live: "https://portfolio.example.com",
  },
  {
    name: "Creative Portfolio",
    description: "Artistic showcase with interactive elements.",
    tags: ["Web", "Creative"],
    imageAlt: "Creative portfolio gallery preview",
    repo: "https://github.com/your-username/creative-portfolio",
    live: "https://portfolio.example.com",
  },
];

export default function Projects() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      id="portfolio"
      className="mt-20 px-4 md:mt-24 md:px-6"
    >
      <div
        ref={ref}
        className={`reveal-on-scroll mx-auto max-w-5xl ${
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
              <div className="h-32 bg-gradient-to-br from-[#E3E7FF] via-[#F3F5FF] to-[#FFEAF7] md:h-28">
                <div className="flex h-full items-center justify-center text-[11px] font-medium text-[#A0A3C0]">
                  {p.imageAlt}
                </div>
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
