"use client";

import { tourConfig } from "../data/tour-config";

interface ThumbnailStripProps {
  activeScene: string;
  onSelectScene: (sceneId: string) => void;
}

const sceneLabels: Record<string, string> = {
  sala1: "Sala 1",
  sala2: "Sala 2",
  sala3: "Sala 3",
  cocina: "Cocina",
  pasillo: "Pasillo",
  bano: "Baño",
  patio: "Patio",
  piscina: "Piscina",
};

export default function ThumbnailStrip({
  activeScene,
  onSelectScene,
}: ThumbnailStripProps) {
  const scenes = Object.entries(tourConfig.scenes);

  return (
    <div className="mt-3 w-full">
      <div
        className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#8B7355 transparent" }}
      >
        {scenes.map(([sceneId, scene]) => {
          const isActive = sceneId === activeScene;
          return (
            <button
              key={sceneId}
              onClick={() => onSelectScene(sceneId)}
              className="group flex-shrink-0 flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div
                className={`
                  relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all duration-200
                  sm:h-20 sm:w-32
                  ${
                    isActive
                      ? "border-bronze opacity-100 shadow-lg shadow-bronze/20"
                      : "border-white/10 opacity-60 hover:opacity-90 hover:border-white/30"
                  }
                `}
              >
                <img
                  src={scene.panorama}
                  alt={sceneLabels[sceneId] || sceneId}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {isActive && (
                  <div className="absolute inset-0 ring-2 ring-inset ring-bronze/40 rounded-lg" />
                )}
              </div>
              <span
                className={`
                  text-xs font-body font-medium transition-colors duration-200
                  ${isActive ? "text-bronze" : "text-white/50 group-hover:text-white/80"}
                `}
              >
                {sceneLabels[sceneId] || sceneId}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
