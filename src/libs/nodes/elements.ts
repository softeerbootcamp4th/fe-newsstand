import { EventNameMaps } from "../event";
import { AppElement, AppElementProps, CreatedAppElement } from "./renderer";
export const Raw = (data: string): CreatedAppElement => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, "text/xml");
  return {
    element: doc.documentElement,
    children: [],
    eventListeners: new Map(),
  };
};
Raw.type = "element";

export function ce<T extends HTMLElement>(
  render: AppElement<T>,
  props: AppElementProps<T>,
): CreatedAppElement<T> {
  return render(props);
}

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
export const Div: AppElement<HTMLDivElement> = (
  props: AppElementProps<HTMLDivElement>,
) => {
  return createElement<HTMLDivElement>("div", props);
};
Div.type = "element";

export const Span: AppElement<HTMLSpanElement> = (
  props: AppElementProps<HTMLSpanElement>,
) => {
  return createElement<HTMLSpanElement>("span", props);
};
Span.type = "element";

export const Main: AppElement<HTMLElement> = (
  props: AppElementProps<HTMLElement>,
) => {
  return createElement<HTMLElement>("main", props);
};
Main.type = "element";

export const Section: AppElement<HTMLElement> = (
  props: AppElementProps<HTMLElement>,
) => {
  return createElement<HTMLElement>("section", props);
};
Section.type = "element";

export const Header: AppElement<HTMLElement> = (
  props: AppElementProps<HTMLElement>,
) => {
  return createElement<HTMLElement>("header", props);
};
Header.type = "element";
export const Article: AppElement<HTMLElement> = (
  props: AppElementProps<HTMLElement>,
) => {
  return createElement<HTMLElement>("article", props);
};
Article.type = "element";

export const Footer: AppElement<HTMLElement> = (
  props: AppElementProps<HTMLElement>,
) => {
  return createElement<HTMLElement>("footer", props);
};

Footer.type = "element";

export const Input: AppElement<HTMLInputElement> = (
  props: AppElementProps<HTMLInputElement>,
) => {
  return createElement<HTMLInputElement>("input", props);
};
Input.type = "element";

export const Button: AppElement<HTMLButtonElement> = (
  props: AppElementProps<HTMLButtonElement>,
) => {
  return createElement<HTMLButtonElement>("button", props);
};
Button.type = "element";

export const H1: AppElement<HTMLHeadingElement> = (
  props: AppElementProps<HTMLHeadingElement>,
) => {
  return createElement<HTMLHeadingElement>("h1", props);
};
H1.type = "element";

export const H2: AppElement<HTMLHeadingElement> = (
  props: AppElementProps<HTMLHeadingElement>,
) => {
  return createElement<HTMLHeadingElement>("h2", props);
};

H2.type = "element";

export const H3: AppElement<HTMLHeadingElement> = (
  props: AppElementProps<HTMLHeadingElement>,
) => {
  return createElement<HTMLHeadingElement>("h3", props);
};

H3.type = "element";

export const H4: AppElement<HTMLHeadingElement> = (
  props: AppElementProps<HTMLHeadingElement>,
) => {
  return createElement<HTMLHeadingElement>("h4", props);
};

H4.type = "element";

export const Anchor: AppElement<HTMLAnchorElement> = (
  props: AppElementProps<HTMLAnchorElement>,
) => {
  return createElement<HTMLAnchorElement>("a", props);
};

Anchor.type = "element";

export const Img: AppElement<HTMLImageElement> = (
  props: AppElementProps<HTMLImageElement>,
) => {
  return createElement<HTMLImageElement>("img", props);
};

Img.type = "element";

export const Br: AppElement<HTMLBRElement> = (
  props: AppElementProps<HTMLBRElement>,
) => {
  return createElement<HTMLBRElement>("br", props);
};

Br.type = "element";
