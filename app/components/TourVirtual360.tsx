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
      className="relative bg-bg-dark"
      style={{ minHeight: "100dvh" }}
    >
      <div className="py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10 mb-4 text-center md:mb-5"
        >
          <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze md:mb-3">
            {t("tour.badge")}
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-xl font-semibold leading-tight text-white sm:text-2xl md:text-[2.5rem]">
            {t("tour.title")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-sm leading-relaxed text-white/60 sm:text-base md:mt-3">
            {t("tour.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div
            className="relative w-full overflow-hidden h-[42vh] sm:h-[48vh] md:h-[52vh] lg:h-[58vh]"
            style={{
              borderRadius: "0",
            }}
          >
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
                className="flex items-center gap-2 rounded-full bg-bg-dark/80 px-4 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5"
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
