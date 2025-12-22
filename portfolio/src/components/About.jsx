import { motion } from "framer-motion";
import React from "react";

export default function About() {
  return (
    <section id="about" className="py-24 max-w-5xl mx-auto px-6">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-400 leading-relaxed">
          I’m a passionate frontend developer with experience in React,
          Tailwind, and modern JavaScript. I enjoy building clean UI,
          smooth interactions, and scalable applications.
        </p>
      </motion.div>
    </section>
  );
}
