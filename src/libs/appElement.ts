import { EventMap } from "./event";

export interface AppElementProps<T extends HTMLElement = HTMLElement> {
  tagName: string;
  props: Partial<EventMap> &
    Omit<Partial<T>, "children" | "style"> & {
      children?:
        | (RenderedAppElement | string | number)
        | (RenderedAppElement | string | number)[];
      style?: Partial<CSSStyleDeclaration>;
    };
}

export class SimpleElement {
  constructor(
    public value: string | number,
    public parent?: HTMLElement,
  ) {}
}

export interface RenderedAppElement {
  parent?: HTMLElement;
  node: HTMLElement;
  eventListeners: Map<string, EventListener>;
  children: (RenderedAppElement | SimpleElement)[];
}

export type AppElementRenderer = () => RenderedAppElement;

export const AppElement = ({
  tagName,
  props: rawProps,
}: AppElementProps): RenderedAppElement => {
  const elem = document.createElement(tagName);
  const children: (RenderedAppElement | SimpleElement)[] = [];
  const eventListeners: Map<string, EventListener> = new Map();

  const handleChild = (child: RenderedAppElement | string | number) => {
    if (typeof child === "object") {
      children.push({
        ...child,
        parent: elem,
      });
    } else if (typeof child === "string" || typeof child === "number") {
      children.push(new SimpleElement(child, elem));
    }
  };
  Object.keys(rawProps).forEach((key) => {
    if (key === "children") {
      const value = rawProps[key];
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach(handleChild);
      } else {
        handleChild(value);
      }
    } else if (key === "style") {
      const value = rawProps[
        key as keyof typeof rawProps
      ] as Partial<CSSStyleDeclaration>;
      for (const [styleKey, styleValue] of Object.entries(value)) {
        elem.style.setProperty(styleKey, `${styleValue}`);
      }
    } else if (key.startsWith("on")) {
      const value = rawProps[key as keyof typeof rawProps] as EventListener;
      const event = key.substring(2).toLowerCase();
      elem.addEventListener(event, value);
      eventListeners.set(event, value);
    } else {
      const value = rawProps[key as keyof typeof rawProps] as string;
      elem.setAttribute(key, value);
    }
  });
  return {
    node: elem,
    eventListeners,
    children,
  };
};
