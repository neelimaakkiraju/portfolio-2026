import React from "react";
import styles from "./ParticleBackground.module.css";

const dots = Array.from({ length: 18 });

export default function ParticleBackground() {
  return (
    <div className={styles.particleField} aria-hidden="true">
      {dots.map((_, index) => {
        const left = `${(index * 37) % 100}%`;
        const top = `${(index * 19) % 100}%`;
        const delay = `${(index % 6) * 1.2}s`;
        const duration = `${10 + (index % 6) * 2}s`;
        return (
          <span
            key={index}
            className={styles.particle}
            style={{ left, top, animationDelay: delay, animationDuration: duration }}
          />
        );
      })}
    </div>
  );
}
