import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const experience = [
  {
    period: "2022 - Present",
    role: "Senior UI/UX Designer",
    company: "Creative Studios Inc.",
    description:
      "Leading design initiatives for major clients, creating user-centered solutions that drive engagement and conversion.",
  },
  {
    period: "2020 - 2022",
    role: "Frontend Developer",
    company: "Tech Innovations Ltd.",
    description:
      "Developed responsive web applications using modern frameworks and ensured optimal performance across devices.",
  },
  {
    period: "2018 - 2020",
    role: "UI Designer",
    company: "Digital Agency Pro",
    description:
      "Crafted beautiful interfaces for web and mobile applications, collaborating with cross-functional teams.",
  },
];

const skills = [
  { name: "UI/UX Design", value: 95 },
  { name: "React & Next.js", value: 90 },
  { name: "Figma & Adobe XD", value: 92 },
  { name: "HTML/CSS/JavaScript", value: 88 },
  { name: "Mobile Development", value: 85 },
];

const tools = [
  "Figma",
  "React",
  "Tailwind",
  "TypeScript",
  "Node.js",
  "Git",
  "Photoshop",
  "Illustrator",
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
                  <p className="text-[11px] font-semibold text-[#6C6FA3] md:text-xs">
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
