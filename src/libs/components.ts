import { AppComponent, CreatedAppComponent } from "./renderer";

export function cc<P>(
  render: AppComponent<P>,
  props: P,
): CreatedAppComponent<P> {
  return {
    render,
    props,
  };
}
