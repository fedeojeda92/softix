"use client";

import { useEffect, useRef, useCallback } from "react";

interface PanoramaViewerProps {
  imageSrc: string;
  autoRotate?: boolean;
  onInteraction?: () => void;
}

export default function PanoramaViewer({
  imageSrc,
  autoRotate = true,
  onInteraction,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<unknown>(null);
  const blobUrlRef = useRef<string | null>(null);

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve();
      s.onerror = reject;
      document.head.appendChild(s);
    });

  const loadStyle = (href: string) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  };

  const init = useCallback(async () => {
    if (!containerRef.current) return;

    loadStyle("/pannellum.css");
    await loadScript("/pannellum.js");

    const pannellum = window.pannellum;
    if (!pannellum || !containerRef.current) return;

    if (
      viewerRef.current &&
      typeof viewerRef.current === "object" &&
      "destroy" in viewerRef.current
    ) {
      (viewerRef.current as { destroy: () => void }).destroy();
    }

    const viewer = pannellum.viewer(containerRef.current, {
      type: "equirectangular",
      panorama: imageSrc,
      autoLoad: true,
      autoRotate: autoRotate ? -2 : 0,
      compass: false,
      showZoomCtrl: true,
      mouseZoom: true,
      draggable: true,
    });

    viewerRef.current = viewer;

    if (onInteraction) {
      const el = containerRef.current;
      const handler = () => {
        onInteraction();
        el.removeEventListener("pointerdown", handler);
      };
      el.addEventListener("pointerdown", handler);
    }
  }, [imageSrc, autoRotate, onInteraction]);

  useEffect(() => {
    init();

    return () => {
      if (
        viewerRef.current &&
        typeof viewerRef.current === "object" &&
        "destroy" in viewerRef.current
      ) {
        (viewerRef.current as { destroy: () => void }).destroy();
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden rounded-[12px]"
      style={{ background: "#12110F" }}
    />
  );
}
