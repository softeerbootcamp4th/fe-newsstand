import { RawElement, AppElementProps, AppElement } from "./AppElement";

export const Raw = (data: string) => {
  return new RawElement(data);
};
type H1Props = AppElementProps<HTMLHeadingElement>["props"];
export const H1 = (props: H1Props) =>
  AppElement({
    props,
    tagName: "h1",
  });

type DivProps = AppElementProps<HTMLDivElement>["props"];
export const Div = (props: DivProps) =>
  AppElement({
    props: props,
    tagName: "div",
  });

export const Header = (props: DivProps) =>
  AppElement({
    props: props,
    tagName: "header",
  });

export const Main = (props: DivProps) =>
  AppElement({ props: props, tagName: "main" });
export const Footer = (props: DivProps) =>
  AppElement({ props: props, tagName: "footer" });
export const Section = (props: DivProps) =>
  AppElement({ props: props, tagName: "section" });

type SpanProps = AppElementProps<HTMLSpanElement>["props"];
export const Span = (props: SpanProps) =>
  AppElement({ props: props, tagName: "span" });

type ButtonProps = AppElementProps<HTMLButtonElement>["props"];
export const Button = (props: ButtonProps) =>
  AppElement({ props, tagName: "button" });

type AnchorProps = AppElementProps<HTMLAnchorElement>["props"];
export const A = (props: AnchorProps) => AppElement({ props, tagName: "a" });

type ImgProps = AppElementProps<HTMLImageElement>["props"];

export const Img = (props: ImgProps) => AppElement({ props, tagName: "img" });
