import React, { useEffect, useMemo, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";

import Portrait from "./ui/Portrait";
import { EASE } from "./ui/motionTokens";
import { getHero, getPersonal } from "../data";
import {
  CATEGORY,
  trackCta,
  trackEvent,
  trackResumeDownload,
} from "../lib/analytics";
import styles from "./Hero.module.css";

const hero = getHero();
const personal = getPersonal();
const phrases = hero.typewriterPhrases;

function useTypewriter(enabled) {
  const [text, setText] = useState(phrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

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
  }, [enabled, isDeleting, phraseIndex, text]);

  /* When motion is off, always show the first phrase in full. */
  return enabled ? text : phrases[0];
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const text = useTypewriter(!prefersReducedMotion);

  /* Longest phrase reserves the line box so the typewriter can't shift layout. */
  const longestPhrase = useMemo(
    () => phrases.reduce((a, b) => (b.length > a.length ? b : a), ""),
    []
  );

  const fadeUp = (delay) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.62, ease: EASE, delay },
        };

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <Motion.p className={styles.status} {...fadeUp(0)}>
              <span className={styles.statusDot} aria-hidden="true" />
              {hero.status}
            </Motion.p>

            <Motion.p className={styles.identity} {...fadeUp(0.05)}>
              {personal.name}
            </Motion.p>

            <Motion.h1 id="hero-title" className={styles.headline} {...fadeUp(0.1)}>
              {hero.headline}
            </Motion.h1>

            {/* The animated text is decorative — a live region that updates on
                every keystroke is unusable with a screen reader, so the roles
                are exposed once as static text instead. */}
            <Motion.p className={styles.specialization} {...fadeUp(0.16)}>
              <span className="srOnly">{phrases.join(" · ")}</span>
              <span className={styles.specializationInner} aria-hidden="true">
                <span className={styles.specializationReserve}>{longestPhrase}</span>
                <span className={styles.specializationText}>
                  {text}
                  {!prefersReducedMotion && <span className={styles.caret} />}
                </span>
              </span>
            </Motion.p>

            <Motion.p className={styles.subtitle} {...fadeUp(0.22)}>
              {hero.subtitle}
            </Motion.p>

            <Motion.div className={styles.ctaRow} {...fadeUp(0.28)}>
              <a
                href={hero.primaryCta.href}
                className="btn btnPrimary btnLg"
                onClick={() =>
                  trackCta({
                    label: hero.primaryCta.text,
                    section: "hero",
                    component: "hero_primary_cta",
                    destination: hero.primaryCta.href,
                  })
                }
              >
                {hero.primaryCta.text}
                <FiArrowDown aria-hidden="true" />
              </a>

              <a
                href={personal.resumeUrl}
                download
                className="btn btnSecondary btnLg"
                onClick={() =>
                  trackResumeDownload({
                    section: "hero",
                    component: "hero_secondary_cta",
                    url: personal.resumeUrl,
                  })
                }
              >
                <FiDownload aria-hidden="true" />
                {hero.secondaryCta.text}
              </a>
            </Motion.div>

            <Motion.div className={styles.techRow} {...fadeUp(0.34)}>
              <span className={styles.techLabel}>Core stack</span>
              <ul className={styles.techList}>
                {hero.techBadges.map((tech) => (
                  <li key={tech}>
                    <button
                      type="button"
                      className={`chip ${styles.techChip}`}
                      onClick={() =>
                        trackEvent({
                          action: "tech_badge_click",
                          category: CATEGORY.ENGAGEMENT,
                          label: tech,
                          metadata: {
                            section: "hero",
                            component: "tech_badges",
                            technology: tech,
                          },
                        })
                      }
                    >
                      {tech}
                    </button>
                  </li>
                ))}
              </ul>
            </Motion.div>
          </div>

          <Motion.div
            className={styles.visual}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <Portrait
              src={personal.avatarUrl || undefined}
              alt={`${personal.name}, ${personal.role}`}
              monogram={personal.monogram}
              size={460}
              priority
            />
          </Motion.div>
        </div>

        <Motion.div className={styles.proof} {...fadeUp(0.4)}>
          <dl className={styles.stats}>
            {hero.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.socialProof}>{hero.socialProof}</p>
        </Motion.div>
      </div>
    </section>
  );
}
