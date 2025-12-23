import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function Hero() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      id="home"
      ref={ref}
      className={`reveal-on-scroll bg-gradient-to-b from-[#F3F6FF] via-[#F5F7FF] to-white py-32 md:py-40 ${
        isVisible ? "is-visible" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 md:flex-row md:items-stretch md:gap-16 md:px-6">
        <div className="order-2 w-full md:order-1 md:w-1/2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9094B2]">
         REACT SPECIALIST
        </p>
          <h1 className="text-3xl font-extrabold leading-tight text-[#1A1A2E] sm:text-4xl lg:text-[40px]">
            Creative <span className="bg-gradient-to-r from-[#4C5BFF] to-[#654BFF] bg-clip-text text-transparent">Frontend</span>  Developer
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#8588A3] sm:text-[13px]">
           Frontend Developer with 2+ years of experience building high-performance, responsive web applications using React, Next.js, and TypeScript. I focus on clean UI, smooth user experiences, and scalable frontend architecture.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF] px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-[#654BFF33]"
            >
              View My Work
            </a>
            <a
              href="https://drive.google.com/file/d/1rmRlzjZ9EFXcnu3AtJGgAZn7FLI78vAk/view?usp=sharing"
              className="rounded-full border border-[#D0D4E7] bg-white px-5 py-2 text-xs font-semibold text-[#1A1A2E] shadow-sm hover:bg-[#f3f6ff]"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="order-1 relative flex w-full justify-center md:order-2 md:w-1/2">
        <div className="hero-photo-float relative h-60 w-60 rounded-full bg-gradient-to-b from-[#F2F5FF] to-[#E4F2FF] shadow-[0_18px_40px_rgba(101,75,255,0.18)] sm:h-72 sm:w-72 md:h-80 md:w-80">
          <div className="absolute inset-4 overflow-hidden rounded-full bg-[#FDFDFE]">
            {/* Replace this with your actual photo */}
            <div className="flex h-full items-center justify-center text-xs font-medium text-[#A0A3C0]">
              Add your photo here
            </div>
          </div>
          {/* Decorative circular shapes */}
          <div className="absolute -top-3 -right-2 h-10 w-10 rounded-full bg-[#E1E6FF]/60 blur-sm" />
          <div className="absolute bottom-6 -left-4 h-16 w-16 rounded-full bg-[#E6F7FF]/60 blur-sm" />
          <div className="absolute top-1/2 -right-8 h-12 w-12 rounded-full bg-[#E1E6FF]/40 blur-sm" />
          <div className="absolute top-1/4 -left-6 h-8 w-8 rounded-full bg-[#E6F7FF]/50 blur-sm" />
        </div>
        </div>
      </div>
    </section>
  );
}
