import React from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export default function Contact() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      id="contact"
      className="bg-[#FAFAFA] py-20"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div
          ref={ref}
          className={`reveal-on-scroll rounded-3xl bg-gradient-to-b from-[#F6F7FF] to-[#FDFDFF] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] md:p-10 ${
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

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-5 text-sm text-[#4B4E6D]">
            <div className="flex items-start gap-3">
              <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#654BFF] to-[#27C2FF] shadow-sm">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M22 6L12 13L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
              <div className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#654BFF] to-[#27C2FF] shadow-sm">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.4 21 0 11.6 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.24 0.08L6.04 4.16C6.12 4.76 5.72 5.32 5.12 5.4L3.24 5.68C4.56 8.48 7.52 11.44 10.32 12.76L10.6 10.88C10.68 10.28 11.24 9.88 11.84 9.96L15.92 10.76C16.52 10.84 17 11.32 17 11.92V14.92C17 15.52 16.52 16 15.92 16H12.92" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
              <a
                href="https://linkedin.com/in/alexmorgan"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#654BFF] to-[#27C2FF] shadow-sm transition-transform hover:scale-110"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.1 8 18 8.9 18 10V18C18 19.1 17.1 20 16 20H14V13.9C14 12.3 13.3 12 12.2 12C11.1 12 10.5 12.6 10.5 13.9V20H8.5V10H10.5V11.2C10.9 10.5 11.6 10 12.7 10C14.2 10 15.5 11.1 15.5 13.5V20H16V8ZM6 8C7.1 8 8 8.9 8 10V18C8 19.1 7.1 20 6 20H4C2.9 20 2 19.1 2 18V10C2 8.9 2.9 8 4 8H6ZM5 6C3.9 6 3 5.1 3 4C3 2.9 3.9 2 5 2C6.1 2 7 2.9 7 4C7 5.1 6.1 6 5 6Z" fill="white"/>
                </svg>
              </a>
              <a
                href="https://github.com/alexmorgan"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#654BFF] to-[#27C2FF] shadow-sm transition-transform hover:scale-110"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 5.58 20 10 21C10.55 21.08 10.75 20.73 10.75 20.42C10.75 20.15 10.73 19.25 10.73 18.42C8 18.92 7.35 17.92 7.15 17.35C7.05 17.08 6.5 16.08 5.95 15.75C5.5 15.5 4.85 14.92 5.95 14.92C7 14.92 7.55 15.92 7.75 16.25C8.5 17.5 9.7 17.17 10.75 16.83C10.85 16.17 11.15 15.75 11.5 15.5C8.5 15.17 5.35 14.17 5.35 10.5C5.35 9.42 5.75 8.5 6.35 7.83C6.25 7.58 5.85 6.5 6.5 5.17C6.5 5.17 7.35 4.92 10.75 6.5C11.5 6.33 12.5 6.25 13.5 6.25C14.5 6.25 15.5 6.33 16.25 6.5C19.65 4.92 20.5 5.17 20.5 5.17C21.15 6.5 20.75 7.58 20.65 7.83C21.25 8.5 21.65 9.42 21.65 10.5C21.65 14.17 18.5 15.17 15.5 15.5C15.95 15.83 16.35 16.5 16.35 17.5C16.35 18.92 16.33 20.08 16.33 20.42C16.33 20.73 16.53 21.08 17.08 21C21.42 20 25 16.42 25 12C25 6.48 20.52 2 15 2H12Z" fill="white"/>
                </svg>
              </a>
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
      </div>
    </section>
  );
}
