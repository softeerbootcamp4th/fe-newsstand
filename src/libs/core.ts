import { Deque } from "./deque";
import { diffingCommit } from "./diffingCommit";
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
} from "./nodes/renderer";
import { isPropsEqual } from "./utils";

export let currentKey: string = "";
let initComponent: AppComponent<object, object> | null = null;
let _root: HTMLElement | null = null;
export let isRendering = false;
export const updateQueue = new Deque<() => void>();
export const statesMap = new Map<string, Array<unknown>>();
export const stateIdxMap = new Map<string, number>();
export const effectCleanupsMap = new Map<string, Array<() => void>>();
export const effectDepsMap = new Map<string, Array<Array<unknown> | null>>();
export const effectIdxMap = new Map<string, number>();
export const callbackIdxMap = new Map<string, number>();
export const callbacksMap = new Map<string, Array<() => void>>();
export const callbackDepsMap = new Map<string, Array<Array<unknown> | null>>();
export const renderedComponentKeyMap = new Map<string, true>();
const cachedProps = new Map<string, object>();

const createShadowRoot = () => {
  const shadowRoot = document.createElement("div");
  shadowRoot.id = "app";
  return shadowRoot;
};

const preRender = () => {
  stateIdxMap.clear();
  callbackIdxMap.clear();
  effectIdxMap.clear();
  renderedComponentKeyMap.clear();
};

const isRendered = (key: string) => renderedComponentKeyMap.has(key);

const afterRender = () => {
  statesMap.forEach((_, key) => {
    if (!isRendered(key)) {
      statesMap.delete(key);
    }
  });
  effectCleanupsMap.forEach((_, key) => {
    if (!isRendered(key)) {
      effectCleanupsMap.get(key)?.forEach((cleanup) => cleanup()),
        effectCleanupsMap.delete(key);
    }
  });

  effectDepsMap.forEach((_, key) => {
    if (!isRendered(key)) {
      effectDepsMap.delete(key);
    }
  });
  callbacksMap.forEach((_, key) => {
    if (!isRendered(key)) {
      callbacksMap.delete(key);
    }
  });
  callbackDepsMap.forEach((_, key) => {
    if (!isRendered(key)) {
      callbackDepsMap.delete(key);
    }
  });

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
      forced: false,
    });
    while (renderQueue.length) {
      const cur = renderQueue.popFront()!;

      if (isRenderingAppComponent(cur)) {
        const { render: component, props, parent, key, forced } = cur;
        renderedComponentKeyMap.set(key, true);
        const prevProps = cachedProps.get(key);
        let curForced = forced;
        if (!curForced && !isPropsEqual(prevProps, props)) {
          curForced = true;
        }
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
            key: `${key}-${createdComponent.renderName}`,
            forced: curForced,
          });
          continue;
        }
        renderQueue.pushFront({
          ...createdComponent,
          element: createdComponent.element.cloneNode(true) as HTMLElement,
          parentKey: key,
          componentKey: key,
          parent,
          forced: curForced,
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
        forced,
      } = cur;

      if (element == null) {
        continue;
      }
      const idx = parent.children.length;
      const curKey = parentKey + `_${element.tagName}[${idx}]`;
      element.setAttribute("key", curKey);
      element.setAttribute("forced", `${forced}`);
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
            forced: forced,
          });
          return;
        }
        renderQueue.pushBack({
          ...(child as CreatedAppElement),
          element: (child as CreatedAppElement).element.cloneNode(
            true,
          ) as HTMLElement,
          parentKey: curKey,
          componentKey: componentKey,
          parent: element,
          forced: forced,
        });
      });
    }
    isRendering = true;
    diffingCommit(_root!, shadowRoot);
    afterRender();
  });

export const init = (app: AppComponent<object, object>, root: HTMLElement) => {
  initComponent = app;
  _root = root;
  addRootEvent(root);
  render();
};
