export const debounceAnimationCallback = (callback: () => void) => {
  let frame: number | null = null;
  return () => {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      callback();
      frame = null;
    });
  };
};
