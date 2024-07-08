import { diffingRender } from "./lab/diffing";
import { Deque } from "./libs/deque";
import { EventHandlers, EventNameMaps } from "./libs/event";

type AppChild =
  | CreatedAppComponent<any>
  | CreatedAppElement
  | string
  | number
  | false;

type AppRender<P = any, R = object> = (props: P) => R;
export type AppElementProps<T extends HTMLElement = HTMLElement> =
  Partial<EventHandlers> &
    Omit<Partial<T>, "children" | "style"> & {
      children?: AppChild[];
      style?: Partial<CSSStyleDeclaration>;
    };
type AppElement<T extends HTMLElement = HTMLElement> = AppRender<
  AppElementProps<T>,
  CreatedAppElement<T>
> & {
  type: "element";
};

type CreatedAppElement<T extends HTMLElement = HTMLElement> = {
  element: T;
  eventListeners: Map<string, EventListener>;
  children?: AppChild[];
};

type RenderingAppElement<T extends HTMLElement = HTMLElement> =
  CreatedAppElement<T> & {
    key: string;
    parent: HTMLElement;
  };

interface CreatedAppComponent<P = object> {
  render: (props: P) => CreatedAppComponent<P> | CreatedAppElement;
  props: P;
}
type AppComponent<P = object> = AppRender<
  P,
  CreatedAppComponent<P> | CreatedAppElement
>;
type RenderingAppComponent<P = object> = CreatedAppComponent<P> & {
  key: string;
  parent: HTMLElement;
};

function cc<P>(render: AppComponent<P>, props: P): CreatedAppComponent<P> {
  return {
    render,
    props,
  };
}
function ce<T extends HTMLElement>(
  render: AppElement<T>,
  props: AppElementProps<T>,
): CreatedAppElement<T> {
  return render(props);
}

const isCreatedAppComponent = (
  created: CreatedAppComponent | CreatedAppElement,
): created is CreatedAppComponent => {
  return (created as CreatedAppComponent).render != null;
};

const isAppElement = (app: AppComponent | AppElement): app is AppElement => {
  return (app as AppElement).type === "element";
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
  if (className != null) {
    el.className = className;
  }
  return {
    element: el,
    eventListeners,
    children,
  };
};
const div: AppElement<HTMLDivElement> = (
  props: AppElementProps<HTMLDivElement>,
) => {
  return createElement<HTMLDivElement>("div", props);
};
div.type = "element";

const createShadowRoot = () => {
  const shadowRoot = document.createElement("div");
  shadowRoot.id = "app";
  return shadowRoot;
};
const render = (App: AppComponent): HTMLElement => {
  const shadowRoot = createShadowRoot();

  const renderQueue = new Deque<RenderingAppComponent>();
  renderQueue.pushBack({
    render: App,
    props: {},
    parent: shadowRoot,
    key: App.name,
  });
  while (renderQueue.length) {
    const { render: component, props, parent, key } = renderQueue.popFront()!;
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
          ...child,
          key: key,
          parent: element,
        });
      });

      eventListeners.forEach((listener, event) => {
        element.addEventListener(event, listener);
      });
    }
  }
  return shadowRoot;
};
const init = (app: AppComponent, root: HTMLElement) => {
  const newRoot = render(app);
  diffingRender(root, newRoot);
};

interface TestProps {
  text: string;
}
const Test: AppComponent<TestProps> = ({ text }: TestProps) => {
  return ce(div, {
    children: [text],
  });
};

const App = () => {
  return ce(div, {
    className: "container",
    children: [
      "hi",
      cc(Test, {
        text: "test",
      }),
    ],
  });
};
const root = document.getElementById("app")!;

init(App, root);
