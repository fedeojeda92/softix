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
      className="relative bg-bg-dark py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:mb-12"
        >
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            {t("tour.badge")}
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.75rem]">
            {t("tour.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/60 sm:text-base">
            {t("tour.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mx-auto"
          style={{ maxWidth: "1100px" }}
        >
          <div
            className="h-[50vh] w-full overflow-hidden md:h-[70vh]"
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(212, 207, 201, 0.2)",
            }}
          >
            <PanoramaViewer
              tourConfig={tourConfig}
              autoRotate={!reduced}
              onInteraction={handleInteraction}
              onSceneChange={handleSceneChange}
              onViewerReady={handleViewerReady}
            />
          </div>

          <ThumbnailStrip
            activeScene={activeScene}
            onSelectScene={handleSelectScene}
          />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-500 sm:bottom-6 ${
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
        </motion.div>
      </div>
    </section>
  );
}
