import { rootElement } from "./core";

export type EventListener<T extends Event = Event> = (event: T) => void;
export type EventKey = `on${string}`;

export type EventHandlers = {
  onClick: EventListener<MouseEvent>;
  onInput: EventListener<InputEvent>;
  onChange: EventListener<Event>;
  onSubmit: EventListener<Event>;
  onHover: EventListener<MouseEvent>;
  onLeave: EventListener<MouseEvent>;
  onScroll: EventListener<Event>;
  onResize: EventListener<Event>;
  onKeydown: EventListener<KeyboardEvent>;
  onKeyup: EventListener<KeyboardEvent>;
  onAnimationIteration: EventListener<AnimationEvent>;
  onAnimationEnd: EventListener<AnimationEvent>;
};

export const EventNameMap = {
  onClick: "click",
  onInput: "input",
  onChange: "change",
  onSubmit: "submit",
  onHover: "mouseenter",
  onLeave: "mouseleave",
  onScroll: "scroll",
  onResize: "resize",
  onKeydown: "keydown",
  onKeyup: "keyup",
  onAnimationIteration: "animationiteration",
  onAnimationEnd: "animationend",
};

export const EventNameMaps = new Map<string, string>([
  ["onClick", "click"],
  ["onInput", "input"],
  ["onChange", "change"],
  ["onSubmit", "submit"],
  ["onHover", "mouseenter"],
  ["onLeave", "mouseleave"],
  ["onScroll", "scroll"],
  ["onResize", "resize"],
  ["onKeydown", "keydown"],
  ["onKeyup", "keyup"],
  ["onAnimationIteration", "animationiteration"],
  ["onAnimationEnd", "animationend"],
]);

export const eventMap = new Map<string, Map<string, EventListener>>();

class AppEvent extends Event {
  isPropagationStopped = false;
  constructor(type: string, e: EventInit, target: HTMLElement | null) {
    super(type, e);

    Object.defineProperty(this, "target", {
      value: target,
      writable: true,
    });
    Object.defineProperty(this, "target", {
      writable: true,
    });
  }

  stopPropagation() {
    super.stopPropagation();
    this.isPropagationStopped = true;
  }
}

const rootEventHandler = (e: Event | AppEvent) => {
  const target = e.target as HTMLElement;
  const handler = eventMap.get(target.getAttribute("key") ?? "")?.get(e.type);

  if (handler == null) {
    if (
      (e as AppEvent).isPropagationStopped === true ||
      target.parentElement == document.body
    ) {
      return;
    }
    rootElement?.dispatchEvent(new AppEvent(e.type, e, target.parentElement));
    return;
  }
  handler(e);
};
export const addRootEvent = (element: HTMLElement) => {
  EventNameMaps.forEach((value) => {
    element.addEventListener(value, rootEventHandler);
  });
};
