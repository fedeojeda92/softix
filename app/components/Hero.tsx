"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../lib/LanguageContext";

const SLIDES = [
  {
    image: "/images/Imagen_hero_1.jpg",
    phraseKey: "hero.slide1",
    cta: { labelKey: "hero.cta", href: "#servicios" },
  },
  {
    image: "/images/Imagen_hero_2.jpg",
    phraseKey: "hero.slide2",
  },
  {
    image: "/images/Imagen_hero_3.jpg",
    phraseKey: "hero.slide3",
  },
  {
    image: "/images/Imagen_hero_4.jpg",
    phraseKey: "hero.slide4",
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

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-bg-dark">
      {/* Background slides — absolute, behind everything */}
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
              src={SLIDES[current].image}
              alt="Softix - Servicios digitales para inmobiliarias"
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(45,41,38,0.8) 0%, rgba(45,41,38,0.3) 15%, transparent 35%)" }} />
        </motion.div>
      </AnimatePresence>

      {/* Text content — pushed to bottom via mt-auto */}
      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-7xl flex-col px-5 pb-24 pt-4 sm:px-6 lg:px-10">
        <motion.h1
          key={`h1-${current}`}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.4, duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl font-display font-semibold leading-[1.15] text-white"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 2.5rem)",
          }}
        >
          {t(SLIDES[current].phraseKey)}
        </motion.h1>

        {SLIDES[current].cta && (
          <motion.a
            key={`cta-${current}`}
            href={SLIDES[current].cta!.href}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.7, duration: 0.5, ease: "easeOut" }}
            whileTap={{ scale: 0.96 }}
            className="mt-6 inline-block w-fit rounded-full bg-forest px-7 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-forest/90 sm:mt-8 sm:px-8 sm:py-3.5"
          >
            {t(SLIDES[current].cta!.labelKey)}
          </motion.a>
        )}
      </div>

      {/* Arrows */}
      <motion.button
        onClick={prev}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        aria-label="Slide anterior"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white sm:left-5 sm:h-11 sm:w-11 lg:left-8"
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
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 backdrop-blur-sm transition-colors hover:border-white/40 hover:text-white sm:right-5 sm:h-11 sm:w-11 lg:right-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>

      {/* Progress bars */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-10">
        {SLIDES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label={`Ir al slide ${i + 1}`}
            className="group relative h-[3px] w-10 overflow-hidden rounded-full bg-white/20 sm:w-12"
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
    </section>
  );
}
