export interface Hotspot {
  pitch: number;
  yaw: number;
  sceneId: string;
  text: string;
  targetPitch?: number;
  targetYaw?: number;
  targetHfov?: number;
}

export interface Scene {
  panorama: string;
  hotspots: Hotspot[];
}

export interface TourConfig {
  firstScene: string;
  scenes: Record<string, Scene>;
}

export const tourConfig: TourConfig = {
  firstScene: "sala1",
  scenes: {
    sala1: {
      panorama: "/tour/sala1.jpg",
      hotspots: [
        { pitch: -6.08, yaw: 23.49, sceneId: "patio", text: "Patio", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -4.58, yaw: 134.00, sceneId: "bano", text: "Baño", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -2.08, yaw: -133.53, sceneId: "cocina", text: "Cocina", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -5.95, yaw: -70.80, sceneId: "sala2", text: "Sala 2", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -3.90, yaw: -96.37, sceneId: "sala3", text: "Sala 3", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -27.88, yaw: 134.23, sceneId: "pasillo", text: "Pasillo", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    sala2: {
      panorama: "/tour/sala2.jpg",
      hotspots: [
        { pitch: -2.14, yaw: -4.89, sceneId: "bano", text: "Baño", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -2.81, yaw: -41.56, sceneId: "patio", text: "Patio", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -3.08, yaw: 20.31, sceneId: "cocina", text: "Cocina", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -3.29, yaw: 71.29, sceneId: "sala3", text: "Sala 3", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -10.78, yaw: -19.47, sceneId: "sala1", text: "Sala 1", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    sala3: {
      panorama: "/tour/sala3.jpg",
      hotspots: [
        { pitch: -3.74, yaw: 13.98, sceneId: "patio", text: "Patio", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -22.46, yaw: -36.18, sceneId: "sala2", text: "Sala 2", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -19.01, yaw: 30.57, sceneId: "sala1", text: "Sala 1", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    cocina: {
      panorama: "/tour/cocina.jpg",
      hotspots: [
        { pitch: -4.04, yaw: -22.34, sceneId: "patio", text: "Patio", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -12.54, yaw: -48.28, sceneId: "sala1", text: "Sala 1", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    pasillo: {
      panorama: "/tour/pasillo.jpg",
      hotspots: [
        { pitch: -21.49, yaw: -123.93, sceneId: "bano", text: "Baño", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -11.28, yaw: -81.47, sceneId: "sala1", text: "Sala 1", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    bano: {
      panorama: "/tour/bano.jpg",
      hotspots: [
        { pitch: -14.79, yaw: -24.88, sceneId: "pasillo", text: "Pasillo", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    patio: {
      panorama: "/tour/patio.jpg",
      hotspots: [
        { pitch: -1.47, yaw: -99.53, sceneId: "piscina", text: "Piscina", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: 0.88, yaw: 171.89, sceneId: "sala1", text: "Sala 1", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
    piscina: {
      panorama: "/tour/piscina.jpg",
      hotspots: [
        { pitch: 0, yaw: 0, sceneId: "patio", text: "Patio", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
        { pitch: -0.45, yaw: 46.36, sceneId: "sala1", text: "Sala 1", targetPitch: 0, targetYaw: 0, targetHfov: 110 },
      ],
    },
  },
};
