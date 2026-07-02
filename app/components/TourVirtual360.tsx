"use client";

import { useState, useCallback, useEffect } from "react";
import PanoramaViewer from "./PanoramaViewer";

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
  const reduced = usePrefersReducedMotion();

  const handleInteraction = useCallback(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="tour-360"
      className="relative bg-bg-dark py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 text-center md:mb-16">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
            Tour Virtual
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-[2.75rem]">
            Explorá el espacio como si estuvieras ahí
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-sm leading-relaxed text-white/60 sm:text-base">
            Esta es exactamente la tecnología que se integra en la web de cada
            inmobiliaria cliente: recorridos inmersivos, sin plugins, desde
            cualquier dispositivo.
          </p>
        </div>

        {/* Viewer container — 50vh mobile, 70vh desktop */}
        <div className="relative mx-auto" style={{ maxWidth: "1100px" }}>
          <div
            className="h-[50vh] w-full overflow-hidden md:h-[70vh]"
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(220, 214, 204, 0.2)",
            }}
          >
            <PanoramaViewer
              imageSrc="/images/Imagen_360_prueba.jpg"
              autoRotate={!reduced}
              onInteraction={handleInteraction}
            />
          </div>

          {/* Drag hint */}
          <div
            className={`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-500 sm:bottom-6 ${
              showHint ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 rounded-full bg-bg-dark/80 px-4 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5">
              {/* Hand/drag icon */}
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
                Arrastrá para mirar alrededor
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
