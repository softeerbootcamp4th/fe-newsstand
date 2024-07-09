import { Deque } from "./deque";
import { addRootEvent, eventMap } from "./event";
import {
  AppComponent,
  CreatedAppElement,
  RenderingAppComponent,
  RenderingAppElement,
  RenderingAppNode,
  isCreatedAppComponent,
  isRenderingAppComponent,
  isRenderingAppNode,
} from "./renderer";
import { isPropsEqual } from "./utils";

let currentKey: string = "";
let initComponent: AppComponent | null = null;
let _root: HTMLElement | null = null;
let isRendering = false;
const updateQueue = new Deque<() => void>();
const statesMap = new Map<string, Array<unknown>>();
const stateIdxMap = new Map<string, number>();
const effectCleanupsMap = new Map<string, Array<() => void>>();
const effectDepsMap = new Map<string, Array<Array<unknown> | null>>();
const effectIdxMap = new Map<string, number>();

export const diffingRender = (cur: ChildNode, nxt: ChildNode) => {
  if (!cur || !nxt) {
    return;
  }

  if (!(cur instanceof HTMLElement && nxt instanceof HTMLElement)) {
    if (cur.textContent !== nxt.textContent) {
      cur.replaceWith(nxt);
    }
    return;
  }
  const forceUpdate = nxt.getAttribute("forced") === "true";
  if (cur.tagName !== nxt.tagName || forceUpdate) {
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
      diffingRender(curChild, nxtChild);
    } else if (!curChild && nxtChild) {
      cur.appendChild(nxtChild);
    } else if (curChild && !nxtChild) {
      cur.removeChild(curChild);
    }
  }
};

export const useEffect = (
  effect: () => void | (() => void),
  deps?: Array<unknown>,
) => {
  const currentDeps = deps ?? null;

  if (!effectIdxMap.has(currentKey)) {
    effectIdxMap.set(currentKey, 0);
  }
  if (!effectCleanupsMap.has(currentKey)) {
    effectCleanupsMap.set(currentKey, []);
  }
  if (!effectDepsMap.has(currentKey)) {
    effectDepsMap.set(currentKey, []);
  }
  const effectDeps = effectDepsMap.get(currentKey)!;
  const effectsCleanups = effectCleanupsMap.get(currentKey)!;
  const effectIdx = effectIdxMap.get(currentKey)!;
  if (effectDeps.length <= effectIdx) {
    effectDeps.push(null);
  }
  const prevDeps = effectDeps[effectIdx];
  if (currentDeps != null && isPropsEqual(prevDeps, currentDeps)) {
    effectIdxMap.set(currentKey, effectIdx + 1);
    return;
  }
  effectDeps[effectIdx] = currentDeps;
  const cleanup = effect();

  if (effectIdx >= effectsCleanups.length) {
    if (cleanup != null) {
      effectsCleanups.push(cleanup);
    }
  } else {
    effectsCleanups[effectIdx]?.();
    if (cleanup != null) {
      effectsCleanups[effectIdx] = cleanup;
    }
  }

  effectIdxMap.set(currentKey, effectIdx + 1);
};

export const useState = <T>(initialState: T) => {
  if (!stateIdxMap.has(currentKey)) {
    stateIdxMap.set(currentKey, 0);
  }
  if (!statesMap.has(currentKey)) {
    statesMap.set(currentKey, []);
  }
  const stateIdx = stateIdxMap.get(currentKey)!;
  const states = statesMap.get(currentKey)!;
  if (stateIdx >= states.length) {
    states.push(initialState);
  }
  const state = states[stateIdx];
  const setState = (newState: T) => {
    if (isRendering) {
      updateQueue.pushBack(() => {
        states[stateIdx] = newState;
      });
    }
    states[stateIdx] = newState;
    render();
  };
  stateIdxMap.set(currentKey, stateIdx + 1);
  return [state, setState] as [T, (newState: T) => void];
};

const createShadowRoot = () => {
  const shadowRoot = document.createElement("div");
  shadowRoot.id = "app";
  return shadowRoot;
};

const preRender = () => {
  stateIdxMap.clear();
  effectIdxMap.clear();
};

const afterRender = () => {
  isRendering = false;
  if (updateQueue.length == 0) {
    return;
  }
  while (updateQueue.length) {
    updateQueue.popFront()!();
  }
  render();
};
export const render = () =>
  requestAnimationFrame(() => {
    const shadowRoot = createShadowRoot();
    preRender();
    const renderQueue = new Deque<
      RenderingAppComponent | RenderingAppElement | RenderingAppNode
    >();
    renderQueue.pushBack({
      render: initComponent!,
      props: {},
      parent: shadowRoot,
      renderName: "App",
      key: "App",
    });
    while (renderQueue.length) {
      const cur = renderQueue.popFront()!;
      if (isRenderingAppComponent(cur)) {
        const { render: component, props, parent, key } = cur;
        currentKey = key;
        const createdComponent = component(props);
        if (createdComponent == null || createdComponent === false) {
          continue;
        }
        if (
          typeof createdComponent === "string" ||
          typeof createdComponent === "number"
        ) {
          renderQueue.pushFront({
            node: document.createTextNode(`${createdComponent}`),
            parent,
          });
          continue;
        }
        if (isCreatedAppComponent(createdComponent)) {
          renderQueue.pushBack({
            render: createdComponent.render,
            props: createdComponent.props,
            parent,
            renderName: createdComponent.renderName,
            key: key,
          });
          continue;
        }
        renderQueue.pushFront({
          ...createdComponent,
          parentKey: key,
          componentKey: key,
          parent,
        });
        continue;
      }

      if (isRenderingAppNode(cur)) {
        const { node, parent } = cur;
        parent.appendChild(node);
        continue;
      }
      const {
        element,
        parent,
        eventListeners,
        children,
        parentKey,
        componentKey,
      } = cur;
      if (element == null) {
        continue;
      }
      const idx = parent.children.length;
      const curKey = parentKey + `_${element.tagName}[${idx}]`;
      element.setAttribute("key", curKey);
      parent.appendChild(element);
      eventMap.set(curKey, eventListeners);
      (children ?? []).forEach((child, index) => {
        if (typeof child === "string" || typeof child === "number") {
          renderQueue.pushBack({
            node: document.createTextNode(String(child)),
            parent: element,
          });
          return;
        }
        if (child === false || child == null) {
          return;
        }

        if (isCreatedAppComponent(child)) {
          renderQueue.pushBack({
            render: child.render,
            props: child.props,
            renderName: child.renderName,
            parent: element,
            key: `${componentKey}-${child.renderName}[${index}]`,
          });
          return;
        }
        renderQueue.pushBack({
          ...(child as CreatedAppElement),
          parentKey: curKey,
          componentKey: componentKey,
          parent: element,
        });
      });
    }
    isRendering = true;
    diffingRender(_root!, shadowRoot);
    afterRender();
  });

export const init = (app: AppComponent, root: HTMLElement) => {
  initComponent = app;
  _root = root;
  addRootEvent(root);
  render();
};
