import { EventNameMaps } from "./event";
import { AppElement, AppElementProps, CreatedAppElement } from "./renderer";

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
