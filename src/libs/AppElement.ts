import { EventHandlers, EventNameMap } from "./event";

export interface AppElementProps<T extends HTMLElement = HTMLElement> {
  tagName: string;
  props: Partial<EventHandlers> &
    Omit<Partial<T>, "children" | "style"> & {
      children?:
        | (RenderedAppElement | RawElement | string | number | false)
        | (RenderedAppElement | RawElement | string | number | false)[];
      style?: Partial<CSSStyleDeclaration>;
    };
}

export class SimpleElement {
  constructor(
    public value: string | number,
    public parent?: HTMLElement,
  ) {}
}
export class RawElement {
  constructor(
    public node: string,
    public parent?: HTMLElement,
  ) {}
}

export interface RenderedAppElement {
  parent?: HTMLElement;
  node: HTMLElement;
  eventListeners: Map<string, EventListener>;
  children: (RenderedAppElement | SimpleElement | RawElement)[];
  props: any;
}

export type AppElementRenderer = () => RenderedAppElement;

export const AppElement = ({
  tagName,
  props,
}: AppElementProps): RenderedAppElement => {
  const elem = document.createElement(tagName);
  const children: (RenderedAppElement | RawElement | SimpleElement)[] = [];
  const eventListeners: Map<string, EventListener> = new Map();

  const handleChild = (
    child: RenderedAppElement | RawElement | string | number | false,
  ) => {
    if (child instanceof RawElement) {
      children.push(new RawElement(child.node, elem));
      return;
    }
    if (typeof child === "object") {
      children.push({
        ...child,
        parent: elem,
      });
    } else if (typeof child === "string" || typeof child === "number") {
      children.push(new SimpleElement(child, elem));
    }
  };
  const parseProp = (key: string) => {
    if (key === "children") {
      const value = props[key];
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach(handleChild);
      } else {
        handleChild(value);
      }
    } else if (key === "style") {
      const value = props[
        key as keyof typeof props
      ] as Partial<CSSStyleDeclaration>;
      for (const [styleKey, styleValue] of Object.entries(value)) {
        elem.style.setProperty(styleKey, `${styleValue}`);
      }
    } else if (key === "className") {
      const value = props[key as keyof typeof props] as string;
      elem.className = value;
    } else if (key.startsWith("on")) {
      const value = props[key as keyof typeof props] as EventListener;
      const event = EventNameMap[key as keyof EventHandlers];
      elem.addEventListener(event, value);
      eventListeners.set(event, value);
    } else {
      const value = props[key as keyof typeof props] as string;
      elem.setAttribute(key, value);
    }
  };
  const mount = () => {
    Object.keys(props).forEach(parseProp);
  };

  const unmount = () => {
    eventListeners.forEach((value, key) => {
      elem.removeEventListener(key, value);
    });
  };
  unmount();
  mount();
  return {
    node: elem,
    eventListeners,
    children,
    props,
  };
};
