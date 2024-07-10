/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventHandlers } from "./event";

export type AppChild =
  | CreatedAppComponent<any>
  | CreatedAppElement
  | string
  | number
  | false
  | null
  | undefined;

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
    parentKey: string;
    componentKey: string;
    parent: HTMLElement;
    forced: boolean;
  };

export interface CreatedAppComponent<P = object> {
  render: (
    props: P,
  ) =>
    | CreatedAppComponent<P>
    | CreatedAppElement
    | string
    | number
    | false
    | null;
  props: P;
  renderName: string;
}
export type AppComponent<P = object> = AppRender<
  P,
  CreatedAppComponent<P> | CreatedAppElement | string | number | false | null
>;
export type RenderingAppComponent<P = object> = CreatedAppComponent<P> & {
  key: string;
  parent: HTMLElement;
  forced: boolean;
};

export type RenderingAppNode = {
  node: Node;
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

export const isRenderingAppComponent = (
  created: RenderingAppComponent | RenderingAppElement | RenderingAppNode,
): created is RenderingAppComponent => {
  return (created as RenderingAppComponent).render != null;
};

export const isRenderingAppNode = (
  created: RenderingAppComponent | RenderingAppElement | RenderingAppNode,
): created is RenderingAppNode => {
  return (created as RenderingAppNode).node != null;
};
