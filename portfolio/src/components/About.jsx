import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

// UI/UX Design Icon (Painter's palette - white icon)
const UIIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white"/>
    <path d="M8 10C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8C7.45 8 7 8.45 7 9C7 9.55 7.45 10 8 10Z" fill="#654BFF"/>
    <path d="M12 8C12.55 8 13 7.55 13 7C13 6.45 12.55 6 12 6C11.45 6 11 6.45 11 7C11 7.55 11.45 8 12 8Z" fill="#654BFF"/>
    <path d="M16 10C16.55 10 17 9.55 17 9C17 8.45 16.55 8 16 8C15.45 8 15 8.45 15 9C15 9.55 15.45 10 16 10Z" fill="#654BFF"/>
    <path d="M9 13C8.45 13 8 13.45 8 14C8 14.55 8.45 15 9 15H15C15.55 15 16 14.55 16 14C16 13.45 15.55 13 15 13H9Z" fill="#654BFF"/>
    <path d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Frontend Development Icon (Angle brackets - white icon)
const FrontendIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6L3 12L8 18V15L6 12L8 9V6Z" fill="white"/>
    <path d="M16 6V9L18 12L16 15V18L21 12L16 6Z" fill="white"/>
  </svg>
);

// Mobile Apps Icon (Smartphone - white icon)
const MobileIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="2" width="10" height="20" rx="2" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="18" r="1" fill="white"/>
  </svg>
);

const services = [
  {
    title: "UI/UX Design",
    description:
      "Creating intuitive and beautiful interfaces that users love to interact with.",
    icon: <UIIcon />,
    iconBg: "bg-gradient-to-br from-[#4C5BFF] to-[#654BFF]",
  },
  {
    title: "Frontend Development",
    description:
      "Bringing designs to life with clean, efficient, and responsive code.",
    icon: <FrontendIcon />,
    iconBg: "bg-gradient-to-br from-[#4C5BFF] to-[#654BFF]",
  },
  {
    title: "Mobile Apps",
    description:
      "Developing mobile experiences that work seamlessly across all devices.",
    icon: <MobileIcon />,
    iconBg: "bg-gradient-to-br from-[#4C5BFF] to-[#654BFF]",
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
            Passionate about creating digital experiences that make a difference.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl bg-white p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
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
