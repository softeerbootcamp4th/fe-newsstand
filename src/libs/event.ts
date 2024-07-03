export type EventListener<T extends Event = Event> = (event: T) => void;
export type EventKey = `on${string}`;

export type EventMap = {
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
};
