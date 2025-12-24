import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

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

export default function Experience() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      id="experience"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div
          ref={ref}
          className={`reveal-on-scroll rounded-3xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-10 ${
            isVisible ? "is-visible" : ""
          }`}
        >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">
            Experience &amp; Skills
          </h2>
          <p className="mt-2 text-xs text-[#8588A3] md:text-sm">
            My journey in creating exceptional digital experiences.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h3 className="text-sm font-semibold text-[#1A1A2E]">
              Professional Journey
            </h3>
            <div className="mt-5 space-y-6 border-l border-[#E0E3F3] pl-5">
              {experience.map((item, index) => (
                <div key={item.role} className="relative">
                  <span className="absolute -left-6 mt-1 inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF]" />
                  <p className="text-[11px] font-semibold bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent md:text-xs">
  {item.period}
</p>
                  <h4 className="mt-1 text-sm font-semibold text-[#1A1A2E]">
                    {item.role}
                  </h4>
                  <p className="text-[11px] font-medium text-[#9A9DBD] md:text-xs">
                    {item.company}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#8588A3] md:text-xs">
                    {item.description}
                  </p>
                  {index !== experience.length - 1 && (
                    <div className="mt-5 h-px w-10 bg-[#E0E3F3]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#1A1A2E]">
                Technical Skills
              </h3>
              <div className="mt-4 space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-[11px] text-[#6C6FA3] md:text-xs">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-[#EEF1FF]">
                      <div
                        className="skill-bar h-2 rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF]"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7F8FF] p-4">
              <h4 className="text-xs font-semibold text-[#1A1A2E] md:text-sm">
                Tools &amp; Technologies
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-[#6C6FA3] shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
