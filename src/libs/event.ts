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
]);

export const eventMap = new Map<string, Map<string, EventListener>>();

const rootEventHandler = (e: Event) => {
  const target = e.target as HTMLElement;
  const handler = eventMap.get(target.getAttribute("key") ?? "")?.get(e.type);

  if (handler == null) {
    if (target.parentElement != document.body) {
      target.parentElement?.dispatchEvent(new Event(e.type, e));
    }
    return;
  }
  handler(e);
};
export const addRootEvent = (element: HTMLElement) => {
  EventNameMaps.forEach((value) => {
    element.addEventListener(value, rootEventHandler);
  });
};
