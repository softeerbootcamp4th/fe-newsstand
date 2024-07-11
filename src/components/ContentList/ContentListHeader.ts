import { Div, Span, ce } from "@/libs";
import styles from "./ContentListHeader.module.css";
import typoStyles from "@/styles/typo.module.css";
import { AppChild } from "@/libs";
interface ContentListHeaderProps {
  main: string;
  sub: AppChild;
  onClick: () => void;
  isActive: boolean;
  hasNext: boolean;
  onNext: () => void;
}

const ContentListHeader = ({
  main,
  sub,
  onClick,
  isActive,
  onNext,
  hasNext,
}: ContentListHeaderProps) => {
  const activeStyle = `${styles["tab-active"]} ${
    typoStyles["selected-bold14"]
  } ${hasNext ? styles["tab-animate"] : ""}`;
  const inactiveStyle = `${styles["tab-inactive"]} ${typoStyles["available-medium14"]}`;
  return ce(Span, {
    className: `${styles.tab} ${isActive ? activeStyle : inactiveStyle}`,
    onClick,
    children: [ce(Span, { children: [main] }), ce(Span, { children: [sub] })],
    onAnimationIteration: onNext,
  });
};
interface MediaContentTabsProps {
  tabs: Omit<ContentListHeaderProps, "hasNext">[];
  hasNext: boolean;
}

export const MediaContentTabs = ({ tabs, hasNext }: MediaContentTabsProps) => {
  return ce(Div, {
    className: styles.container,
    children: tabs.map((tab) =>
      ContentListHeader({
        ...tab,
        hasNext: hasNext,
      }),
    ),
  });
};
