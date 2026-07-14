"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

const SLIDES = [
  {
    image: "/images/hero_1.jpg",
    phraseKey: "hero.slide1",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/hero_2.jpg",
    phraseKey: "hero.slide2",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/hero_3.jpg",
    phraseKey: "hero.slide3",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/hero_4.jpg",
    phraseKey: "hero.slide4",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
];

const INTERVAL = 6000;

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
  const total = SLIDES.length;

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-bg-dark">
      {/* ── Background slides ── */}
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
              src={slide.image}
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
                "linear-gradient(to top, rgba(45,41,38,0.92) 0%, rgba(45,41,38,0.55) 25%, rgba(45,41,38,0.15) 55%, transparent 70%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Text content ── */}
      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-7xl flex-col px-5 pb-20 pt-4 sm:px-6 sm:pb-24 lg:px-10 xl:max-w-[90rem] xl:pb-32 2xl:pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.span
              key={`badge-${current}`}
              initial={reduced ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              transition={{ delay: reduced ? 0 : 0.3, duration: 0.5, ease: "easeOut" }}
              className="mb-4 w-fit rounded-full border border-white/20 bg-ink/60 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm sm:mb-5 sm:text-sm lg:text-base"
              style={{
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              {t("hero.badge")}
            </motion.span>

            {/* Headline — word-by-word stagger + clip-path reveal */}
            <h1
              className="max-w-2xl font-display font-semibold leading-[1.15] text-white xl:max-w-4xl 2xl:max-w-5xl"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 5rem)",
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

            {/* Decorative line + CTA — all slides */}
            <div className="mt-6 flex flex-col gap-5 sm:mt-8">
              {/* Line */}
              <motion.span
                initial={reduced ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ delay: reduced ? 0 : 1.4, duration: 0.4, ease: "easeOut" }}
                className="h-[1.5px] w-12 origin-left bg-white/30"
              />

              {/* CTA */}
              <motion.a
                href={slide.cta!.href}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ delay: reduced ? 0 : 1.6, duration: 0.5, ease: "easeOut" }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-body text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-base lg:text-lg"
              >
                {t(slide.cta!.labelKey)}
                <motion.span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Arrows ── */}
      <motion.button
        onClick={prev}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white sm:left-5 sm:h-11 sm:w-11 lg:left-8 xl:left-12 xl:h-12 xl:w-12"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </motion.button>

      <motion.button
        onClick={next}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="Siguiente slide"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white sm:right-5 sm:h-11 sm:w-11 lg:right-8 xl:right-12 xl:h-12 xl:w-12"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>

      {/* ── Slide counter ── */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-10 lg:bottom-12 xl:bottom-16">
        <motion.span
          key={`counter-${current}`}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-xs tabular-nums text-white/50 sm:text-sm lg:text-base"
        >
          {String(current + 1).padStart(2, "0")}
        </motion.span>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileTap={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label={`Ir al slide ${i + 1}`}
              className="group relative h-[3px] w-8 overflow-hidden rounded-full bg-white/20 sm:w-10 lg:h-[4px] lg:w-12"
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{
                  width: i === current ? "100%" : i < current ? "100%" : "0%",
                  transition: i === current ? "none" : "width 0.3s ease",
                }}
              />
              {i === current && !reduced && (
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.span
          key={`total-${current}`}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-xs tabular-nums text-white/50 sm:text-sm lg:text-base"
        >
          / {String(total).padStart(2, "0")}
        </motion.span>
      </div>
    </section>
  );
}
