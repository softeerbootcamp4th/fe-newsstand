import { Deque } from "./deque";
import { addRootEvent, eventMap } from "./event";
import {
  AppComponent,
  CreatedAppElement,
  RenderingAppComponent,
  RenderingAppElement,
  isCreatedAppComponent,
} from "./renderer";
import { isPropsEqual } from "./utils";

let currentKey: string = "";
let initComponent: AppComponent | null = null;
let _root: HTMLElement | null = null;
const statesMap = new Map<string, Array<unknown>>();
const stateIdxMap = new Map<string, number>();
const effectCleanupsMap = new Map<string, Array<() => void>>();
const effectDepsMap = new Map<string, Array<unknown>>();
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
  const currentDeps = deps ?? [];
  const prevDeps = effectDepsMap.get(currentKey);
  if (!effectIdxMap.has(currentKey)) {
    effectIdxMap.set(currentKey, 0);
  }
  if (!effectCleanupsMap.has(currentKey)) {
    effectCleanupsMap.set(currentKey, []);
  }
  const effectsCleanups = effectCleanupsMap.get(currentKey)!;
  const effectIdx = effectIdxMap.get(currentKey)!;
  if (isPropsEqual(prevDeps, currentDeps)) {
    return;
  }
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
  effectDepsMap.set(currentKey, currentDeps);

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
};
export const render = () =>
  requestAnimationFrame(() => {
    const shadowRoot = createShadowRoot();
    preRender();
    const renderQueue = new Deque<RenderingAppComponent>();
    renderQueue.pushBack({
      render: initComponent!,
      props: {},
      parent: shadowRoot,
      renderName: "App",
      key: "App",
    });
    while (renderQueue.length) {
      const { render: component, props, parent, key } = renderQueue.popFront()!;
      currentKey = key;
      const renderElementQueue = new Deque<RenderingAppElement>();
      const createdComponent = component(props);

      if (isCreatedAppComponent(createdComponent)) {
        renderQueue.pushFront({
          render: createdComponent.render,
          props: createdComponent.props,
          parent,
          renderName: createdComponent.renderName,
          key,
        });
        continue;
      }
      renderElementQueue.pushBack({
        ...createdComponent,
        key,
        parent,
      });

      while (renderElementQueue.length) {
        const {
          element,
          parent,
          eventListeners,
          children,
          key: parentKey,
        } = renderElementQueue.popFront()!;
        if (element == null) {
          continue;
        }
        const idx = parent.children.length;
        const currentKey = parentKey + `_${element.tagName}[${idx}]`;
        element.setAttribute("key", currentKey);
        parent.appendChild(element);
        eventMap.set(currentKey, eventListeners);
        (children ?? []).forEach((child, index) => {
          if (typeof child === "string" || typeof child === "number") {
            element.appendChild(document.createTextNode(child.toString()));
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
              key: `${key}-${child.renderName}[${index}]`,
            });
            return;
          }
          renderElementQueue.pushBack({
            ...(child as CreatedAppElement),
            key: currentKey,
            parent: element,
          });
        });
      }
    }
    diffingRender(_root!, shadowRoot);
  });

export const init = (app: AppComponent, root: HTMLElement) => {
  initComponent = app;
  _root = root;
  addRootEvent(root);
  render();
};
