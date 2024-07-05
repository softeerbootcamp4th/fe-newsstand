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

export const debounce = (callback: () => void, delay: number) => {
  let timeout: number | null = null;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      callback();
      timeout = null;
    }, delay);
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

export const isPropsEqual = (prevProps: any, nextProps: any) => {
  const prevKeys = Object.keys(prevProps ?? {});
  const nextKeys = Object.keys(nextProps ?? {});
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  for (const key of prevKeys) {
    if (key == "children") {
      continue;
    }
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
};
