import React from "react";


import { motion } from "framer-motion";


export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Hi, I’m <span className="text-primary">Neelima</span>
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Frontend Developer building beautiful, responsive and performant web
          applications using React.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 bg-primary rounded-lg"
          >
            Download Resume
          </a>
          <a
            href="#projects"
            className="px-6 py-3 border border-primary rounded-lg"
          >
            View Projects
          </a>
        </div>
      </motion.div>
    </section>
  );
}
