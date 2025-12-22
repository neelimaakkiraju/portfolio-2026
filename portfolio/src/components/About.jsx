import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const services = [
  {
    title: "UI Development",
    description:
      "Building responsive, user-friendly interfaces with React and Tailwind CSS.",
    icon: "✨",
  },
  {
    title: "Performance & Optimization",
    description:
      "Improving speed, SEO, and overall frontend performance.",
    icon: "💻",
  },
  {
    title: "Scalable Frontend Architecture",
    description:
      "Writing clean, reusable code and integrating APIs for real-world products.",
    icon: "📱",
  },
];

export default function About() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="about" className="mt-20 px-4 md:mt-24 md:px-6">
      <div
        ref={ref}
        className={`reveal-on-scroll mx-auto max-w-5xl rounded-3xl bg-white/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] md:p-10 ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">About Me</h2>
          <p className="mt-2 text-xs text-[#8588A3] md:text-sm">
          I’m a frontend developer who builds clean, intuitive, and high-performance web interfaces using React, Next.js, and Tailwind CSS. I focus on scalable UI, strong UX, and turning complex ideas into simple, user-friendly solutions.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl bg-[#F7F8FF] p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-lg shadow-sm">
                <span>{service.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-[#1A1A2E]">
                {service.title}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-[#8588A3] md:text-xs">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
