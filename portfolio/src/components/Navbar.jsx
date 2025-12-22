import React, { useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <header className="nav-slide-down fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-[#E3E6F0]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <div
          className="cursor-pointer text-sm font-semibold tracking-tight text-[#3B4C9B]"
          onClick={() => scrollToSection("home")}
        >
          Alex <span className="font-bold text-[#1A1A2E]">Morgan</span>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md border border-[#D0D4E7] px-3 py-1.5 text-xs font-medium text-[#1A1A2E] shadow-sm hover:bg-[#f3f5ff] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <div className="hidden items-center gap-8 text-xs font-medium text-[#6B7280] md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="transition-colors hover:text-[#3B4C9B]"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToSection("contact")}
          className="hidden rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF] px-5 py-1.5 text-xs font-semibold text-white shadow-md shadow-[#654BFF33] md:inline-block"
        >
          Let&apos;s Talk
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#E3E6F0] bg-white/95 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-[#6B7280]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left transition-colors hover:text-[#3B4C9B]"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-2 rounded-full bg-gradient-to-r from-[#654BFF] to-[#27C2FF] px-5 py-2 text-xs font-semibold text-white shadow-md shadow-[#654BFF33]"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
