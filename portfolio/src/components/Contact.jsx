import React from "react";


export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-900 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="text-gray-400 mb-6">
        Let’s build something amazing together
      </p>
      <a
        href="mailto:yourmail@gmail.com"
        className="px-6 py-3 bg-primary rounded-lg"
      >
        Email Me
      </a>
    </section>
  );
}
