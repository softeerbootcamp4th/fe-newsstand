import { RawElement, AppElementProps, AppElement } from "./AppElement";

export const Raw = (data: string) => {
  return new RawElement(data);
};
type HeadingProps = AppElementProps<HTMLHeadingElement>["props"];
export const H1 = (props: HeadingProps) =>
  AppElement({
    props,
    tagName: "h1",
  });

export const H2 = (props: HeadingProps) =>
  AppElement({
    props,
    tagName: "h2",
  });

export const H3 = (props: HeadingProps) =>
  AppElement({
    props,
    tagName: "h3",
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

type UlProps = AppElementProps<HTMLUListElement>["props"];

export const Ul = (props: UlProps) => AppElement({ props, tagName: "ul" });

type LiProps = AppElementProps<HTMLLIElement>["props"];
export const Li = (props: LiProps) => AppElement({ props, tagName: "li" });
