/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventHandlers } from "./event";

export type AppChild =
  | CreatedAppComponent<any>
  | CreatedAppElement
  | string
  | number
  | false;

export type AppRender<P = any, R = object> = (props: P) => R;
export type AppElementProps<T extends HTMLElement = HTMLElement> =
  Partial<EventHandlers> &
    Omit<Partial<T>, "children" | "style"> & {
      children?: AppChild[];
      style?: Partial<CSSStyleDeclaration>;
    };
export type AppElement<T extends HTMLElement = HTMLElement> = AppRender<
  AppElementProps<T>,
  CreatedAppElement<T>
> & {
  type: "element";
};

export type CreatedAppElement<T extends HTMLElement = HTMLElement> = {
  element: T;
  eventListeners: Map<string, EventListener>;
  children?: AppChild[];
};

export type RenderingAppElement<T extends HTMLElement = HTMLElement> =
  CreatedAppElement<T> & {
    key: string;
    parent: HTMLElement;
  };

export interface CreatedAppComponent<P = object> {
  render: (props: P) => CreatedAppComponent<P> | CreatedAppElement;
  props: P;
}
export type AppComponent<P = object> = AppRender<
  P,
  CreatedAppComponent<P> | CreatedAppElement
>;
export type RenderingAppComponent<P = object> = CreatedAppComponent<P> & {
  key: string;
  parent: HTMLElement;
};

export const isCreatedAppComponent = (
  created: CreatedAppComponent | CreatedAppElement,
): created is CreatedAppComponent => {
  return (created as CreatedAppComponent).render != null;
};

export const isAppElement = (
  app: AppComponent | AppElement,
): app is AppElement => {
  return (app as AppElement).type === "element";
};
