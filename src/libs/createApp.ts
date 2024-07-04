/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppElementRenderer,
  RawElement,
  RenderedAppElement,
  SimpleElement,
} from "./AppElement";
import { Deque } from "./deque";
import { debounceAnimationCallback, toStringAnything } from "./utils";

const effectCleanUps = new Map<number, () => void>();
const effectDependencies = new Map<number, string[]>();
const statesMap = new Map<string, Array<any>>();
const statesKeyMap = new Map<string, number>();
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

    const curAttrs = cur.attributes ?? {};
    const nxtAttrs = nxt.attributes ?? {};
    for (let i = 0; i < curAttrs.length; i++) {
      const curAttr = curAttrs[i];
      const nxtAttr = nxtAttrs.getNamedItem(curAttr.name);
      if (nxtAttr == null) {
        cur.removeAttribute(curAttr.name);
      } else if (curAttr.value !== nxtAttr.value) {
        curAttr.value = nxtAttr.value;
      }
    }
    for (let i = 0; i < nxtAttrs.length; i++) {
      const nxtAttr = nxtAttrs[i];
      if (curAttrs.getNamedItem(nxtAttr.name) == null) {
        cur.setAttribute(nxtAttr.name, nxtAttr.value);
      }
    }
    const curChildren = cur.childNodes;
    const nxtChildren = nxt.childNodes;
    for (let i = 0; i < curChildren.length; i++) {
      const curChild = curChildren[i];
      const nxtChild = nxtChildren[i];
      if (nxtChild == null) {
        cur.removeChild(curChild);
      } else {
        _diffingRender(curChild as HTMLElement, nxtChild as HTMLElement);
      }
    }
    for (let i = curChildren.length; i < nxtChildren.length; i++) {
      cur.appendChild(nxtChildren[i]);
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
      if (currentElem.node instanceof HTMLElement) {
        parent.appendChild(currentElem.node);
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
  function useState<RawT = unknown>(key: string, initalState: RawT) {
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
  };
};

const { init, useState, useEffect } = createApp();
export { init, useState, useEffect };
