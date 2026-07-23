"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PanoramaViewer from "./PanoramaViewer";
import ThumbnailStrip from "./ThumbnailStrip";
import { tourConfig } from "../data/tour-config";
import { useLang } from "../lib/LanguageContext";

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

const FLOATING_DOTS = [
  { x: "8%", y: "18%", size: 3, color: "bg-forest/20", delay: 0, duration: 7 },
  { x: "92%", y: "12%", size: 2, color: "bg-bronze/15", delay: 1.5, duration: 6 },
  { x: "85%", y: "78%", size: 4, color: "bg-forest/15", delay: 0.8, duration: 8 },
  { x: "10%", y: "82%", size: 3, color: "bg-bronze/20", delay: 2, duration: 5 },
  { x: "50%", y: "5%", size: 2, color: "bg-white/10", delay: 1, duration: 7 },
];

export default function TourVirtual360() {
  const [showHint, setShowHint] = useState(true);
  const [activeScene, setActiveScene] = useState(tourConfig.firstScene);
  const loadSceneRef = useRef<((sceneId: string) => void) | null>(null);
  const reduced = usePrefersReducedMotion();
  const { t } = useLang();

  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInteraction = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => setShowHint(false), 3000);
  }, []);

  const handleSceneChange = useCallback((sceneId: string) => {
    setActiveScene(sceneId);
  }, []);

  const handleViewerReady = useCallback(
    (loadSceneFn: (sceneId: string) => void) => {
      loadSceneRef.current = loadSceneFn;
    },
    [],
  );

  const handleSelectScene = useCallback((sceneId: string) => {
    loadSceneRef.current?.(sceneId);
    setActiveScene(sceneId);
  }, []);

  return (
    <section
      id="tour-360"
      className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#1a1715]"
    >
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

      <div className="relative z-20 flex flex-1 flex-col py-6 sm:py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10 mb-6 text-center md:mb-8"
        >
          <motion.span
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 inline-block rounded-full border border-forest/20 bg-forest/10 px-5 py-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-forest backdrop-blur-sm sm:text-sm"
          >
            {t("tour.badge")}
          </motion.span>
          <h2 className="mx-auto max-w-2xl font-display text-xl font-semibold leading-tight text-white sm:text-2xl md:text-[2.5rem]">
            {t("tour.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-white/55 sm:text-base md:mt-4">
            {t("tour.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex min-h-0 flex-1 flex-col"
        >
          <div className="relative min-h-0 w-full flex-1 overflow-hidden">
            <PanoramaViewer
              tourConfig={tourConfig}
              autoRotate={!reduced}
              onInteraction={handleInteraction}
              onSceneChange={handleSceneChange}
              onViewerReady={handleViewerReady}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className={`pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500 sm:bottom-4 ${
                showHint ? "opacity-100" : "opacity-0"
              }`}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-bg-dark/80 px-4 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-white/70"
                  aria-hidden="true"
                >
                  <path d="M18 11V6a2 2 0 0 0-4 0v1" />
                  <path d="M14 10V4a2 2 0 0 0-4 0v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
                <span className="font-body text-xs font-medium text-white/70">
                  {t("tour.hint")}
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
            <ThumbnailStrip
              activeScene={activeScene}
              onSelectScene={handleSelectScene}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
