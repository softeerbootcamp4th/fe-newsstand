import { Deque } from "./deque";
import { addRootEvent, eventMap } from "./event";
import {
  AppComponent,
  CreatedAppElement,
  RenderingAppComponent,
  RenderingAppElement,
  isCreatedAppComponent,
} from "./renderer";

let currentKey: string = "";
let initComponent: AppComponent | null = null;
let _root: HTMLElement | null = null;
const statesMap = new Map<string, Array<unknown>>();
const stateIdxMap = new Map<string, number>();

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
          eventListeners,
          children,
          key: parentKey,
        } = renderElementQueue.popFront()!;
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
          if (child === false) {
            return;
          }
          if (isCreatedAppComponent(child)) {
            renderQueue.pushFront({
              render: child.render,
              props: child.props,
              renderName: child.renderName,
              parent: element,
              key: `${key}-${child.renderName}[${index}]`,
            });
            return;
          }

          renderElementQueue.pushFront({
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
