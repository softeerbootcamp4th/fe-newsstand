import {
  AppElementRenderer,
  RenderedAppElement,
  SimpleElement,
} from "./appElement";

const createApp = () => {
  const effectCleanUps = new Map<number, () => void>();
  let effectsKey = 0;
  const useEffect = (effectFunc: () => () => void) => {
    const lstEffectCleanUp = effectCleanUps.get(effectsKey);
    lstEffectCleanUp?.();
    const effectCleanUp = effectFunc();
    effectCleanUps.set(effectsKey, effectCleanUp);
    effectsKey += 1;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const states = new Map<number, any>();
  let statesKey = 0;
  let root: HTMLElement | null = null;
  let app: AppElementRenderer | null = null;
  const init = (_root: HTMLElement, _app: AppElementRenderer) => {
    root = _root;
    app = _app;
    render();
  };
  const render = () => {
    if (root == null || app == null) return;
    statesKey = 0;
    effectsKey = 0;
    root.innerHTML = "";

    const currentElems: (SimpleElement | RenderedAppElement)[] = [app()];

    while (currentElems.length > 0) {
      const currentElem = currentElems.pop()!;
      const parent = currentElem.parent ?? root;
      if (currentElem instanceof SimpleElement) {
        parent.appendChild(document.createTextNode(`${currentElem.value}`));
        continue;
      }
      if (currentElem.node instanceof HTMLElement) {
        parent.appendChild(currentElem.node);
      }
      currentElems.push(...currentElem.children);
    }
  };
  const useState = <RawT = unknown>(initalState: RawT) => {
    type T = RawT extends unknown ? typeof initalState : RawT;
    const localStatesKey = statesKey;
    if (!states.has(localStatesKey)) {
      states.set(localStatesKey, initalState);
    }
    const state = states.get(localStatesKey) as T;
    const get = () => {
      return state;
    };
    const update = (newState: T) => {
      if (state == newState) {
        return;
      }
      states.set(localStatesKey, newState);
      render();
    };
    statesKey += 1;
    return [get, update] as [() => T, (newState: T) => void];
  };

  return {
    init,
    useState,
    useEffect,
  };
};

const { init, useState, useEffect } = createApp();
export { init, useState, useEffect };
