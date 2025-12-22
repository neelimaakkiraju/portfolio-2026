import React from "react";


const projects = [
  {
    name: "E-Commerce App",
    repo: "https://github.com/yourname/ecommerce",
    live: "https://ecommerce.vercel.app",
  },
  {
    name: "Portfolio Website",
    repo: "https://github.com/yourname/portfolio",
    live: "https://portfolio.vercel.app",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className="bg-gray-900 p-6 rounded-xl hover:scale-105 transition"
            >
              <h3 className="font-semibold text-xl">{p.name}</h3>
              <div className="mt-4 flex gap-4">
                <a href={p.repo} target="_blank" className="text-primary">
                  GitHub
                </a>
                <a href={p.live} target="_blank" className="text-primary">
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
