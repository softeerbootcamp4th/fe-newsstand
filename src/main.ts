import { Deque } from "./libs/deque";
import { EventHandlers, EventNameMaps } from "./libs/event";

type AppChild = AppComponent | AppElement | string | number | false;
export type AppElementProps<T extends HTMLElement = HTMLElement> =
  Partial<EventHandlers> &
    Omit<Partial<T>, "children" | "style"> & {
      children?: AppChild[];
      style?: Partial<CSSStyleDeclaration>;
    };
type AppElement<T extends HTMLElement = HTMLElement> = (
  props: AppElementProps<T>,
) => HTMLElement;

type CreatedAppElement<T extends HTMLElement = HTMLElement> = {
  element: T;
  eventListeners: Map<string, EventListener>;
  children?: AppChild[];
};
interface CreatedAppComponent<P = object> {
  render: (props: P) => HTMLElement;
  props: P;
}
type AppComponent<P = object> = (props: P) => HTMLElement;
type RenderingAppComponent<P = object> = {
  component: AppComponent<P>;
  props: P;
  key?: string;
  parent?: HTMLElement;
};
const cc = <P>(
  component: AppComponent<P>,
  props: P,
): CreatedAppComponent<P> => {
  return {
    render: component,
    props,
  };
};

const createElement = <T extends HTMLElement = HTMLElement>(
  tagName: string,
  props: AppElementProps<T>,
): CreatedAppElement<T> => {
  const el = document.createElement(tagName) as T;
  const eventListeners = new Map<string, EventListener>();
  const { children, style, className, ...rest } = props;

  Object.keys(rest).forEach((key) => {
    if (key.startsWith("on")) {
      const eventName = EventNameMaps.get(key);
      if (eventName == null) {
        return;
      }
      const listener = rest[key as keyof typeof rest];
      eventListeners.set(eventName, listener as EventListener);
      return;
    }
    const attr = rest[key as keyof typeof rest];
    el.setAttribute(key, attr as string);
  });
  Object.assign(el.style, style);
  el.className = className ?? "";
  return {
    element: el,
    eventListeners,
    children,
  };
};
const div = (props: AppElementProps<HTMLDivElement>) => {
  return createElement<HTMLDivElement>("div", props);
};

const createShadowRoot = () => {
  const shadowRoot = document.createElement("div");
  shadowRoot.id = "app";
  return shadowRoot;
};
const render = (App: AppComponent) => {
  const shadowRoot = createShadowRoot();

  const renderQueue = new Deque<RenderingAppComponent>();
  renderQueue.pushBack({
    component: App,
    props: {},
    parent: shadowRoot,
    key: "root",
  });
  while (renderQueue.length) {
    const { component, props, parent, key } = renderQueue.popFront()!;
    const renderElementQueue = new Deque<CreatedAppElement>();
    const createdComponent = component(props);
  }
};
const init = (app: () => HTMLElement, root: HTMLElement) => {
  root.appendChild(app());
  render();
};
const App = () => {
  return cc(div, {
    className: "container",
    children: ["hi"],
  });
};
const root = document.getElementById("app")!;

init(App, root);
