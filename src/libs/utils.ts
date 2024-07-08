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

export const isPropsEqual = (prevProps: any, nextProps: any) => {
  if (prevProps == null && nextProps != null) {
    return false;
  }
  const prevKeys = Object.keys(prevProps ?? {});
  const nextKeys = Object.keys(nextProps ?? {});
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  for (const key of nextKeys) {
    if (key == "children") {
      continue;
    }

    if (
      typeof prevProps[key] === "object" &&
      typeof nextProps[key] === "object"
    ) {
      if (!isPropsEqual(prevProps[key], nextProps[key])) {
        return false;
      }
      continue;
    }
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
};
