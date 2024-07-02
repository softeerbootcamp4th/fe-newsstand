const createApp = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hooks = new Map<string, any>();
  let root: HTMLElement | null = null;
  let app: (() => string) | null = null;
  const init = (_root: HTMLElement, _app: () => string) => {
    root = _root;
    app = _app;
    render();
  };
  const render = () => {
    if (root == null || app == null) return;
    root.innerHTML = app();
  };
  const useState = <RawT = unknown>(initalState: RawT) => {
    type T = RawT extends unknown ? typeof initalState : RawT;
    const key = `${Date.now()}`;
    hooks.set(key, initalState);
    const get = () => {
      return hooks.get(key) as T;
    };
    const update = (newState: T) => {
      const lastState = get();
      if (lastState != newState) {
        hooks.set(key, newState);
        render();
      }
    };

    return [get, update];
  };

  return {
    init,
    useState,
  };
};

const { init, useState } = createApp();
export { init, useState };
