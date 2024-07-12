import {
  AppComponent,
  AppElement,
  AppElementProps,
  CreatedAppComponent,
  CreatedAppElement,
  isAppElement,
} from "./renderer";

function cc<T extends HTMLElement>(
  render: AppElement<T>,
  props: AppElementProps<T>,
): CreatedAppElement<T>;

function cc<P, R>(
  render: AppComponent<P, R>,
  props: P,
): CreatedAppComponent<P, R>;

function cc<T extends HTMLElement, P, R>(
  render: AppElement<T> | AppComponent<P, R>,
  props: AppElementProps<T> | P,
): CreatedAppElement<T> | CreatedAppComponent<P, R> {
  if (isAppElement(render)) {
    return render(props as AppElementProps<T>) as CreatedAppElement<T>;
  }

  return {
    render: render as AppComponent<P, R>,
    props: props as P,
    renderName: render.name,
  };
}

export { cc };
