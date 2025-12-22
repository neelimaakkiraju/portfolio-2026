import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/70 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold text-primary">Neelima</h1>
        <div className="space-x-6 hidden md:block">
          {["about", "experience", "projects", "contact"].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-primary">
              {item.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
