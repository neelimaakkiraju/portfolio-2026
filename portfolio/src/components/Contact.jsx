import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function Contact() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      id="contact"
      className="mt-20 px-4 md:mt-24 md:px-6"
    >
      <div
        ref={ref}
        className={`reveal-on-scroll mx-auto max-w-5xl rounded-3xl bg-gradient-to-b from-[#F6F7FF] to-[#FDFDFF] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-10 ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">
            Let&apos;s Work Together
          </h2>
          <p className="mt-2 text-xs text-[#8588A3] md:text-sm">
            Ready to start your next project? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[0.9fr,1.1fr] md:items-start">
          <div className="space-y-5 text-sm text-[#4B4E6D]">
            <div className="flex items-start gap-3">
              <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#654BFF] shadow-sm">
                ✉️
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A9DBD]">
                  Email
                </p>
                <p className="mt-1 text-sm font-medium text-[#1A1A2E]">
                  hello@alexmorgan.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#27C2FF] shadow-sm">
                ☎️
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A9DBD]">
                  Phone
                </p>
                <p className="mt-1 text-sm font-medium text-[#1A1A2E]">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {["in", "dr", "be", "pi"].map((icon) => (
                <span
                  key={icon}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-semibold uppercase text-[#9A9DBD] shadow-sm"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          <form
            className="space-y-3 rounded-2xl bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-lg border border-[#E0E3F3] bg-[#F9FAFF] px-3 py-2 text-[11px] text-[#1A1A2E] outline-none placeholder:text-[#B0B3CD] focus:border-[#654BFF] md:text-xs"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-lg border border-[#E0E3F3] bg-[#F9FAFF] px-3 py-2 text-[11px] text-[#1A1A2E] outline-none placeholder:text-[#B0B3CD] focus:border-[#654BFF] md:text-xs"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full resize-none rounded-lg border border-[#E0E3F3] bg-[#F9FAFF] px-3 py-2 text-[11px] text-[#1A1A2E] outline-none placeholder:text-[#B0B3CD] focus:border-[#654BFF] md:text-xs"
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF] px-5 py-2 text-xs font-semibold text-white shadow-md shadow-[#654BFF33]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
