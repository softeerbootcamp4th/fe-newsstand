import { Div, Span, ce } from "@/libs/elements";
import styles from "./MediaContentTabs.module.css";
import typoStyles from "@/styles/typo.module.css";
import { AppChild } from "@/libs/renderer";
interface MediaContentTabProps {
  main: string;
  sub: AppChild;
  onClick: () => void;
  isActive: boolean;
  onNext: () => void;
}

const MediaContentTab = ({
  main,
  sub,
  onClick,
  isActive,
  onNext,
}: MediaContentTabProps) => {
  const activeStyle = `${styles["tab-active"]} ${typoStyles["selected-bold14"]}`;
  const inactiveStyle = `${styles["tab-inactive"]} ${typoStyles["available-medium14"]}`;
  return ce(Span, {
    className: `${styles.tab} ${isActive ? activeStyle : inactiveStyle}`,
    onClick,
    children: [ce(Span, { children: [main] }), ce(Span, { children: [sub] })],
    onAnimationIteration: onNext,
  });
};
interface MediaContentTabsProps {
  tabs: MediaContentTabProps[];
}

export const MediaContentTabs = ({ tabs }: MediaContentTabsProps) => {
  return ce(Div, {
    className: styles.container,
    children: tabs.map((tab) =>
      MediaContentTab({
        ...tab,
      }),
    ),
  });
};
