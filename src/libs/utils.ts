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

export const toStringAnything = (value: any) => {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return value.toString();
};
