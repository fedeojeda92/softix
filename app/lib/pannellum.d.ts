declare interface PannellumViewer {
  destroy: () => void;
  setPose: (pitch: number, yaw: number) => void;
  loadScene: (sceneId: string) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
  mouseEventToCoords: (event: MouseEvent) => [number, number];
  getHfov: () => number;
  setHfov: (fov: number) => void;
  getPitch: () => number;
  getYaw: () => number;
  isLoaded: () => boolean;
  getScene: () => string;
}

declare interface Window {
  pannellum: {
    viewer: (
      container: HTMLElement | string,
      config: Record<string, unknown>,
    ) => PannellumViewer;
  };
}
