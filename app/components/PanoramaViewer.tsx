"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { TourConfig } from "../data/tour-config";

interface PanoramaViewerProps {
  tourConfig: TourConfig;
  autoRotate?: boolean;
  onInteraction?: () => void;
  onSceneChange?: (sceneId: string) => void;
  onViewerReady?: (loadScene: (sceneId: string) => void) => void;
}

function DebugOverlay({ coords }: { coords: { pitch: number; yaw: number } }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 50,
        background: "rgba(0,0,0,0.75)",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 13,
        fontFamily: "monospace",
        lineHeight: 1.5,
        pointerEvents: "none",
      }}
    >
      <div>
        <strong>Debug Mode</strong>
      </div>
      <div>pitch: {coords.pitch.toFixed(2)}</div>
      <div>yaw: {coords.yaw.toFixed(2)}</div>
    </div>
  );
}

let tooltipStyleInjected = false;

function injectTooltipStyles() {
  if (tooltipStyleInjected) return;
  tooltipStyleInjected = true;
  const style = document.createElement("style");
  style.textContent = `
    .tour-hotspot-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .tour-hotspot-wrapper:hover {
      transform: scale(1.15);
    }
    .tour-pin {
      width: 20px;
      height: 20px;
      border-radius: 50% 50% 50% 0;
      background: #8B7355;
      transform: rotate(-45deg);
      border: 2px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      transition: background 0.2s ease;
      position: relative;
    }
    .tour-hotspot-wrapper:hover .tour-pin {
      background: #a08a6a;
    }
    .tour-pin-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .tour-label {
      white-space: nowrap;
      font-size: 12px;
      font-family: sans-serif;
      font-weight: 600;
      color: #fff;
      background: rgba(0,0,0,0.7);
      padding: 3px 8px;
      border-radius: 4px;
      line-height: 1.3;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

function createCustomTooltip(hotSpotDiv: HTMLElement, args: { text: string }) {
  injectTooltipStyles();

  const wrapper = document.createElement("div");
  wrapper.className = "tour-hotspot-wrapper";

  const pin = document.createElement("div");
  pin.className = "tour-pin";

  const dot = document.createElement("div");
  dot.className = "tour-pin-dot";
  pin.appendChild(dot);

  const label = document.createElement("div");
  label.className = "tour-label";
  label.textContent = args.text;

  wrapper.appendChild(pin);
  wrapper.appendChild(label);
  hotSpotDiv.appendChild(wrapper);
}

export default function PanoramaViewer({
  tourConfig,
  autoRotate = true,
  onInteraction,
  onSceneChange,
  onViewerReady,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PannellumViewer | null>(null);
  const debugCleanupRef = useRef<(() => void) | null>(null);
  const callbacksRef = useRef({ onSceneChange, onViewerReady });
  const [isDebug, setIsDebug] = useState(false);
  const [debugCoords, setDebugCoords] = useState({ pitch: 0, yaw: 0 });
  const isDebugRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const debug =
        new URLSearchParams(window.location.search).get("debug") === "true";
      isDebugRef.current = debug;
      setIsDebug(debug);
    }
  }, []);

  callbacksRef.current = { onSceneChange, onViewerReady };

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

    if (viewerRef.current) {
      debugCleanupRef.current?.();
      debugCleanupRef.current = null;
      viewerRef.current.destroy();
      viewerRef.current = null;
    }

    const scenesConfig: Record<string, unknown> = {};

    for (const [sceneId, scene] of Object.entries(tourConfig.scenes)) {
      scenesConfig[sceneId] = {
        panorama: scene.panorama,
        hotSpots: scene.hotspots.map((h) => ({
          pitch: h.pitch,
          yaw: h.yaw,
          type: "scene",
          sceneId: h.sceneId,
          text: h.text,
          targetPitch: h.targetPitch ?? 0,
          targetYaw: h.targetYaw ?? 0,
          targetHfov: h.targetHfov ?? 110,
          createTooltipFunc: createCustomTooltip,
          createTooltipArgs: { text: h.text },
        })),
      };
    }

    const viewer = pannellum.viewer(containerRef.current, {
      firstScene: tourConfig.firstScene,
      scenes: scenesConfig,
      autoLoad: true,
      autoRotate: autoRotate ? -2 : 0,
      compass: false,
      showZoomCtrl: true,
      mouseZoom: true,
      draggable: true,
    });

    viewerRef.current = viewer;

    callbacksRef.current.onViewerReady?.((sceneId: string) => {
      viewer.loadScene(sceneId);
    });

    const handleSceneChange = (...args: unknown[]) => {
      callbacksRef.current.onSceneChange?.(String(args[0]));
    };
    viewer.on("scenechange", handleSceneChange);

    if (onInteraction) {
      const el = containerRef.current;
      const handler = () => {
        onInteraction();
        el.removeEventListener("pointerdown", handler);
      };
      el.addEventListener("pointerdown", handler);
    }

    if (isDebugRef.current) {
      const onMouseMove = (e: MouseEvent) => {
        try {
          const [pitch, yaw] = viewer.mouseEventToCoords(e);
          setDebugCoords({ pitch, yaw });
        } catch {
          try {
            const pitch = viewer.getPitch();
            const yaw = viewer.getYaw();
            setDebugCoords({ pitch, yaw });
          } catch {
            // viewer not ready yet
          }
        }
      };

      const attach = () => document.addEventListener("mousemove", onMouseMove);
      const detach = () =>
        document.removeEventListener("mousemove", onMouseMove);

      viewer.on("load", attach);
      viewer.on("unload", detach);

      if (viewer.isLoaded()) {
        attach();
      }

      debugCleanupRef.current = () => {
        viewer.off("load", attach);
        viewer.off("unload", detach);
        viewer.off("scenechange", handleSceneChange);
        detach();
      };
    } else {
      debugCleanupRef.current = () => {
        viewer.off("scenechange", handleSceneChange);
      };
    }
  }, [tourConfig, autoRotate, onInteraction]);

  useEffect(() => {
    init();

    return () => {
      debugCleanupRef.current?.();
      debugCleanupRef.current = null;
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [init]);

  return (
    <div className="relative h-full w-full">
      {isDebug && <DebugOverlay coords={debugCoords} />}
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden rounded-[12px]"
        style={{ background: "#2D2926" }}
      />
    </div>
  );
}
