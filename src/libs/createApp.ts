/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppElementRenderer,
  RawElement,
  RenderedAppElement,
  SimpleElement,
} from "./AppElement";
import { Deque } from "./deque";
import { debounceAnimationCallback, toStringAnything } from "./utils";

const createApp = () => {
  const effectCleanUps = new Map<number, () => void>();
  const effectDependencies = new Map<number, string[]>();
  let effectsKey = 0;
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
      effectCleanUps.delete(effectsKey);
    }

    effectsKey += 1;
  };

  const states = new Map<number, any>();
  let statesKey = 0;
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
    if (root == null || app == null) return;
    statesKey = 0;
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
    console.log(top);
    _diffingRender(root, top);
  });
  const useState = <RawT = unknown>(initalState: RawT) => {
    type T = RawT extends unknown ? typeof initalState : RawT;
    const localStatesKey = statesKey;
    if (!states.has(localStatesKey)) {
      states.set(localStatesKey, initalState);
    }
    const state = states.get(localStatesKey) as T;

    const update = (newState: T) => {
      console.log(state, newState, localStatesKey, state == newState, states);
      if (state == newState) {
        return;
      }
      states.set(localStatesKey, newState);
      render();
    };
    statesKey += 1;
    return [state, update] as [T, (newState: T) => void];
  };

  return {
    init,
    useState,
    useEffect,
  };
};

const { init, useState, useEffect } = createApp();
export { init, useState, useEffect };
