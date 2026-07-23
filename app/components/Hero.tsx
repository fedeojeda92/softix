"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

const SLIDES = [
  {
    image: "/images/hero_1.jpg",
    imageMobile: "/images/hero_mobile_1.jpg",
    phraseKey: "hero.slide1",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/hero_2.jpg",
    imageMobile: "/images/hero_mobile_2.jpg",
    phraseKey: "hero.slide2",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/hero_3.jpg",
    imageMobile: "/images/hero_mobile_3.jpg",
    phraseKey: "hero.slide3",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/hero_4.jpg",
    imageMobile: "/images/hero_mobile_4.jpg",
    phraseKey: "hero.slide4",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
];

const INTERVAL = 6000;

const FLOATING_DOTS = [
  { x: "8%", y: "20%", size: 3, color: "bg-forest/20", delay: 0, duration: 7 },
  { x: "92%", y: "15%", size: 2, color: "bg-bronze/15", delay: 1.5, duration: 6 },
  { x: "85%", y: "75%", size: 4, color: "bg-forest/15", delay: 0.8, duration: 8 },
  { x: "12%", y: "80%", size: 3, color: "bg-bronze/20", delay: 2, duration: 5 },
  { x: "50%", y: "8%", size: 2, color: "bg-white/10", delay: 1, duration: 7 },
  { x: "70%", y: "40%", size: 2, color: "bg-forest/15", delay: 3, duration: 6 },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function AnimatedHeadline({
  text,
  reduced,
  delay,
}: {
  text: string;
  reduced: boolean;
  delay: number;
}) {
  const words = text.split(" ");

  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={reduced ? false : { opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
          transition={{
            delay: reduced ? 0 : delay + i * 0.08,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const { t } = useLang();

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(idx);
    },
    [],
  );

  const prev = () =>
    goTo(current === 0 ? SLIDES.length - 1 : current - 1);
  const next = () =>
    goTo(current === SLIDES.length - 1 ? 0 : current + 1);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, reduced]);

  const slide = SLIDES[current];

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-dark">
      {/* Background slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={reduced ? { scale: 1.04 } : { scale: 1 }}
            animate={{ scale: reduced ? 1.04 : 1.08 }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          >
            <Image
              src={isMobile ? slide.imageMobile : slide.image}
              alt="Fersion Tech - Servicios digitales para inmobiliarias"
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,23,21,0.95) 0%, rgba(26,23,21,0.7) 30%, rgba(26,23,21,0.3) 60%, rgba(26,23,21,0.15) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating dots */}
      {FLOATING_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className={`absolute z-10 rounded-full ${dot.color}`}
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      {/* Text content - centered */}
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.span
              key={`badge-${current}`}
              initial={reduced ? false : { opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ delay: reduced ? 0 : 0.3, duration: 0.5, ease: "easeOut" }}
              className="mb-5 inline-block rounded-full border border-forest/30 bg-black/40 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-md shadow-lg shadow-black/20 sm:text-sm"
            >
              {t("hero.badge")}
            </motion.span>

            {/* Headline */}
            <h1
              className="max-w-3xl font-display font-semibold leading-[1.15] text-white sm:max-w-4xl"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 4.5rem)",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 12px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.25)",
              }}
            >
              <AnimatedHeadline
                text={t(slide.phraseKey)}
                reduced={reduced}
                delay={reduced ? 0 : 0.5}
              />
            </h1>

            {/* Decorative line */}
            <motion.span
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ delay: reduced ? 0 : 1.2, duration: 0.4, ease: "easeOut" }}
              className="mt-6 h-[1.5px] w-12 bg-forest/50 sm:mt-8"
            />

            {/* CTA */}
            <motion.a
              href={slide.cta!.href}
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: reduced ? 0 : 1.4, duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-body text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:mt-8 sm:px-7 sm:py-3.5 sm:text-base"
            >
              {t(slide.cta!.labelKey)}
              <motion.span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div
        className="pointer-events-none absolute left-3 z-20 sm:left-5 lg:left-8"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label="Slide anterior"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white sm:h-11 sm:w-11"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </motion.button>
      </div>

      <div
        className="pointer-events-none absolute right-3 z-20 sm:right-5 lg:right-8"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label="Siguiente slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white sm:h-11 sm:w-11"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8 lg:bottom-10">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label={`Ir al slide ${i + 1}`}
              className="group relative h-[3px] w-8 overflow-hidden rounded-full bg-white/15 sm:w-10"
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-white/50"
                style={{
                  width: i === current ? "100%" : i < current ? "100%" : "0%",
                  transition: i === current ? "none" : "width 0.3s ease",
                }}
              />
              {i === current && !reduced && (
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-forest"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
