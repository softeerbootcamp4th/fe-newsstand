import { App } from "@/App";
import { diffingRender } from "@/lab/diffing";
import { Deque } from "./deque";
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
export const render = () => {
  const shadowRoot = createShadowRoot();

  const renderQueue = new Deque<RenderingAppComponent>();
  renderQueue.pushBack({
    render: initComponent!,
    props: {},
    parent: shadowRoot,
    key: App.name,
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
      const { element, eventListeners, children } =
        renderElementQueue.popFront()!;
      parent.appendChild(element);
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
            parent: element,
            key: `${key}-${render.name}[${index}]`,
          });
          return;
        }

        renderElementQueue.pushFront({
          ...(child as CreatedAppElement),
          key: key,
          parent: element,
        });
      });

      eventListeners.forEach((listener, event) => {
        element.addEventListener(event, listener);
      });
    }
  }
  diffingRender(_root!, shadowRoot);
};

export const init = (app: AppComponent, root: HTMLElement) => {
  initComponent = app;
  _root = root;
  render();
};
