import { Div, Span, cc } from "@/libs";
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
  return cc(Span, {
    className: `${styles.tab} ${isActive ? activeStyle : inactiveStyle}`,
    onClick,
    children: [cc(Span, { children: [main] }), cc(Span, { children: [sub] })],
    onAnimationIteration: onNext,
  });
};
interface MediaContentTabsProps {
  tabs: Omit<ContentListHeaderProps, "hasNext">[];
  hasNext: boolean;
}

export const MediaContentTabs = ({ tabs, hasNext }: MediaContentTabsProps) => {
  return cc(Div, {
    className: styles.container,
    children: tabs.map((tab) =>
      ContentListHeader({
        ...tab,
        hasNext: hasNext,
      }),
    ),
  });
};
