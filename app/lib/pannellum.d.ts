declare interface Window {
  pannellum: {
    viewer: (
      container: HTMLElement | string,
      config: Record<string, unknown>,
    ) => { destroy: () => void; setPose: (a: number, b: number) => void };
  };
}
