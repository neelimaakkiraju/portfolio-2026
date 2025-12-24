import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

// UI/UX Design Icon (Painter's palette - white icon)
const UIIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="6" rx="2" fill="white"/>
    <rect x="3" y="14" width="10" height="6" rx="2" fill="white"/>
    <rect x="15" y="14" width="6" height="6" rx="2" fill="white"/>
  </svg>
);

// Frontend Development Icon (Angle brackets - white icon)
const FrontendIcon = () => (
   <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2L3 14H11L9 22L21 9H13L13 2Z"
      fill="white"
    />
  </svg>
);

// Mobile Apps Icon (Smartphone - white icon)
const MobileIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="2" fill="white"/>
    <rect x="14" y="3" width="7" height="7" rx="2" fill="white"/>
    <rect x="3" y="14" width="7" height="7" rx="2" fill="white"/>
    <rect x="14" y="14" width="7" height="7" rx="2" fill="white"/>
  </svg>
);

const services = [
  {
    title: "UI Development",
    description:
      "Building responsive, user-friendly interfaces with React and Tailwind CSS.",
    icon: <UIIcon />,
    iconBg: "bg-gradient-to-r from-[#654BFF] to-[#27C2FF]",
  },
  {
    title: "Performance Optimization",
    description:
      "Improving speed, SEO, and overall frontend performance.",
    icon: <FrontendIcon />,
    iconBg: "bg-gradient-to-r from-[#654BFF] to-[#27C2FF]",
  },
  {
    title: "Scalable Architecture",
    description:
      "Writing clean, reusable code and integrating APIs for real-world products.",
    icon: <MobileIcon />,
    iconBg: "bg-gradient-to-r from-[#654BFF] to-[#27C2FF]",
  },
];

export default function About() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section id="about" className="bg-white py-20">
      <div
        ref={ref}
        className={`reveal-on-scroll mx-auto max-w-5xl px-4 md:px-6 ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">About Me</h2>
          <p className="mt-2 text-xs text-[#8588A3] md:text-sm">
           Frontend developer creating modern, responsive, and scalable web applications.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl  bg-gradient-to-br from-blue-50 to-purple-50 p-5 text-left"
            >
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${service.iconBg}`}>
                {service.icon}
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
