import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import ParticleBackground from "./ParticleBackground";
import { getHero, getPersonal } from "../data";
import styles from "./Hero.module.css";

const heroData = getHero();
const personalData = getPersonal();
const phrases = heroData.typewriterPhrases;

export default function Hero() {
  const { ref, isVisible } = useRevealOnScroll();
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState(phrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(phrases[0]);
      return undefined;
    }

    const currentPhrase = phrases[phraseIndex];
    const nextText = isDeleting
      ? currentPhrase.slice(0, text.length - 1)
      : currentPhrase.slice(0, text.length + 1);

    const timeout = setTimeout(
      () => {
        setText(nextText);

        if (!isDeleting && nextText === currentPhrase) {
          setIsDeleting(true);
        } else if (isDeleting && nextText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      },
      isDeleting ? 40 : 70
    );

    return () => clearTimeout(timeout);
  }, [isDeleting, phraseIndex, prefersReducedMotion, text]);

  return (
    <section id="home" ref={ref} className={`section ${styles.hero}`}>
      <ParticleBackground />
      <div
        className={`container revealOnScroll ${isVisible ? "isVisible" : ""}`}
      >
        <div className={styles.heroGrid}>
          <motion.div
            className={styles.copy}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className={styles.eyebrow}>{heroData.headline.includes("Design") ? "Design + Engineering" : heroData.headline}</span>
            <h1 className={styles.headline}>
              {heroData.headline}&nbsp;
              <span className="gradientText">{heroData.headlineHighlight}</span>
            </h1>
            <div className={styles.typewriter} aria-live="polite">
              <span>{text}</span>
              <span className={styles.cursor} aria-hidden="true" />
            </div>
            <p className={styles.subtitle}>
              {heroData.subtitle}
            </p>
            <div className={styles.ctaRow}>
              <a href={heroData.primaryCta.href} className="btn btnPrimary">
                {heroData.primaryCta.text}
              </a>
              <a href={heroData.secondaryCta.href} className="btn btnSecondary">
                {heroData.secondaryCta.text}
              </a>
            </div>
            <div className={styles.statRow}>
              {heroData.stats.map((stat, index) => (
                <span key={index} className={styles.statCard}>{stat}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.visual}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className={`${styles.glowOrb} ${styles.glowOne}`} />
            <div className={`${styles.glowOrb} ${styles.glowTwo}`} />
            <div className={styles.imageWrap}>
              <div className={styles.imageInner}>
                <img
                  src={personalData.avatarUrl}
                  alt={personalData.name}
                  width="480"
                  height="480"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
