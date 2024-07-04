/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppElementRenderer,
  RawElement,
  RenderedAppElement,
  SimpleElement,
} from "./AppElement";
import { Deque } from "./deque";
import {
  debounceAnimationCallback,
  isPropsEqual,
  toStringAnything,
} from "./utils";

const effectCleanUps = new Map<number, () => void>();
const effectDependencies = new Map<number, any[]>();
const statesMap = new Map<string, Array<any>>();
const statesKeyMap = new Map<string, number>();
const callbacksMap = new Map<string, Array<() => void>>();
const callbacksDependenciesMap = new Map<string, any[]>();
const callbacksKeyMap = new Map<string, number>();
const propsMap = new Map<string, any>();
let effectsKey = 0;
const createApp = () => {
  const useEffect = (effectFunc: () => () => void, rawDependencies?: any[]) => {
    const dependencies = rawDependencies?.map(toStringAnything) ?? [];
    const lstDependencies = effectDependencies.get(effectsKey);
    if (
      lstDependencies == null ||
      lstDependencies.length !== dependencies.length ||
      lstDependencies.some((value, index) => value !== dependencies[index])
    ) {
      effectDependencies.set(effectsKey, dependencies);
      const lstEffectCleanUp = effectCleanUps.get(effectsKey);
      lstEffectCleanUp?.();
      const effectCleanUp = effectFunc();
      effectCleanUps.set(effectsKey, effectCleanUp);
    }

    effectsKey += 1;
  };

  const useCallback = <RawT = unknown>(
    {
      callback,
      key,
    }: {
      callback: RawT;
      key: string;
    },
    rawDependencies?: any[],
  ) => {
    type T = RawT extends unknown ? typeof callback : RawT;
    const dependencies = rawDependencies?.map(toStringAnything) ?? [];
    if (!callbacksKeyMap.has(key)) {
      callbacksKeyMap.set(key, 0);
    }
    const localCallbacksKey = callbacksKeyMap.get(key)!;
    if (!callbacksMap.has(key)) {
      callbacksMap.set(key, []);
    }
    const callbacks = callbacksMap.get(key)!;

    if (callbacks.length <= localCallbacksKey) {
      callbacks.push(callback as () => void);
    }
    callbacksKeyMap.set(key, localCallbacksKey + 1);
    if (isPropsEqual(dependencies, callbacksDependenciesMap.get(key))) {
      return callbacks[localCallbacksKey] as T;
    }
    callbacksDependenciesMap.set(key, dependencies);
    const memoedCallback = callbacks[localCallbacksKey];
    return memoedCallback as T;
  };

  const renderQueue = new Deque<() => void>();

  let isRendering = false;
  let root: HTMLElement | null = null;
  let app: AppElementRenderer | null = null;
  const init = (_root: HTMLElement, _app: AppElementRenderer) => {
    root = _root;
    app = _app;
    render();
  };
  const _converRawElementToDom = (rawData: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawData, "text/xml");
    return doc.documentElement;
  };

  const _diffingRender = (cur: ChildNode, nxt: ChildNode) => {
    if (!cur || !nxt) {
      return;
    }

    if (!(cur instanceof HTMLElement && nxt instanceof HTMLElement)) {
      if (cur.textContent !== nxt.textContent) {
        cur.replaceWith(nxt);
      }
      return;
    }

    if (cur.tagName !== nxt.tagName) {
      cur.replaceWith(nxt);
      return;
    }

    const forceUpdate = nxt.getAttribute("forced") === "true";
    if (forceUpdate) {
      cur.replaceWith(nxt);
      return;
    }

    const curAttrs = cur.attributes ?? {};
    const nxtAttrs = nxt.attributes ?? {};

    // Update attributes
    for (const { name, value } of Array.from(nxtAttrs)) {
      if (cur.getAttribute(name) !== value) {
        cur.setAttribute(name, value);
      }
    }
    // Remove old attributes
    for (const { name } of Array.from(curAttrs)) {
      if (!nxtAttrs.getNamedItem(name)) {
        cur.removeAttribute(name);
      }
    }

    // Update children
    const curChildren = Array.from(cur.childNodes);
    const nxtChildren = Array.from(nxt.childNodes);

    const maxLen = Math.max(curChildren.length, nxtChildren.length);
    for (let i = 0; i < maxLen; i++) {
      const curChild = curChildren[i];
      const nxtChild = nxtChildren[i];
      if (curChild && nxtChild) {
        _diffingRender(curChild, nxtChild);
      } else if (!curChild && nxtChild) {
        cur.appendChild(nxtChild);
      } else if (curChild && !nxtChild) {
        cur.removeChild(curChild);
      }
    }
  };

  const render = debounceAnimationCallback(() => {
    isRendering = true;
    if (root == null || app == null) return;
    statesKeyMap.clear();
    effectsKey = 0;

    const top = document.createElement("div");

    const currentElems: Deque<SimpleElement | RenderedAppElement | RawElement> =
      new Deque();
    currentElems.pushBack(app());

    while (currentElems.length > 0) {
      const currentElem = currentElems.popFront()!;
      const parent = currentElem.parent ?? top;

      if (currentElem instanceof SimpleElement) {
        parent.appendChild(document.createTextNode(`${currentElem.value}`));
        continue;
      }
      if (currentElem instanceof RawElement) {
        parent.appendChild(_converRawElementToDom(currentElem.node));
        continue;
      }
      parent.appendChild(currentElem.node);
      const key = `${parent.getAttribute("key") ?? ""}-${
        currentElem.node.tagName
      }`;
      currentElem.node.setAttribute("key", key);
      if (!isPropsEqual(propsMap.get(key), currentElem.props)) {
        propsMap.set(key, currentElem.props);
        currentElem.node.setAttribute("forced", "true");
      }
      currentElems.pushBack([...currentElem.children]);
    }
    _diffingRender(root, top);
    isRendering = false;
    runRenderQueue();
  });

  const fillRenderQueue = (callback: () => void) => {
    renderQueue.pushBack(callback);
  };

  const runRenderQueue = () => {
    if (renderQueue.length === 0) {
      return;
    }
    while (renderQueue.length > 0) {
      const callback = renderQueue.popFront()!;
      callback();
    }
    render();
  };
  function useState<RawT = unknown>({
    key,
    initalState,
  }: {
    key: string;
    initalState: RawT;
  }) {
    type T = RawT extends unknown ? typeof initalState : RawT;
    type Updater = (updater: T | ((state: T) => T)) => void;

    if (!statesMap.has(key)) {
      statesMap.set(key, []);
    }
    if (!statesKeyMap.has(key)) {
      statesKeyMap.set(key, 0);
    }
    const localStatesKey = statesKeyMap.get(key)!;
    const states = statesMap.get(key)!;

    if (states.length <= localStatesKey) {
      states.push(initalState);
    }
    const state = states[localStatesKey] as T;
    function update(updater: Updater) {
      const curLocalStatesKey = statesKeyMap.get(key)!;
      const curState = states[curLocalStatesKey] as T;

      const newState =
        typeof updater === "function"
          ? (updater as (state: T) => T)(curState)
          : updater;

      if (curState == newState) {
        return;
      }
      if (isRendering) {
        fillRenderQueue(() => {
          states[localStatesKey] = newState;
        });
        return;
      }
      states[localStatesKey] = newState;
      render();
    }
    statesKeyMap.set(key, localStatesKey + 1);
    return [state, update] as [T, Updater];
  }

  return {
    init,
    useState,
    useEffect,
    useCallback,
  };
};

const { init, useState, useEffect, useCallback } = createApp();
export { init, useState, useEffect, useCallback };
